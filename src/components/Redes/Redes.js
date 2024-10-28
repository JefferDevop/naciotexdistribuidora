import React, { useState, useEffect } from "react";
import styles from "./Redes.module.scss";
import { CardImg } from "reactstrap";

import { IoLogoWhatsapp } from "react-icons/io";
import { GiRotaryPhone } from "react-icons/gi";
import { AiFillInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";

export function Redes() {
  const [isVisible, setIsVisible] = useState(false);
  const scrollThreshold = 50;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= scrollThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={styles.redes}>
        <p>Ventas por Mayor y Detal</p>
        <p>CARRERA 8 # 16 - 63 Centro</p>
        <p>Whatsapp: 310 655 6056</p>
      </div>
      {/* 
      <div
        className={`${styles.sticky_div} ${isVisible ? styles.visible : ""}`}
        style={{
          transform: isVisible ? "scale(1)" : "scale(0.5)", // Cambia la escala para crecer/desvanecer
          opacity: isVisible ? 1 : 0, // Cambia la opacidad para desvanecer
          transition: "transform 0.3s, opacity 0.3s", // Aplica una transición
        }}
      >
        <h1>CRISTALERIA LA 10A</h1>
      </div> */}
    </>
  );
}
