// app/components/DobraOfertaProdutos/DobraOfertaProdutos.js
"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './DobraOfertaProdutos.module.css';

// Componente para o Card com Efeito 3D Tilt
function TiltProductCard({ product }) {
  const cardRef = useRef(null);
  // Estado para gerenciar a cor selecionada, inicializa com a primeira cor se houver
  const [selectedColor, setSelectedColor] = useState(
    product.colors ? product.colors[0] : null
  );

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = ((y / height) - 0.5) * -25;
    const rotateY = ((x / width) - 0.5) * 25;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  // Lógica para determinar o NOME e LINK CTA exibidos
  // A imagem não mudará com a seleção de cor, conforme solicitado.
  const displayedName = product.colors 
                      ? `${product.name} - ${selectedColor.label}` 
                      : product.name;
  const displayedCtaLink = product.colors 
                         ? selectedColor.ctaLink 
                         : product.ctaLink;

  return (
    <div
      ref={cardRef}
      className={styles.productCard}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.productImageContainer}>
        {/* Usa sempre a imagem padrão do produto, não a da cor selecionada */}
        <img src={product.image} alt={displayedName} loading="lazy" />
      </div>
      <div className={styles.productInfo}>
        <h4 className={styles.productName}>{displayedName}</h4>
        <img 
          src={product.priceImage} 
          alt={`Preço de ${product.name}`} 
          className={styles.productPriceImage} 
        />

        {/* Adiciona as opções de cor se existirem */}
        {product.colors && (
          <div className={styles.colorSelectionWrapper}> {/* Novo wrapper para texto + amostras */}
            <p className={styles.chooseColorText}>Escolha sua cor:</p> {/* Texto de instrução */}
            <div className={styles.colorOptionsContainer}>
              {product.colors.map((colorOption) => (
                <div key={colorOption.value} className={styles.colorOptionItem}> {/* Novo item para amostra + label */}
                  <button
                    className={`${styles.colorSwatch} ${selectedColor.value === colorOption.value ? styles.selected : ''}`}
                    style={{ backgroundColor: colorOption.hex }}
                    onClick={(e) => {
                      e.stopPropagation(); // Impede o tilt do card ao clicar na cor
                      setSelectedColor(colorOption);
                    }}
                    aria-label={`Selecionar cor ${colorOption.label}`}
                  ></button>
                  <p className={styles.colorLabel}>{colorOption.label}</p> {/* Nome da cor */}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <a href={displayedCtaLink} target="_blank" rel="noopener noreferrer" className={styles.productCtaButton}>
        {product.ctaText}
      </a>
    </div>
  );
}


// Componente Principal
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

  const kitProductData = {
    id: 'kit-essencial',
    title: "KIT BLENDSKIN: Sua Rotina Completa",
    items: "Espuma de Limpeza + Sérum Vitamina C + BB Skin Blur",
    image: '/images/blendskin-espuma.webp',
    ctaLink: 'https://blendskin.pay.yampi.com.br/b/GHRGG0V8SOOW',
    ctaText: 'QUERO O KIT COMPLETO',
  };

  const productsData = [
    { id: 'espuma', name: 'Espuma De Limpeza Facial', image: '/produtos/bombom.png', priceImage: '/99.svg', ctaLink: 'https://blendskin.pay.yampi.com.br/r/F4HUB8FAWX', ctaText: 'COMPRAR AGORA' },
    { id: 'serum', name: 'Sérum Vitamina C - PLUS', image: '/produtos/3.png', priceImage: '/189.svg', ctaLink: 'https://blendskin.pay.yampi.com.br/r/M83S60T0SY', ctaText: 'COMPRAR AGORA' },
    { 
      id: 'bbskin', 
      name: 'BBSKIN Blur Facial FPS 50', // Nome genérico, a cor será adicionada dinamicamente
      image: '/produtos/direita.png', // Imagem padrão para o produto BBSKIN
      priceImage: '/149.svg', 
      ctaText: 'COMPRAR AGORA',
      colors: [
        { label: 'Natural', value: 'natural', hex: '#F0D4BB', ctaLink: 'https://blendskin.pay.yampi.com.br/r/55YHYO2CUH' }, 
        { label: 'Bege', value: 'bege', hex: '#D1B57E', ctaLink: 'https://blendskin.pay.yampi.com.br/r/9Z85H3BW2Q' },
      ]
    },
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

            <div className={styles.kitPriceContainer}>
              <img src="/349.svg" alt="Valor do kit completo" className={styles.kitPriceImage} />
            </div>
            
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
          <TiltProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}