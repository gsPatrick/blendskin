// components/Dobra4Conexao/Dobra4Conexao.js
"use client"; // Componente Cliente

import React, { useRef, useEffect } from 'react';

import styles from './Dobra4Conexao.module.css';

export default function Dobra4Conexao() {
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

  // Conteúdo da frase de conexão (ajuste com sua copy real)
  const connectionPhrase = "A verdadeira beleza começa com uma pele bem cuidada.";

  // Usaremos o fundo Cinza Claro especificado na paleta
  const sectionBackgroundColor = "var(--color-cinza-claro)";

  return (
    <section
      ref={sectionRef}
      className={`${styles.conexaoSection} scroll-section`}
      style={{ backgroundColor: sectionBackgroundColor }}
    >
       {/* Linhas divisórias em cima e embaixo serão via CSS borders */}

       {/* Frase de conexão centralizada */}
       <div className={styles.contentContainer}>
           <p ref={textRef} className={styles.connectionText}>
               {connectionPhrase}
           </p>
       </div>

    </section>
  );
}