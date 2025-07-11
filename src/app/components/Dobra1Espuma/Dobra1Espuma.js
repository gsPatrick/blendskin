// app/components/DobraRotinaCompleta/DobraRotinaCompleta.js
"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './DobraRotinaCompleta.module.css';

export default function DobraRotinaCompleta() {
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

    const title = "Sua Rotina de Beleza, Completa e Poderosa.";
    const description = "Descubra a sinergia perfeita entre limpeza, tratamento e proteção. Cada passo foi desenhado para potencializar o próximo, revelando a sua melhor pele.";
    
    const accordionItems = [
        {
            title: "Passo 1: Espuma de Limpeza",
            content: "Limpeza profunda que remove impurezas e oleosidade sem ressecar, respeitando o equilíbrio natural e preparando a pele para os próximos passos."
        },
        {
            title: "Passo 2: Sérum Vitamina C",
            content: "Ação antioxidante que clareia manchas, uniformiza o tom e desperta a luminosidade natural da sua pele, deixando-a visivelmente mais radiante."
        },
        {
            title: "Passo 3: BB Skin Blur FPS 60",
            content: "Finalização perfeita com alta proteção solar, cobertura leve e efeito blur, que disfarça poros e imperfeições para um acabamento impecável."
        }
    ];
    
    const finalCtaLink = "https://wa.me/5562984077070?text=Quero%20saber%20mais%20sobre%20a%20Rotina%20Completa%20BlendSkin!";
    const imageSrc = "/images/blendskin-espuma.jpg"; 

    return (
        <section ref={sectionRef} className={`${styles.dobraSection} scroll-section`}>
            {/* --- MUDANÇA DE ORDEM AQUI --- */}

            {/* Lado Esquerdo: Imagem */}
            <div className={styles.mediaSide}>
                <img
                    src={imageSrc}
                    alt="BlendSkin Espuma de Limpeza como parte da rotina completa"
                    className={styles.productImage}
                    loading="lazy"
                />
            </div>

            {/* Lado Direito: Conteúdo e Acordeão */}
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
                    Quero a rotina completa
                    <span>→</span>
                </a>
            </div>
        </section>
    );
}