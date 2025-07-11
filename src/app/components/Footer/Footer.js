// app/components/Footer/Footer.js
"use client";

import React, { useRef, useEffect } from 'react';
import { FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import styles from './Footer.module.css';

export default function Footer() {
  const footerRef = useRef(null);

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

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const whatsappLink = "https://wa.me/5562984077070";
  const emailContact = "contato@blendskin.com.br";
  const instagramLink = "https://instagram.com/blendskin";
  const tiktokLink = "https://tiktok.com/@blendskin";

  const quickLinks = [
    { name: "Início", href: "#hero" },
    { name: "Produtos", href: "#produtos" }, // Exemplo, ajuste os IDs
    { name: "Ofertas", href: "#ofertas" },
  ];

  // --- ATENÇÃO: Caminhos para os logos BRANCOS/CLAROS ---
  const logoSrc = "/images/blendskinlogo.png"; // <-- VERIFIQUE ESTE CAMINHO! Deve ser um logo BRANCO.

  return (
    <footer ref={footerRef} className={styles.footerSection}>
       <div className={styles.footerContentTop}>
           <div className={styles.footerColumn}>
               <h4 className={styles.columnTitle}>Links rápidos</h4>
               <ul className={styles.quickLinksList}>
                   {quickLinks.map((link, index) => (
                       <li key={index}>
                           <a href={link.href}>{link.name}</a>
                       </li>
                   ))}
               </ul>
           </div>

           <div className={styles.footerColumn}>
               <h4 className={styles.columnTitle}>Contato</h4>
               <p>WhatsApp: <a href={whatsappLink} target="_blank" rel="noopener noreferrer">(62) 98407-7070</a></p>
               <p>Email: <a href={`mailto:${emailContact}`}>{emailContact}</a></p>

               <div className={styles.socialIcons}>
                   <a href={instagramLink} target="_blank" rel="noopener noreferrer" aria-label="Instagram BlendSkin">
                       <FaInstagram />
                   </a>
                   <a href={tiktokLink} target="_blank" rel="noopener noreferrer" aria-label="TikTok BlendSkin">
                       <FaTiktok />
                   </a>
                   <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp BlendSkin">
                       <FaWhatsapp />
                   </a>
               </div>
           </div>

           <div className={styles.footerColumn}>
               <h4 className={styles.columnTitle}>Sobre a empresa</h4>
               <p>
                 Ciência avançada e tradição coreana unidas para reparar, proteger e iluminar sua pele.
               </p>
               <p className={styles.copyrightClaim}>Todos os direitos reservados à BlendSkin®</p>
               
           </div>
       </div>

       <div className={styles.footerBottom}>
            <img src={logoSrc} alt="BlendSkin Logo" className={styles.largeLogo} loading="lazy" />
            <p className={styles.tagline}>A beleza vem de dentro.</p>
           <div className={styles.legalInfoContainer}>
               <p className={styles.legalLink}><a href="/politica-privacidade">Política de privacidade</a> | <a href="/termos-uso">Termos de uso</a></p>
               <p className={styles.developedBy}>Página desenvolvida por: [Seu Nome]</p>
           </div>
       </div>
    </footer>
  );
}