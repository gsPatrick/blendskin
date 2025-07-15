// app/components/DobraOfertaProdutos/DobraOfertaProdutos.js
"use client";

import React, { useRef, useEffect, useState } from 'react';
import styles from './DobraOfertaProdutos.module.css';

// NOVO: Componente para o Card com Efeito 3D Tilt
function TiltProductCard({ product }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = ((y / height) - 0.5) * -25; // Intensidade do efeito
    const rotateY = ((x / width) - 0.5) * 25;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={cardRef}
      className={styles.productCard}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.productImageContainer}>
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className={styles.productInfo}>
        <h4 className={styles.productName}>{product.name}</h4>
        <p className={styles.productPrice}>{product.totalPrice}</p>
      </div>
      <a href={product.ctaLink} target="_blank" rel="noopener noreferrer" className={styles.productCtaButton}>
        {product.ctaText}
      </a>
    </div>
  );
}


// Componente Principal
export default function DobraOfertaProdutos() {
  const sectionRef = useRef(null);

  useEffect(() => {
    // ... (código do IntersectionObserver permanece o mesmo)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.isVisible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
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

  const kitProduct = { /* ... (dados do kit permanecem os mesmos) ... */ };
  const products = [ /* ... (dados dos produtos permanecem os mesmos) ... */ ];
  
  // (Cole aqui os dados de kitProduct e products da versão anterior para manter o código limpo)
  const kitProductData = {
    id: 'kit-essencial', title: "KIT BLENDSKIN: Sua Rotina Completa", items: "Espuma de Limpeza + Sérum Vitamina C + BB Skin Blur", image: '/images/blendskin-espuma.jpg', oldPrice: "De R$ 541,00", installmentValue: '39,70', installments: '12x de', totalPrice: 'Ou R$ 397,00 à Vista', ctaLink: 'https://wa.me/5562984077070?text=Quero%20comprar%20o%20Kit%20Completo%20BlendSkin!', ctaText: 'QUERO O KIT COMPLETO',
  };
  const productsData = [
    { id: 'espuma', name: 'Espuma de Limpeza Facial', image: '/produtos/1.png', ctaText: 'COMPRAR AGORA' },
    { id: 'serum', name: 'Sérum Vitamina C 10%', image: '/produtos/3.png', totalPrice: 'R$ 247,00', ctaLink: 'https://wa.me/5562984077070?text=Tenho%20interesse%20no%20S%C3%A9rum%20Vitamina%20C', ctaText: 'COMPRAR AGORA' },
    { id: 'bbskin', name: 'BB Skin Blur FPS 60', image: '/produtos/2.png', totalPrice: 'R$ 147,00', ctaLink: 'https://wa.me/5562984077070?text=Tenho%20interesse%20no%20BB%20Skin%20Blur', ctaText: 'COMPRAR AGORA' },
  ];

  return (
    <section ref={sectionRef} id="ofertas" className={`${styles.ofertaProdutosSection} scroll-section`}>
      <div className={styles.introContent}>
        <h2 className={styles.sectionTitle}>Sua pele merece a transformação completa.</h2>
      </div>

      <div className={styles.kitContainer}>
         <div className={styles.kitCard}>
          <div className={styles.kitImageSide}>
            <img src={kitProductData.image} alt={kitProductData.title} loading="lazy"/>
          </div>
          <div className={styles.kitContentSide}>
            <span className={styles.recommendedTag}>MAIS VENDIDO</span>
            <h3 className={styles.kitTitle}>{kitProductData.title}</h3>
            <p className={styles.kitItems}>{kitProductData.items}</p>
            <span className={styles.kitOldPrice}>{kitProductData.oldPrice}</span>
            <p className={styles.kitInstallmentText}>{kitProductData.installments}</p>
            <p className={styles.kitInstallmentPrice}>
              R$<span>{kitProductData.installmentValue.split(',')[0]}</span>,
              <sup>{kitProductData.installmentValue.split(',')[1]}</sup>
            </p>
            <p className={styles.kitTotalPrice}>{kitProductData.totalPrice}</p>
            <a href={kitProductData.ctaLink} target="_blank" rel="noopener noreferrer" className={styles.kitCtaButton}>
              {kitProductData.ctaText}
            </a>
          </div>
        </div>
      </div>

      <div className={styles.individualProductsIntro}>
        <h3>Ou garanta seus essenciais individualmente</h3>
      </div>
      
      <div className={styles.productsGrid}>
        {productsData.map((product) => (
          // Usando o novo componente com efeito 3D
          <TiltProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}