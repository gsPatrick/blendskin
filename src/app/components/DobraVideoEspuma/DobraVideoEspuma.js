// app/components/DobraDuoEssencial/DobraDuoEssencial.js
"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './DobraDuoEssencial.module.css';

export default function DobraDuoEssencial() {
    const [openAccordion, setOpenAccordion] = useState(0);
    const sectionRef = useRef(null);

    const handleAccordionClick = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

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

    const title = "O Duo Essencial: Limpeza e Luminosidade.";
    const description = "Prepare sua pele com a limpeza suave da nossa espuma e revele um brilho incomparável com o poder antioxidante do nosso sérum de Vitamina C.";
    
    const accordionItems = [
        {
            title: "Espuma de Limpeza Facial",
            content: "Remove impurezas e oleosidade sem ressecar. Com Niacinamida e Camomila, controla o brilho, reduz poros e acalma a pele, sendo ideal para peles sensíveis e acneicas."
        },
        {
            title: "Sérum Vitamina C 10%",
            content: "Fórmula leve e oil-free que clareia manchas e uniformiza o tom da pele. Enriquecido com Ácido Hialurônico e Ferúlico, hidrata e protege contra os sinais do tempo."
        },
        {
            title: "Modo de Uso Combinado",
            content: "Pela manhã, comece com a Espuma de Limpeza. Com a pele seca, aplique 1 pump do Sérum Vitamina C. Finalize com seu protetor solar. Repita a limpeza à noite."
        }
    ];
    
    const finalCtaLink = "#ofertas";
    const videoSrc = "/video/espuma.webm";

    return (
        <section ref={sectionRef} className={`${styles.dobraSection} scroll-section`}>
            {/* Lado Esquerdo: Conteúdo Redesenhado */}
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

                {/* --- MUDANÇA: Adicionado onClick para acionar a rolagem suave --- */}
                <a href={finalCtaLink} onClick={handleScrollToOfertas} className={styles.ctaButton}>
                    DESCUBRA A ROTINA COMPLETA
                </a>
                {/* --- FIM DA MUDANÇA --- */}
            </div>

            {/* Lado Direito: Vídeo */}
            <div className={styles.videoSide}>
                <video
                    className={styles.productVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-label="Vídeo de demonstração da Espuma de Limpeza e Sérum BlendSkin"
                >
                    <source src="/video/espuma.webm" type="video/webm" />
                    <source src="/video/espuma.mp4" type="video/mp4" />
                </video>
            </div>
        </section>
    );
}