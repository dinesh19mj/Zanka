"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Animation variants mapped from Zanka GSAP
  const containerVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.15 },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, scale: 0.82, y: 30 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
  };

  const lettersContainerVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.038 },
    },
  };

  const letterVariants = {
    hidden: { y: "110%", opacity: 0, rotateX: -80 },
    show: {
      y: "0%",
      opacity: 1,
      rotateX: 0,
      transition: { duration: 0.65, type: "spring", bounce: 0.4, damping: 12 }
    },
  };

  const subVariants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const ctaContainerVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    import("three").then((THREE) => {
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 6;
      camera.position.y = 1.5;
      camera.lookAt(0, 0, 0);

      // Columns and rows for a structured dynamic grid mesh
      const columns = 75;
      const rows = 45;
      const count = columns * rows;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
          const i = x * rows + y;
          // Centered grid arrangement
          positions[i * 3] = (x - columns / 2) * 0.28;
          positions[i * 3 + 1] = (y - rows / 2) * 0.24;
          positions[i * 3 + 2] = 0;

          // Soft white/gray particles mixed with brand red accents
          const isAccent = Math.random() > 0.88;
          if (isAccent) {
            colors[i * 3] = 0.90;   // #E5212B in RGB -> normalized
            colors[i * 3 + 1] = 0.13;
            colors[i * 3 + 2] = 0.17;
          } else {
            colors[i * 3] = 0.45;   // Soft Slate/White
            colors[i * 3 + 1] = 0.45;
            colors[i * 3 + 2] = 0.48;
          }
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      // Programmatically generate a high-quality soft circle texture for particles
      const createCircleTexture = () => {
        const c = document.createElement('canvas');
        c.width = 32;
        c.height = 32;
        const ctx = c.getContext('2d');
        if (ctx) {
          const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
          grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
          grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(16, 16, 16, 0, Math.PI * 2);
          ctx.fill();
        }
        return new THREE.CanvasTexture(c);
      };

      const mat = new THREE.PointsMaterial({
        size: 0.12,
        map: createCircleTexture(),
        transparent: true,
        opacity: 0.5,
        vertexColors: true,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const particles = new THREE.Points(geo, mat);
      // Tilt the whole grid slightly for depth perspective
      particles.rotation.x = -0.8;
      scene.add(particles);

      let mouseX = 0, mouseY = 0;
      const onMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5);
        mouseY = -(e.clientY / window.innerHeight - 0.5);
      };
      window.addEventListener('mousemove', onMouseMove);

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize);

      let animId: number;
      let elapsed = 0;
      let lastTime = performance.now();

      const animate = () => {
        animId = requestAnimationFrame(animate);
        const now = performance.now();
        elapsed += (now - lastTime) / 1000;
        lastTime = now;

        const pos = geo.attributes.position.array as Float32Array;
        for (let x = 0; x < columns; x++) {
          for (let y = 0; y < rows; y++) {
            const i = x * rows + y;

            // Coordinate-based wave propagation
            const xAngle = (x * 0.12) + elapsed * 1.6;
            const yAngle = (y * 0.15) + elapsed * 1.3;

            // Smooth mathematical waving
            let z = Math.sin(xAngle) * 0.45 + Math.cos(yAngle) * 0.35;

            // Reactive mouse ripple attraction/repulsion
            const px = pos[i * 3];
            const py = pos[i * 3 + 1];

            // Scale mouse position to screen grid coordinates
            const targetX = mouseX * 12;
            const targetY = mouseY * 8;
            const dist = Math.sqrt((px - targetX) ** 2 + (py - targetY) ** 2);

            if (dist < 5) {
              // Apply cursor deformation ripple
              z += (5 - dist) * 0.35 * Math.sin(elapsed * 5 - dist);
            }

            pos[i * 3 + 2] = z;
          }
        }
        geo.attributes.position.needsUpdate = true;

        // Elegant, ambient drift rotation reacting to mouse coords
        particles.rotation.z = elapsed * 0.015;
        particles.rotation.y = elapsed * 0.01 + mouseX * 0.25;
        particles.rotation.x = -0.8 + mouseY * 0.2;

        renderer.render(scene, camera);
      };
      animate();

      return { animId, onMouseMove, onResize, renderer, geo, mat };
    }).then((resources) => {
      if (!resources) return;
      // Define how to clean up when component unmounts
      cleanupRef.current = () => {
        cancelAnimationFrame(resources.animId);
        window.removeEventListener('mousemove', resources.onMouseMove);
        window.removeEventListener('resize', resources.onResize);
        resources.renderer.dispose();
        resources.geo.dispose();
        resources.mat.dispose();
      };
    });

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#0D0D0D]">
      {/* Three.js Interactive Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Ambient center radial glow overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(229,33,43,0.06) 0%, rgba(13,13,13,0.7) 55%, rgba(13,13,13,0.96) 100%)' }}
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center text-center"
      >
        <div className="mb-6 flex flex-col items-center w-full">
          <motion.div
            variants={titleVariants}
            className="select-none"
            style={{
              width: 'clamp(280px, 55vw, 700px)',
              filter: 'drop-shadow(0 0 60px rgba(229,33,43,0.4)) drop-shadow(0 4px 30px rgba(0,0,0,0.6))',
            }}
          >
            <img
              src="/logo/zanka-logo-withoutbackground.png"
              alt="ZANKA"
              style={{ width: '100%', height: 'auto' }}
            />
          </motion.div>

          <motion.h2
            variants={subVariants}
            className="relative z-20 font-heading font-semibold text-xl md:text-3xl text-foreground tracking-[0.2em] uppercase mt-8 text-center"
          >
            Curated Thrift. <span className="text-primary font-serif italic tracking-normal capitalize">Endless Style.</span>
          </motion.h2>
        </div>

        <motion.p
          variants={subVariants}
          className="font-body text-white/35 text-xs tracking-[0.4em] uppercase font-light max-w-2xl mb-10"
        >
          Pop culture socks · Statement fashion · Free your fit
        </motion.p>

        <motion.div
          variants={ctaContainerVariants}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <motion.div variants={ctaVariants}>
            <Link
              href="/shop/dresses"
              className="group relative px-8 py-4 bg-primary text-white font-bold text-sm uppercase tracking-widest overflow-hidden transition-colors hover:bg-primary-hover flex items-center justify-center gap-2"
            >
              <span className="relative z-10">Shop Dresses</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <motion.div variants={ctaVariants}>
            <Link
              href="/shop/vintage"
              className="group relative px-8 py-4 bg-transparent border border-primary text-foreground font-bold text-sm uppercase tracking-widest overflow-hidden transition-colors hover:bg-primary flex items-center justify-center gap-2"
            >
              <span className="relative z-10">Shop Vintage</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-muted text-xs font-semibold tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
    </section>
  );
}
