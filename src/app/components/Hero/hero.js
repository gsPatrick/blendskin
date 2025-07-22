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
  const scrollIndicatorRef = useRef(null);

  // --- MUDANÇA: Função para rolagem suave do botão principal ---
  const handleScrollToOfertas = (event) => {
    event.preventDefault();
    const targetElement = document.querySelector('#ofertas');
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // --- MUDANÇA: Função para rolagem suave do indicador de scroll ---
  const handleScrollToNextSection = (event) => {
    event.preventDefault();
    const nextSection = heroRef.current.nextElementSibling;
    if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  // --- FIM DAS MUDANÇAS ---

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration: 1.2, ease: "power3.out" }
      });

      tl.fromTo(videoRef.current, { scale: 1.15 }, { scale: 1, duration: 2.5 });
      tl.fromTo([titleRef.current, subtitleRef.current], { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.2 }, "-=1.5");
      tl.fromTo([ctaRef.current, socialProofRef.current, scrollIndicatorRef.current], { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.2 }, "-=0.8");

      gsap.to(contentRef.current, {
        yPercent: -15,
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
        poster="/images/hero-poster.jpg"
      >
        <source src="/video/heronovo.webm" type="video/webm" />
        <source src="/video/heronovo.mp4" type="video/mp4" />
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

        {/* --- MUDANÇA: href e onClick atualizados --- */}
        <a
          ref={ctaRef}
          href="#ofertas"
          onClick={handleScrollToOfertas}
          className={styles.ctaButton}
        >
          QUERO CUIDAR DA MINHA PELE AGORA
        </a>
        {/* --- FIM DA MUDANÇA --- */}

        <div ref={socialProofRef} className={styles.socialProof}>
            <span>Compra Segura</span>
            <span className={styles.separator}>|</span>
            <span>Satisfação Garantida</span>
            <span className={styles.separator}>|</span>
            <span>Privacidade Protegida</span>
        </div>
      </div>

      {/* --- MUDANÇA: Indicador agora é clicável e usa a nova função de scroll --- */}
      <div 
        ref={scrollIndicatorRef} 
        className={styles.scrollIndicator}
        onClick={handleScrollToNextSection}
        role="button"
        aria-label="Rolar para a próxima seção"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {/* --- FIM DA MUDANÇA --- */}

    </section>
  );
}