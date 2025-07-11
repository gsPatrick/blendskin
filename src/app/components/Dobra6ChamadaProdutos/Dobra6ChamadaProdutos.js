// components/Dobra6ChamadaProdutos/Dobra6ChamadaProdutos.js
"use client"; // Componente Cliente

import React, { useRef, useEffect } from 'react';

import styles from './Dobra6ChamadaProdutos.module.css';

export default function Dobra6ChamadaProdutos() {
  const sectionRef = useRef(null);
  const textRef = useRef(null); // Ref para o elemento de texto principal

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
      { threshold: 0.3 } // Dispara quando 30% do elemento está visível
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

  // Conteúdo da frase de chamada (ajuste com sua copy real)
  const callToActionPhrase = "Pronta para sentir a sua pele mais incrível do que nunca?";

  // Usaremos o fundo Cinza Claro especificado na paleta
  const sectionBackgroundColor = "var(--color-cinza-claro)";

  return (
    <section
      ref={sectionRef}
      className={`${styles.chamadaProdutosSection} scroll-section`}
      style={{ backgroundColor: sectionBackgroundColor }}
    >
       {/* Linhas divisórias em cima e embaixo serão via CSS borders */}

       {/* Frase de chamada centralizada */}
       <div className={styles.contentContainer}>
           <p ref={textRef} className={styles.callToActionText}>
               {callToActionPhrase}
           </p>
       </div>

    </section>
  );
}