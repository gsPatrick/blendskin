// components/DobraOfertaProdutos/DobraOfertaProdutos.js
"use client";

import React, { useRef, useEffect } from 'react';
import styles from './DobraOfertaProdutos.module.css';

export default function DobraOfertaProdutos() {
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
      { threshold: 0.1 } // Dispara quando 10% da seção está visível
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

  // Dados dos produtos individuais
  const products = [
    {
      id: 'espuma',
      name: 'Espuma de Limpeza Profunda',
      description: 'Limpa suavemente sem ressecar, removendo impurezas e maquiagem para uma pele fresca e hidratada.',
      // --- MUDANÇA AQUI: Placeholder via.placeholder.com ---
      image: 'https://via.placeholder.com/200x200?text=Espuma', 
      ctaLink: 'https://wa.me/5562984077070?text=Tenho%20interesse%20na%20Espuma%20de%20Limpeza',
      ctaText: 'SAIBA MAIS',
    },
    {
      id: 'gloss',
      name: 'Gloss Labial Volumizador',
      description: 'Volume, hidratação e brilho que transformam seu sorriso e cuidam dos seus lábios.',
      // --- MUDANÇA AQUI: Placeholder via.placeholder.com ---
      image: 'https://via.placeholder.com/200x200?text=Gloss', 
      ctaLink: 'https://wa.me/5562984077070?text=Tenho%20interesse%20no%20Gloss%20Labial',
      ctaText: 'SAIBA MAIS',
    },
    {
      id: 'hidratante',
      name: 'Hidratante com Tecnologia Skinlift®',
      description: 'Tecnologia exclusiva para firmeza, elasticidade e uma pele visivelmente mais jovem e hidratada.',
      // --- MUDANÇA AQUI: Placeholder via.placeholder.com ---
      image: 'https://via.placeholder.com/200x200?text=Hidratante', 
      ctaLink: 'https://wa.me/5562984077070?text=Tenho%20interesse%20no%20Hidratante',
      ctaText: 'SAIBA MAIS',
    },
  ];

  // Dados do Kit
  const kitInfo = {
    title: "KIT ESSENCIAL BLENDSKIN",
    items: "Espuma + Hidratante + Gloss",
    oldPrice: "De R$ 985,00",
    newPrice: "40,15", // Número e centavos para estilização separada
    installment: "Por apenas 12x de",
    totalPrice: "Ou R$397,00 à Vista",
    // --- MUDANÇA AQUI: Placeholder via.placeholder.com ---
    image: 'https://via.placeholder.com/600x400?text=KIT+BLENDSKIN', 
    ctaLink: "https://wa.me/5562984077070?text=Quero%20comprar%20o%20Kit%20Essencial%20BlendSkin%20agora!",
  };

  // Fundo desta seção será o cinza claro
  const sectionBackgroundColor = "var(--color-cinza-claro)";

  return (
    <section
      ref={sectionRef}
      className={`${styles.ofertaProdutosSection} scroll-section`}
      style={{ backgroundColor: sectionBackgroundColor }}
    >
      {/* Título e Subtítulo da Seção */}
      <div className={styles.introContent}>
        <h2 className={styles.sectionTitle}>Sua rotina de beleza, completa.</h2>
        <p className={styles.sectionSubtitle}>
          Conheça cada um de nossos essenciais ou aproveite a oferta exclusiva do kit completo.
        </p>
      </div>

      {/* Grid dos 3 Produtos Individuais */}
      <div className={styles.productsGrid}>
        {products.map((product, index) => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.productImageContainer}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
                loading="lazy"
              />
            </div>
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productDescription}>{product.description}</p>
            <a
              href={product.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.productCtaButton}
            >
              {product.ctaText}
            </a>
          </div>
        ))}
      </div>

      {/* Card do Kit (Centralizado e de Destaque) */}
      <div className={styles.kitContainer}>
        <div className={styles.kitCard}>
          <div className={styles.kitImageContainer}>
            <img
              src={kitInfo.image}
              alt={kitInfo.title}
              className={styles.kitImage}
              loading="lazy"
            />
          </div>
          <div className={styles.kitContent}>
            <h3 className={styles.kitTitle}>{kitInfo.title}</h3>
            <p className={styles.kitItems}>{kitInfo.items}</p>
            <span className={styles.kitOldPrice}>{kitInfo.oldPrice}</span> {/* Preço antigo */}
            <p className={styles.kitInstallment}>{kitInfo.installment}</p>
            <p className={styles.kitNewPrice}>
              R$ <span>{kitInfo.newPrice.split(',')[0]}</span>, {/* Parte inteira do preço */}
              <sup>{kitInfo.newPrice.split(',')[1]}</sup> {/* Centavos como sobrescrito */}
            </p>
            <p className={styles.kitTotalPrice}>{kitInfo.totalPrice}</p> {/* Preço à vista */}
            <a
              href={kitInfo.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.kitCtaButton} ${styles.ctaHighlight}`}
            >
              COMPRAR O KIT AGORA
            </a>
            <div className={styles.socialProofIcons}>
              <span>Compra Segura</span> | <span>Satisfação Garantida</span> | <span>Privacidade Protegida</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}