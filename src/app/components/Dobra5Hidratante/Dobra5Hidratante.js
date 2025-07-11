// components/Dobra5Hidratante/Dobra5Hidratante.js
"use client"; // Componente Cliente

import React, { useRef, useEffect } from 'react';

import styles from './Dobra5Hidratante.module.css';

export default function Dobra5Hidratante() {
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

  // Conteúdo para o Hidratante - Placeholder (ajuste com sua copy real)
  const title = "Hidratação Que Transforma"; // Título impactante
  const description = "Tecnologia Skinlift®: Firmeza, elasticidade e uma pele visivelmente mais jovem e hidratada."; // Frase de efeito

  // **VERIFIQUE ESTE CAMINHO E NOME DO ARQUIVO DO VÍDEO!**
  const videoSrc = "/video/skinlift.mp4";
  const ctaLink = "https://wa.me/5562984077070";

  return (
    <section ref={sectionRef} className={`${styles.dobraSection} scroll-section`}>
      {/* Vídeo de Fundo */}
      <video
        className={styles.sectionVideo}
        autoPlay
        loop
        muted
        playsInline
        // Adicione um póster para mostrar enquanto o vídeo carrega (opcional)
        // poster="/images/hidratante-poster.jpg"
      >
        <source src={videoSrc} type="video/mp4" />
        Seu navegador não suporta a tag de vídeo.
      </video>

      {/* Overlay para melhorar o contraste do texto */}
      <div className={styles.overlay}></div>

      {/* Conteúdo sobreposto */}
      <div ref={contentRef} className={styles.contentContainer}>
        <h2 className={styles.sectionTitle}>
          {title}
        </h2>
        <p className={styles.sectionDescription}>
          {description}
        </p>

        <a
          href={ctaLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.ctaButton} ${styles.ctaHighlight}`}
        >
          QUERO MINHA PELE RENOVADA
        </a>
      </div>

    </section>
  );
}