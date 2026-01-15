
"use client";
import styles from "./BarcodeScanner.module.scss";




export function BarcodeScannerModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className={styles.scannerModal}>
  <div className={styles.scannerContainer}>
    <button className={styles.scannerClose} onClick={onClose}>✕</button>

    <div className={styles.scannerHeader}>
      <h2>Escanear producto</h2>
      <p>Alinea el código dentro del recuadro</p>
    </div>

    <div className={styles.scannerViewport}>
      <div id="barcode-reader"></div>

      <div className={styles.scannerFrame}>
        <span className={styles.corner} ></span>
        <span className={styles.corner} ></span>
        <span className={styles.corner} ></span>
        <span className={styles.corner} ></span>

        <div className={styles.scannerLaser}></div>
      </div>
    </div>

    <div className={styles.scannerFooter}>
      <span className={styles.scannerStatus}>Buscando código…</span>
    </div>
  </div>
</div>

  );
}
