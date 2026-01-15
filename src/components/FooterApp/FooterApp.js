import React, { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useWhatsApp } from "@/hooks/useWhatsApp";
import { BASE_API } from "@/config/constants";

import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { BsWhatsapp } from "react-icons/bs";
import { BsQrCode } from "react-icons/bs";




import styles from "./FooterApp.module.scss";

import { BtnLink } from "../Common";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
} from "reactstrap";
import { BarcodeScannerModal } from "../barcode";
import { fetchProductByBarcode } from "@/api/precios";
import { useBarcodeScanner } from "@/hooks/useBarcodeScanner";

export function FooterApp() {

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const { total } = useCart();
  const { generateWhatsAppLink, items, seller, selectedItem, handleItemClick } =
    useWhatsApp();

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const addData = () => {
    const whatsappLink = generateWhatsAppLink(
      selectedItem,
      "Hola, me gustaría obtener más información sobre sus productos."
    );

    window.location.href = whatsappLink;

    toggleModal();
  };


  const scanner = useBarcodeScanner({
    onDetected: async (code) => {
      try {
        setLoading(true);
        const data = await fetchProductByBarcode(code);
        setProduct(data);
      } catch {
        alert("Producto no encontrado");
      } finally {
        setLoading(false);
      }
    },
  });



  return (
    <div className={styles.btnWhatsapp}>
      <div className={styles.paneluser}>
        <BtnLink link={"/"} title={"HOME"} logo={<AiOutlineHome size={20} />} />
        <BtnLink
          link={"/featured"}
          title={"EXCL"}
          logo={<BsSearch size={20} />}
        />




        <Button
          className={styles.whatsapp}
          color="succefull"
          onClick={() => toggleModal()}
        >
          <BsQrCode size={22} color="green" />
        </Button>



        



        <div className={styles.cart}>
          <p>{total}</p>
          <BtnLink
            link={"/cart"}
            title={"CART"}
            logo={<AiOutlineShoppingCart size={20} />}
          />
        </div>

        <BtnLink
          link={
            "https://naciotexdistribuidora.conexion.bar/admin-dashboard/"
          }
          title={"ADMI"}
          logo={<CiUser size={20} />}
        />
      </div>

      <Modal centered isOpen={isOpen} toggle={toggleModal}>


        <ModalBody>
          <div className={styles.productPanel}>
            {loading && <p className={styles.productLoading}>Buscando producto…</p>}

            {product && !loading && (
              <div className={styles.productCard}>
                <div className={styles.productInfo}>
                  <p className={styles.productName}>{product.data.descripcion}</p>
                  <p className={styles.productPrice}>
                    {new Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                      maximumFractionDigits: 0,
                    }).format(product.data.precio)}
                  </p>
                </div>
              </div>
            )}

            <BarcodeScannerModal open={scanner.isOpen} onClose={scanner.stop} />
          </div>
        </ModalBody>

        <ModalFooter>

          <div className={styles.btnGroup}>
            <Button outline block size="sm" color="secondary" onClick={toggleModal}>
              Cancelar
            </Button>
            <Button size="sm" block color="success" onClick={scanner.start}>
              Escanear producto
            </Button>
          </div>

        </ModalFooter>
      </Modal>
    </div>
  );
}

