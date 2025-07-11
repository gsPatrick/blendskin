// components/Dobra2Gloss/Dobra2Gloss.js
"use client"; // Componente Cliente

import React, { useRef, useEffect } from 'react';

import styles from './Dobra2Gloss.module.css';

export default function Dobra2Gloss() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null); // Ref para o container principal do conteúdo

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Adiciona a classe para disparar as animações CSS
            entry.target.classList.add(styles.isVisible);
            observer.unobserve(entry.target); // Para de observar depois de animar
          }
        });
      },
      { threshold: 0.2 } // Dispara quando 20% do elemento está visível
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current); // Começa a observar a seção
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current); // Limpa o observer ao desmontar
      }
    };
  }, []); // Executa no mount e unmount

  // Conteúdo para o Gloss - FOCO NO IMPACTO VISUAL (ajuste com sua copy real)
  const title = "Lábios Perfeitos"; // Título mais curto e impactante
  const description = "Volume, hidratação e brilho que transformam seu sorriso."; // Frase de efeito
  // Removido: benefits array
  // **VERIFIQUE ESTE CAMINHO E NOME DO ARQUIVO DO VÍDEO E AGORA DO POSTER!**
  const videoSrc = "/video/Blendskin - Paula Freitas - Vídeo 2 - Gloss.mp4";
  const posterSrc = "/images/gloss-poster.jpg"; // <<-- Adicione um caminho para o poster!
  const ctaLink = "https://wa.me/5562984077070";

  return (
    <section ref={sectionRef} className={`${styles.dobraSection} scroll-section`}>
      {/* Vídeo de Fundo */}
      <video
        className={styles.sectionVideo}
        autoPlay
        loop
        muted // <<< CONFIRMADO: Muted está presente
        playsInline // <<< CONFIRMADO: PlaysInline está presente
        poster={posterSrc} // <<< ADICIONADO o atributo poster! Crie a imagem!
      >
        <source src={videoSrc} type="video/mp4" />
        Seu navegador não suporta a tag de vídeo.
      </video>

      {/* Overlay para melhorar o contraste do texto */}
      <div className={styles.overlay}></div>

      {/* Conteúdo sobreposto - Apenas título, descrição e CTA */}
      <div ref={contentRef} className={styles.contentContainer}>
        <h2 className={styles.sectionTitle}>
          {title}
        </h2>
        <p className={styles.sectionDescription}>
          {description}
        </p>

        {/* Removido: benefitsList */}

        <a
          href={ctaLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.ctaButton} ${styles.ctaHighlight}`}
        >
          QUERO LÁBIOS PERFEITOS AGORA
        </a>
      </div>

    </section>
  );
}