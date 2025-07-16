  // app/components/DobraVideoBBSkin/DobraVideoBBSkin.js
  "use client";

  import React, { useRef, useLayoutEffect } from 'react';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

  import styles from './DobraVideoBBSkin.module.css';

  // Registrar o ScrollTrigger (apenas uma vez)
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  export default function DobraVideoBBSkin() {
    const sectionRef = useRef(null);
    const videoRef = useRef(null);
    const contentRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const ctaRef = useRef(null);

    // Animações de entrada e parallax, idênticas à Hero
    useLayoutEffect(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { duration: 1.2, ease: "power3.out" }
        });

        // Animação de entrada do conteúdo
        tl.fromTo(videoRef.current, { scale: 1.15 }, { scale: 1, duration: 2.5 })
          .fromTo([titleRef.current, subtitleRef.current], { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.2 }, "-=1.5")
          .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, "-=0.8");

        // Efeito Parallax no Scroll
        gsap.to(contentRef.current, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });

        gsap.to(videoRef.current, {
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });

      }, sectionRef);

      return () => ctx.revert();
    }, []);

    // Conteúdo específico para o BB Skin Blur
    const title = "Proteção. Cobertura. Efeito Blur.";
    const description = "Simplifique sua rotina. Nosso BB Cream multifuncional oferece alta proteção solar, cobertura natural e um incrível efeito blur que disfarça poros e imperfeições instantaneamente.";
    const ctaLink = "https://wa.me/5562984077070?text=Quero%20o%20BB%20Skin%20Blur%20com%20efeito%20blur!";
    const ctaText = "QUERO O EFEITO BLUR AGORA";

    // **VERIFIQUE O CAMINHO E NOME DO VÍDEO E DO POSTER!**
    const videoSrc = "/video/bbskin.mp4";
    const posterSrc = "/images/bbskin-poster.webp"; // Crie um poster para carregamento rápido

    return (
      <section ref={sectionRef} id="bbskin-video" className={`${styles.videoSection} scroll-section`}>
        <video
          ref={videoRef}
          className={styles.videoBackground}
          autoPlay
          loop
          muted
          playsInline
          poster={posterSrc}
        >
          <source src={videoSrc} type="video/mp4" />
          Seu navegador não suporta a tag de vídeo.
        </video>

        <div className={styles.videoOverlay}></div>

        <div ref={contentRef} className={styles.videoContent}>
          <h2 ref={titleRef} className={styles.videoTitle}>
            {title}
          </h2>
          <p ref={subtitleRef} className={styles.videoSubtitle}>
            {description}
          </p>

          <a
            ref={ctaRef}
            href={ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            {ctaText}
          </a>
        </div>
      </section>
    );
  }