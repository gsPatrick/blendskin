// components/DobraInterstitialCiencia/DobraInterstitialCiencia.js
"use client";

import React, { useRef, useEffect } from 'react';

import styles from './DobraInterstitialCiencia.module.css';

export default function DobraInterstitialCiencia() {
  const sectionRef = useRef(null);

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
      { threshold: 0.2 } // Ajuste o threshold conforme necessário (20% visível)
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

  // Conteúdo baseado na imagem de referência
  // **VERIFIQUE ESTE CAMINHO E NOME DO ARQUIVO!**
  const imageSrc = "/images/nova.webp"; // Use a imagem de aplicação do sérum
  // Frase impactante - use spans para controlar a cor
  const impactPhraseParts = [
      "O mais",
      "novo avanço", // Parte destacada em Dourado
      "da ciência regenerativa."
  ];
  // Texto da caixa flutuante
  const floatingCardTitle = "Firmeza da pele";
  const floatingCardDescription = "Com o uso contínuo, você sente sua pele mais lisa, com menos marcas de expressão e com aquele toque firme e macio que só uma pele bem cuidada tem.";


  return (
    <section
      ref={sectionRef}
      className={`${styles.interstitialSection} scroll-section`}
      // O background color será definido no CSS Module
    >
       {/* As linhas divisórias serão pseudo-elementos no CSS */}

       <div className={styles.contentContainer}>
           {/* Lado Esquerdo: Texto Impactante */}
           <div className={styles.textSide}>
               <p className={styles.impactPhrase}>
                   {impactPhraseParts.map((part, index) => (
                       <React.Fragment key={index}>
                           {/* Aplica classe de destaque apenas na parte "novo avanço" */}
                           <span className={index === 1 ? styles.highlightText : ''}>
                               {part}
                           </span>
                           {index < impactPhraseParts.length - 1 && <br />} {/* Adiciona quebra de linha entre as partes */}
                       </React.Fragment>
                   ))}
               </p>
           </div>

           {/* Lado Direito: Imagem e Caixa Flutuante */}
           <div className={styles.imageSide}>
                <img
                    src={imageSrc}
                    alt="Mulher aplicando Sérum BlendSkin"
                    className={styles.productImage}
                    loading="lazy" // Lazy loading
                />
                {/* Caixa Flutuante de Texto - Posicionada dentro do imageSide no mobile */}
                <div className={styles.floatingCard}>
                    <h4>{floatingCardTitle}</h4>
                    <p>{floatingCardDescription}</p>
                </div>
           </div>
       </div>

        {/* No desktop, a caixa flutuante pode ser posicionada absolutamente em relação à seção */}
        {/* Ou podemos posicioná-la dentro do imageSide e usar media queries para ajustar */}
        {/* Vamos mantê-la dentro do imageSide e ajustar seu posicionamento no CSS para ambos os layouts */}

    </section>
  );
}