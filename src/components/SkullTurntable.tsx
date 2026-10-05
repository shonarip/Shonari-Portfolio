"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

const SRC_MODEL = site.heroSkull.model;
/** DZ's Draco-compressed copy (0.9 MB vs 8.5 MB); same geometry and materials. */
const MODEL = SRC_MODEL.endsWith(".draco.glb")
  ? SRC_MODEL
  : SRC_MODEL.replace(/\.glb$/, ".draco.glb");
const POSTER_DIR = SRC_MODEL.replace(/[^/]+$/, "");
/** Radians per second — slow continuous clockwise turn */
const RAD_PER_SEC = 0.45;
/** Extra frustum padding so top/bottom clear on a full turn */
const FIT_PAD = 1.35;

export function SkullTurntable() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let disposed = false;
    let shown = false;
    let raf = 0;
    let renderer: import("three").WebGLRenderer | null = null;
    let removeResize: (() => void) | null = null;

    (async () => {
      const THREE = await import("three");
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
      const { DRACOLoader } = await import("three/examples/jsm/loaders/DRACOLoader.js");
      if (disposed || !mountRef.current) return;

      const width = mount.clientWidth || 500;
      const height = mount.clientHeight || width;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 100);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height, false);
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";
      mount.appendChild(renderer.domElement);

      const hemi = new THREE.HemisphereLight(0xe8eef8, 0x12080c, 0.65);
      scene.add(hemi);
      const key = new THREE.DirectionalLight(0xffffff, 0.85);
      key.position.set(2.2, 3.2, 2.8);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0x9aaccc, 0.35);
      fill.position.set(-2.5, 0.5, -1.5);
      scene.add(fill);
      const rim = new THREE.DirectionalLight(0x6a80a0, 0.28);
      rim.position.set(0, 1.2, -2.4);
      scene.add(rim);

      const root = new THREE.Group();
      scene.add(root);

      const draco = new DRACOLoader();
      draco.setDecoderPath("/draco/");
      const loader = new GLTFLoader();
      loader.setDRACOLoader(draco);
      const gltf = await loader.loadAsync(MODEL);
      draco.dispose();
      if (disposed) return;

      const model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);
      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      // Slightly smaller in-frustum so corners clear on Y spin
      model.scale.setScalar(1.05 / maxDim);
      root.add(model);

      model.traverse((obj) => {
        const mesh = obj as import("three").Mesh;
        if (!mesh.isMesh) return;
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        for (const m of mats) {
          const mat = m as import("three").MeshStandardMaterial;
          if (!mat || !("color" in mat)) continue;
          mat.color.multiplyScalar(0.8);
          if ("emissive" in mat && mat.emissive) mat.emissive.setHex(0x000000);
          if ("roughness" in mat) mat.roughness = Math.min(1, (mat.roughness ?? 0.7) + 0.15);
          if ("metalness" in mat) mat.metalness = Math.min(0.25, mat.metalness ?? 0);
          mat.needsUpdate = true;
        }
      });

      const fitCamera = () => {
        const sphere = new THREE.Sphere();
        new THREE.Box3().setFromObject(root).getBoundingSphere(sphere);
        const fov = (camera.fov * Math.PI) / 180;
        const dist = (sphere.radius / Math.sin(fov / 2)) * FIT_PAD;
        camera.position.set(0, 0, dist);
        camera.near = Math.max(0.05, dist / 100);
        camera.far = dist * 20;
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
      };
      fitCamera();

      let last = performance.now();
      const tick = (now: number) => {
        if (disposed || !renderer) return;
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        if (!reduce) {
          root.rotation.y -= RAD_PER_SEC * dt;
        }
        renderer.render(scene, camera);
        if (!shown) {
          shown = true;
          setReady(true);
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      const onResize = () => {
        if (!renderer || !mountRef.current) return;
        const w = mountRef.current.clientWidth;
        const h = mountRef.current.clientHeight || w;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
        fitCamera();
      };
      window.addEventListener("resize", onResize);
      removeResize = () => window.removeEventListener("resize", onResize);
    })().catch(() => {
      /* load failure — leave empty mount */
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      removeResize?.();
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement.parentNode === mount) {
          mount.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div className="skull-box group pointer-events-none relative z-0 mx-auto block aspect-square w-full overflow-visible">
      <div className="absolute inset-0 opacity-[0.55] transition-opacity group-has-[a:hover]:opacity-80">
      <picture
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-700",
          ready ? "opacity-0" : "opacity-100",
        ].join(" ")}
      >
        <source srcSet={`${POSTER_DIR}skull-poster-fit.webp`} type="image/webp" />
        <img
          src={`${POSTER_DIR}skull-poster-fit.png`}
          alt=""
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-contain"
        />
      </picture>
      <div
        ref={mountRef}
        className={[
          "absolute inset-0 h-full w-full transition-opacity duration-700",
          ready ? "opacity-100" : "opacity-0",
        ].join(" ")}
        aria-hidden="true"
      />
      </div>
      {/* Click area limited to the skull's own layout box (inside the negative-margin padding) */}
      <a
        href={site.heroSkull.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={site.heroSkull.ariaLabel}
        className="pointer-events-auto absolute inset-x-[18%] bottom-[20%] top-[18%] block rounded-full"
      />
    </div>
  );
}
