// app/components/DobraGaleriaProdutos/DobraGaleriaProdutos.js
"use client";

import React, { useRef, useEffect } from 'react';
import styles from './DobraGaleriaProdutos.module.css';

export default function DobraGaleriaProdutos() {
  const sectionRef = useRef(null);

  // --- MUDANÇA: Função para rolagem suave ---
  const handleScrollToOfertas = (event) => {
    event.preventDefault(); // Impede o salto do link
    const targetElement = document.querySelector('#ofertas');
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
  };
  // --- FIM DA MUDANÇA ---

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

  const sectionBackgroundColor = "#bdae9a";

  const galleryItems = [
    {
      image: "/images/blendskin.jpg",
      impactPhrase: "LIMPEZA PROFUNDA.\nPELE RENOVADA."
    },
    {
      image: "/images/serum2.webp",
      impactPhrase: "LUMINOSIDADE E PODER.\nPELE RADIANTE."
    },
    {
      image: "/images/bbskin.webp",
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
               // --- MUDANÇA: Adicionado onClick para acionar a rolagem suave em cada card ---
               <a 
                key={index} 
                href="#ofertas" 
                onClick={handleScrollToOfertas} 
                className={styles.galleryItem}
               >
                   <div
                       className={styles.itemBackground}
                       style={{ backgroundImage: `url(${item.image})` }}
                   ></div>
                   
                   <div className={styles.itemOverlay}></div>

                   <div className={styles.itemText}>
                       <p className={styles.impactPhrase}>
                            <span dangerouslySetInnerHTML={{ __html: item.impactPhrase.replace(/\n/g, '<br/>') }}></span>
                       </p>
                   </div>
               </a>
               // --- FIM DA MUDANÇA ---
           ))}
       </div>
    </section>
  );
}