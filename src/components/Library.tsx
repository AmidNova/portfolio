import { ArrowLeft, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

interface BookData {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  description: string;
  colorHex: string;
  colorInt: number;
}

const PROJECTS: BookData[] = [
  {
    id: "kairos",
    title: "Kairos",
    subtitle: "AI Productivity Platform",
    tags: ["React", "Node.js", "TypeScript", "Python"],
    description:
      "Plateforme de productivité alimentée par IA. Frontend React, backend Node.js, inférence Python pour les fonctionnalités ML.",
    colorHex: "#f5c518",
    colorInt: 0xf5c518,
  },
  {
    id: "bozarts",
    title: "Bozarts",
    subtitle: "Cultural Full-Stack Platform",
    tags: ["PHP", "MySQL", "Docker", "JavaScript"],
    description:
      "Plateforme culturelle full-stack — projet de groupe ISEP. Gestion d'événements, authentification, tableau de bord admin.",
    colorHex: "#89b4fa",
    colorInt: 0x89b4fa,
  },
];

const SHELF_COLORS = [
  0xcba6f7, 0xa6e3a1, 0xf38ba8, 0xfab387, 0x94e2d5,
  0x313244, 0x45475a, 0x585b70, 0x7f849c, 0x9399b2,
  0xa6adc8, 0x6c7086, 0x1e1e2e, 0x2a1800, 0x181825,
  0x3d2200, 0x1a3300, 0x001a33, 0x2d0033,
];

export default function Library() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const [selected, setSelected] = useState<BookData | null>(null);

  const closeOverlay = () => {
    setSelected(null);
    if (controlsRef.current) controlsRef.current.autoRotate = true;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // ── Scene ─────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07070e, 0.036);
    scene.background = new THREE.Color(0x07070e);

    // ── Camera ────────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 60);
    camera.position.set(0, 3.0, 9.5);

    // ── Controls ──────────────────────────────────────────────────────────
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.target.set(0, 1.6, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.38;
    controls.minDistance = 2.5;
    controls.maxDistance = 13;
    controls.minPolarAngle = 0.08;
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.update();

    // ── Lighting ──────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x0b0b1c, 12));

    // Central pendant
    const pendant = new THREE.PointLight(0xffd070, 110, 22, 1.5);
    pendant.position.set(0, 6.4, 0);
    pendant.castShadow = true;
    pendant.shadow.mapSize.setScalar(1024);
    pendant.shadow.bias = -0.001;
    scene.add(pendant);

    // Pendant glow sphere
    const lampSphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.11, 10, 8),
      new THREE.MeshStandardMaterial({ color: 0xffd060, emissive: 0xffc840, emissiveIntensity: 5 })
    );
    lampSphere.position.copy(pendant.position);
    scene.add(lampSphere);

    // Accent lights along back shelves
    for (const x of [-4.8, 0, 4.8]) {
      const l = new THREE.PointLight(0xff7a20, 22, 8, 2);
      l.position.set(x, 4.8, -9.0);
      scene.add(l);
    }

    // ── Room ──────────────────────────────────────────────────────────────
    const RW = 22, RH = 7.2, RD = 22;

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(RW, RD),
      new THREE.MeshStandardMaterial({ color: 0x0c0601, roughness: 0.97 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    const grid = new THREE.GridHelper(20, 26, 0x19100a, 0x19100a);
    (grid.material as THREE.LineBasicMaterial).opacity = 0.4;
    (grid.material as THREE.LineBasicMaterial).transparent = true;
    scene.add(grid);

    const ceiling = new THREE.Mesh(
      new THREE.PlaneGeometry(RW, RD),
      new THREE.MeshStandardMaterial({ color: 0x060610 })
    );
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = RH;
    scene.add(ceiling);

    // Walls
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x0b0b14, roughness: 0.92 });
    ([
      [0, RH / 2, -RD / 2, 0],
      [0, RH / 2,  RD / 2, Math.PI],
      [-RW / 2, RH / 2, 0,  Math.PI / 2],
      [ RW / 2, RH / 2, 0, -Math.PI / 2],
    ] as [number, number, number, number][]).forEach(([x, y, z, ry]) => {
      const w = Math.abs(ry) === Math.PI / 2 ? RD : RW;
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, RH), wallMat.clone());
      m.position.set(x, y, z);
      m.rotation.y = ry;
      m.receiveShadow = true;
      scene.add(m);
    });

    // Wainscoting on back wall
    for (let px = -9; px <= 9; px += 3) {
      const panel = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 3.0, 0.04),
        new THREE.MeshStandardMaterial({ color: 0x0e0e1c, roughness: 0.88 })
      );
      panel.position.set(px, 1.5, -RD / 2 + 0.03);
      scene.add(panel);
    }

    // ── Central round table ───────────────────────────────────────────────
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x241200, roughness: 0.83, metalness: 0.03 });

    const tableTop = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.07, 32), woodMat.clone());
    tableTop.position.set(0, 0.88, 0);
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    scene.add(tableTop);

    const tableLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.88, 12), woodMat.clone());
    tableLeg.position.set(0, 0.44, 0);
    scene.add(tableLeg);

    const tableBase = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.06, 16), woodMat.clone());
    tableBase.position.set(0, 0.03, 0);
    scene.add(tableBase);

    // Open book on table
    const coverMat = new THREE.MeshStandardMaterial({ color: 0x100500, roughness: 0.76 });
    const pagesMat = new THREE.MeshStandardMaterial({ color: 0xddd0b0, roughness: 0.55, emissive: 0xddd0b0, emissiveIntensity: 0.04 });
    const bw = 0.5, bh_book = 0.8;
    ([
      [coverMat, -bw / 2 - 0.01, 0.924, 0.11],
      [coverMat,  bw / 2 + 0.01, 0.924, -0.11],
      [pagesMat, -bw / 2 - 0.01, 0.930, 0.11],
      [pagesMat,  bw / 2 + 0.01, 0.930, -0.11],
    ] as [THREE.Material, number, number, number][]).forEach(([mat, x, y, rz], i) => {
      const geo = new THREE.BoxGeometry(bw, i < 2 ? 0.017 : 0.011, bh_book);
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, 0);
      m.rotation.z = rz;
      scene.add(m);
    });

    // Candle
    const candle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.034, 0.034, 0.27, 10),
      new THREE.MeshStandardMaterial({ color: 0xf0e0c0, roughness: 0.5 })
    );
    candle.position.set(0.87, 1.06, 0.08);
    scene.add(candle);

    const flameLight = new THREE.PointLight(0xff7a18, 7, 3.8, 2.5);
    flameLight.position.set(0.87, 1.25, 0.08);
    scene.add(flameLight);

    const flameMesh = new THREE.Mesh(
      new THREE.ConeGeometry(0.021, 0.072, 6),
      new THREE.MeshStandardMaterial({ color: 0xff9030, emissive: 0xff4800, emissiveIntensity: 5 })
    );
    flameMesh.position.copy(flameLight.position);
    scene.add(flameMesh);

    // ── Featured project books (standing on table) ────────────────────────
    const clickableBooks: { mesh: THREE.Mesh; data: BookData }[] = [];

    PROJECTS.forEach((proj, i) => {
      const sign = i === 0 ? -1 : 1;
      const bookMesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, 1.08, 0.76),
        new THREE.MeshStandardMaterial({
          color: proj.colorInt,
          roughness: 0.62,
          metalness: 0.07,
          emissive: new THREE.Color(proj.colorInt),
          emissiveIntensity: 0.18,
        })
      );
      bookMesh.position.set(sign * 0.44, 0.91 + 0.54, -0.1 + sign * 0.04);
      bookMesh.rotation.y = sign * -0.2;
      bookMesh.castShadow = true;
      scene.add(bookMesh);
      clickableBooks.push({ mesh: bookMesh, data: proj });
    });

    // ── Bookshelves (back wall × 3) ───────────────────────────────────────
    function buildShelf(cx: number, cz: number, ry: number) {
      const SW = 3.85, SH = 4.4, SD = 0.38;
      const shelfMat = new THREE.MeshStandardMaterial({ color: 0x200d00, roughness: 0.86 });
      const group = new THREE.Group();

      // Side panels
      for (const sx of [-SW / 2 + 0.03, SW / 2 - 0.03]) {
        const p = new THREE.Mesh(new THREE.BoxGeometry(0.06, SH, SD), shelfMat.clone());
        p.position.set(sx, SH / 2, 0);
        p.castShadow = true;
        group.add(p);
      }
      // Top & bottom boards
      for (const sy of [0.04, SH - 0.01]) {
        const b = new THREE.Mesh(new THREE.BoxGeometry(SW, 0.06, SD), shelfMat.clone());
        b.position.set(0, sy, 0);
        group.add(b);
      }
      // 3 shelf levels
      for (const sy of [1.1, 2.15, 3.25]) {
        const shelf = new THREE.Mesh(new THREE.BoxGeometry(SW, 0.055, SD), shelfMat.clone());
        shelf.position.set(0, sy, 0);
        shelf.castShadow = true;
        group.add(shelf);

        // Fill with books
        let bx = -SW / 2 + 0.1;
        while (bx < SW / 2 - 0.1) {
          const bw2 = 0.1 + Math.random() * 0.1;
          if (bx + bw2 > SW / 2 - 0.1) break;
          const bh2 = 0.52 + Math.random() * 0.42;
          const color = SHELF_COLORS[Math.floor(Math.random() * SHELF_COLORS.length)];
          const book = new THREE.Mesh(
            new THREE.BoxGeometry(bw2, bh2, SD - 0.07),
            new THREE.MeshStandardMaterial({ color, roughness: 0.72 })
          );
          book.position.set(bx + bw2 / 2, sy + 0.028 + bh2 / 2, 0);
          book.rotation.z = (Math.random() - 0.5) * 0.05;
          book.castShadow = true;
          group.add(book);
          bx += bw2 + 0.012 + Math.random() * 0.02;
        }
      }

      group.position.set(cx, 0, cz);
      group.rotation.y = ry;
      scene.add(group);
    }

    buildShelf(-4.7, -9.8, 0);
    buildShelf(  0,  -9.8, 0);
    buildShelf( 4.7, -9.8, 0);

    // Side wall single shelf units
    buildShelf(-10.0, -1.5, -Math.PI / 2);
    buildShelf( 10.0,  1.5,  Math.PI / 2);

    // ── Dust particles ────────────────────────────────────────────────────
    const N = 280;
    const pos = new Float32Array(N * 3);
    const vel = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = Math.random() * 6.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18;
      vel[i * 3]     = (Math.random() - 0.5) * 0.0014;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.0007;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.0014;
    }
    const dustGeo = new THREE.BufferGeometry();
    const dustAttr = new THREE.BufferAttribute(pos, 3);
    dustGeo.setAttribute("position", dustAttr);
    const dustMesh = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({ color: 0xffd070, size: 0.022, transparent: true, opacity: 0.28, sizeAttenuation: true })
    );
    scene.add(dustMesh);

    // ── Raycaster ─────────────────────────────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const handleClick = (e: MouseEvent) => {
      pointer.x =  (e.clientX / window.innerWidth)  * 2 - 1;
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(clickableBooks.map(b => b.mesh));
      if (hits.length > 0) {
        const found = clickableBooks.find(b => b.mesh === hits[0].object);
        if (found) {
          setSelected(found.data);
          controls.autoRotate = false;
        }
      }
    };
    canvas.addEventListener("click", handleClick);

    // Cursor pointer on hover
    const handleMouseMove = (e: MouseEvent) => {
      pointer.x =  (e.clientX / window.innerWidth)  * 2 - 1;
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(clickableBooks.map(b => b.mesh));
      canvas.style.cursor = hits.length > 0 ? "pointer" : "grab";
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    // ── Resize ────────────────────────────────────────────────────────────
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // ── Animation loop ────────────────────────────────────────────────────
    let frame = 0;
    let raf: number;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      frame++;

      // Dust drift
      for (let i = 0; i < N; i++) {
        pos[i * 3]     += vel[i * 3];
        pos[i * 3 + 1] += vel[i * 3 + 1];
        pos[i * 3 + 2] += vel[i * 3 + 2];
        if (Math.abs(pos[i * 3])     > 9)   vel[i * 3]     *= -1;
        if (pos[i * 3 + 1] < 0.1 || pos[i * 3 + 1] > 6.4) vel[i * 3 + 1] *= -1;
        if (Math.abs(pos[i * 3 + 2]) > 9)   vel[i * 3 + 2] *= -1;
      }
      dustAttr.needsUpdate = true;

      // Candle flicker
      flameLight.intensity = 7 + Math.sin(frame * 0.13) * 2 + Math.random() * 1.3;
      flameMesh.scale.y = 0.88 + Math.sin(frame * 0.19) * 0.14;

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("mousemove", handleMouseMove);
      controls.dispose();
      scene.traverse(obj => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else (obj.material as THREE.Material).dispose();
        }
      });
      dustGeo.dispose();
      renderer.dispose();
      controlsRef.current = null;
    };
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "#07070e" }}>
      <canvas ref={canvasRef} style={{ display: "block" }} />

      {/* Back */}
      <Link
        to="/"
        style={{
          position: "absolute", top: "1.5rem", left: "1.5rem",
          display: "flex", alignItems: "center", gap: "0.5rem",
          color: "#cdd6f4", textDecoration: "none",
          fontSize: "0.875rem", fontWeight: 500,
          background: "rgba(11,11,20,0.8)", backdropFilter: "blur(14px)",
          padding: "0.5rem 1rem", borderRadius: "999px",
          border: "1px solid rgba(205,214,244,0.08)",
        }}
      >
        <ArrowLeft size={15} /> Retour
      </Link>

      {/* Label */}
      <div style={{
        position: "absolute", top: "1.5rem", left: "50%", transform: "translateX(-50%)",
        color: "#585b70", fontSize: "0.72rem", letterSpacing: "0.22em",
        textTransform: "uppercase", fontWeight: 700, pointerEvents: "none",
        background: "rgba(11,11,20,0.6)", backdropFilter: "blur(10px)",
        padding: "0.4rem 1.1rem", borderRadius: "999px",
        border: "1px solid rgba(205,214,244,0.05)",
      }}>
        3D Library
      </div>

      {/* Hint */}
      <div style={{
        position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
        color: "#45475a", fontSize: "0.75rem", letterSpacing: "0.05em",
        background: "rgba(11,11,20,0.65)", backdropFilter: "blur(10px)",
        padding: "0.45rem 1.1rem", borderRadius: "999px",
        border: "1px solid rgba(205,214,244,0.04)",
        whiteSpace: "nowrap", pointerEvents: "none",
      }}>
        Glisser pour explorer · Scroll pour zoomer · Cliquer sur un livre brillant
      </div>

      {/* Book info overlay */}
      {selected && (
        <div
          style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(7,7,14,0.55)", backdropFilter: "blur(6px)",
          }}
          onClick={closeOverlay}
        >
          <div
            style={{
              background: "rgba(12,12,22,0.97)", backdropFilter: "blur(28px)",
              border: "1px solid rgba(205,214,244,0.09)",
              borderRadius: "1.25rem", padding: "2rem",
              maxWidth: "400px", width: "calc(100% - 3rem)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.9)",
              position: "relative",
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={closeOverlay}
              style={{
                position: "absolute", top: "1rem", right: "1rem",
                background: "none", border: "none", cursor: "pointer",
                color: "#45475a", display: "flex", padding: "0.25rem",
              }}
            >
              <X size={17} />
            </button>

            <div style={{
              width: "32px", height: "3px", borderRadius: "2px",
              background: selected.colorHex, marginBottom: "1.25rem",
            }} />

            <h2 style={{
              fontSize: "1.55rem", fontWeight: 800, color: "#cdd6f4",
              marginBottom: "0.3rem", letterSpacing: "-0.02em",
            }}>
              {selected.title}
            </h2>
            <p style={{
              fontSize: "0.8rem", color: selected.colorHex,
              fontWeight: 600, marginBottom: "1rem", letterSpacing: "0.04em",
            }}>
              {selected.subtitle}
            </p>
            <p style={{
              fontSize: "0.93rem", color: "#a6adc8",
              lineHeight: 1.75, marginBottom: "1.5rem",
            }}>
              {selected.description}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {selected.tags.map(tag => (
                <span key={tag} style={{
                  padding: "0.22rem 0.7rem", borderRadius: "999px",
                  background: "rgba(205,214,244,0.06)",
                  border: "1px solid rgba(205,214,244,0.1)",
                  color: "#bac2de", fontSize: "0.78rem", fontWeight: 500,
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
