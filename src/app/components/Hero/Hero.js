// components/Hero/Hero.js
"use client";

import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import styles from './Hero.module.css';

// Registrar o ScrollTrigger (apenas uma vez)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const socialProofRef = useRef(null);
  const scrollIndicatorRef = useRef(null); // Ref para o novo indicador

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ANIMAÇÃO DE APRESENTAÇÃO APRIMORADA
      // A ideia é criar uma sequência cinematográfica, revelando cada elemento.

      const tl = gsap.timeline({
        defaults: { duration: 1.2, ease: "power3.out" }
      });

      // 1. O vídeo de fundo faz um zoom-out suave para revelar a cena.
      tl.fromTo(videoRef.current,
        { scale: 1.15 },
        { scale: 1, duration: 2.5 }
      );

      // 2. O conteúdo principal entra em cena com um stagger coreografado.
      tl.fromTo([titleRef.current, subtitleRef.current],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.2 },
        "-=1.5" // Começa um pouco antes do fim da animação do vídeo
      );

      // 3. O botão e os elementos secundários aparecem por último.
      tl.fromTo([ctaRef.current, socialProofRef.current, scrollIndicatorRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.2 },
        "-=0.8" // Começa um pouco antes do fim da animação do título/subtítulo
      );


      // EFEITO PARALLAX (mantido, pois é essencial para a estética premium)
      gsap.to(contentRef.current, {
        yPercent: -15, // Aumenta um pouco o efeito
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      gsap.to(videoRef.current, {
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} id="hero" className={`${styles.heroSection} scroll-section`}>
      <video
        ref={videoRef}
        className={styles.heroVideo}
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero-poster.jpg" // Poster é importante para o carregamento
      >
        <source src="/video/blendskin-hero-video.mp4" type="video/mp4" />
        Seu navegador não suporta a tag de vídeo.
      </video>

      <div className={styles.heroOverlay}></div>

      <div ref={contentRef} className={styles.heroContent}>
        <h1 ref={titleRef} className={styles.heroTitle}>
          Descubra a beleza real da sua pele
        </h1>
        <p ref={subtitleRef} className={styles.heroSubtitle}>
          A ciência e a natureza se unem para transformar você.
        </p>

        <a
          ref={ctaRef}
          href="https://wa.me/5562984077070"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaButton}
        >
          QUERO CUIDAR DA MINHA PELE AGORA
        </a>

        <div ref={socialProofRef} className={styles.socialProof}>
            <span>Compra Segura</span>
            <span className={styles.separator}>|</span>
            <span>Satisfação Garantida</span>
            <span className={styles.separator}>|</span>
            <span>Privacidade Protegida</span>
        </div>
      </div>

      {/* NOVO: Indicador de rolagem minimalista */}
      <div ref={scrollIndicatorRef} className={styles.scrollIndicator}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

    </section>
  );
}