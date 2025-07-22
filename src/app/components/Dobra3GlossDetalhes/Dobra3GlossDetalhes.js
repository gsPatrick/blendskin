// app/components/DobraGaleriaProdutos/DobraGaleriaProdutos.js
"use client";

import React, { useRef, useEffect } from 'react';
import styles from './DobraGaleriaProdutos.module.css';

export default function DobraGaleriaProdutos() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.isVisible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const sectionBackgroundColor = "#bdae9a"; // Cor de fundo mantida

  // --- MUDANÇA AQUI: Frases de impacto corretas para cada produto ---
  const galleryItems = [
    {
      image: "/images/blendskin.jpg", // Imagem da Espuma
      impactPhrase: "LIMPEZA PROFUNDA.\nPELE RENOVADA."
    },
    {
      image: "/images/serum2.webp", // Imagem do Sérum
      impactPhrase: "LUMINOSIDADE E PODER.\nPELE RADIANTE."
    },
    {
      image: "/images/bbskin.webp", // Imagem do BB Skin
      impactPhrase: "PROTEÇÃO E COBERTURA.\nEFEITO BLUR IMEDIATO."
    }
  ];

  return (
    <section
      ref={sectionRef}
      className={`${styles.dobraSection} scroll-section`}
      style={{ backgroundColor: sectionBackgroundColor }}
    >
       <div className={styles.galleryContainer}>
           {galleryItems.map((item, index) => (
               <div key={index} className={styles.galleryItem}>
                   <div
                       className={styles.itemBackground}
                       style={{ backgroundImage: `url(${item.image})` }}
                   ></div>
                   
                   {/* Overlay em gradiente para legibilidade */}
                   <div className={styles.itemOverlay}></div>

                   {/* Texto posicionado na parte inferior */}
                   <div className={styles.itemText}>
                       <p className={styles.impactPhrase}>
                            <span dangerouslySetInnerHTML={{ __html: item.impactPhrase.replace(/\n/g, '<br/>') }}></span>
                       </p>
                   </div>
               </div>
           ))}
       </div>
    </section>
  );
}