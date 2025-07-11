// app/components/DobraBBSkinDetalhes/DobraBBSkinDetalhes.js
"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './DobraBBSkinDetalhes.module.css';

export default function DobraBBSkinDetalhes() {
    const [openAccordion, setOpenAccordion] = useState(0);
    const sectionRef = useRef(null);

    const handleAccordionClick = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

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
            { threshold: 0.25 }
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

    // Conteúdo específico para o BB Skin Blur
    const title = "A Perfeição em Um Único Passo.";
    const description = "Nosso BB Cream multifuncional oferece alta proteção solar, cobertura natural e um incrível efeito blur, disfarçando poros e imperfeições instantaneamente.";
    
    const accordionItems = [
        {
            title: "Por que escolher o BB Skin Blur?",
            content: "FPS 60 com alta proteção UVA/UVB. Toque seco oil-free, ideal para peles mistas e oleosas. Cor adaptável que se ajusta ao seu tom de pele. Substitui protetor, base e primer."
        },
        {
            title: "Sinta a Diferença",
            content: "Pele matificada com controle do brilho excessivo. Poros e linhas finas visivelmente disfarçados. Acabamento natural e aveludado que não pesa na pele."
        },
        {
            title: "Modo de Uso",
            content: "Aplique generosamente pela manhã como último passo da sua rotina de skincare. Reaplique ao longo do dia, se necessário, para manter a proteção solar."
        }
    ];
    
    const finalCtaLink = "https://wa.me/5562984077070?text=Quero%20o%20BB%20Skin%20Blur%20com%20efeito%20blur!";

    // **VERIFIQUE O CAMINHO E NOME DA IMAGEM!**
    const imageSrc = "/images/bbskin-detalhes.jpg"; 

    return (
        <section ref={sectionRef} className={`${styles.dobraSection} scroll-section`}>
            {/* Lado Esquerdo: Imagem (Layout Invertido) */}
            <div className={styles.mediaSide}>
                <img
                    src={imageSrc}
                    alt="Modelo aplicando o BB Skin Blur da BlendSkin"
                    className={styles.productImage}
                    loading="lazy"
                />
            </div>

            {/* Lado Direito: Conteúdo e Acordeão (Layout Invertido) */}
            <div className={styles.textSide}>
                <h2 className={styles.sectionTitle}>{title}</h2>
                <p className={styles.sectionDescription}>{description}</p>

                <div className={styles.accordion}>
                    {accordionItems.map((item, index) => (
                        <div key={index} className={styles.accordionItem}>
                            <button
                                className={`${styles.accordionHeader} ${openAccordion === index ? styles.isOpen : ''}`}
                                onClick={() => handleAccordionClick(index)}
                                aria-expanded={openAccordion === index}
                            >
                                {item.title}
                                <span className={`${styles.accordionIcon} ${openAccordion === index ? styles.isOpen : ''}`}></span>
                            </button>
                            <div className={`${styles.accordionContent} ${openAccordion === index ? styles.isOpen : ''}`}>
                                <div className={styles.accordionContentInner}>
                                    {item.content}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <a href={finalCtaLink} target="_blank" rel="noopener noreferrer" className={styles.finalCtaLink}>
                    Peça o seu pelo WhatsApp
                    <span>→</span>
                </a>
            </div>
        </section>
    );
}