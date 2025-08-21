// app/components/WhatsAppButton/WhatsAppButton.js
"use client";

import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import styles from './WhatsAppButton.module.css';

export default function WhatsAppButton() {
    const [isVisible, setIsVisible] = useState(false);

    // Link do WhatsApp
    const whatsappLink = "https://wa.me/5562984077070";

    // Efeito para mostrar o botão com um pequeno atraso após a página carregar
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1000); // 1 segundo de atraso

        return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
    }, []);

    return (
        <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.whatsappButton} ${isVisible ? styles.isVisible : ''}`}
            aria-label="Fale conosco pelo WhatsApp"
        >
            <FaWhatsapp className={styles.whatsappIcon} />
        </a>
    );
}
