import React, { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useWhatsApp } from "@/hooks/useWhatsApp";
import { toast } from "react-toastify";

import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { BsSearch, BsWhatsapp } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
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
  const [isOpen2, setIsOpen2] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setProduct(null);
  };

  const toggleModal2 = () => {
    setIsOpen2(!isOpen2);
    setProduct(null);
  };


  const addData = () => {
    const whatsappLink = generateWhatsAppLink(
      selectedItem,
      "Hola, me gustaría obtener más información sobre sus productos."
    );

    window.location.href = whatsappLink;

    toggleModal2();
  };


  const scanner = useBarcodeScanner({
    onDetected: async (code) => {
      try {
        setLoading(true);
        const data = await fetchProductByBarcode(code);
        setProduct(data);
      } catch {

        toast("Producto no encontrado, intente nuevamente");
      } finally {
        setLoading(false);
      }
    },
  });



  return (
    <div className={styles.btnWhatsapp}>
      <div className={styles.paneluser}>
        <BtnLink link={"/"} title={"HOME"} logo={<AiOutlineHome size={20} />} />


        {/* <BtnLink
          link={"/featured"}
          title={"EXCL"}
          logo={<BsSearch size={20} />}
        /> */}


        <BtnLink
          title={"QR"}
          logo={<BsQrCode size={20} />}
          onClick={() => toggleModal()}
        />






        {/* <Button
          className={styles.whatsapp}
          color="succefull"
          onClick={() => toggleModal()}
        >
          <BsQrCode size={20} color="green" />
        </Button> */}



        <Button
          className={styles.whatsapp}
          color="succefull"
          onClick={() => toggleModal2()}
        >
          <BsWhatsapp size={20} color="green" />
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




      <Modal centered isOpen={isOpen2} toggle={toggleModal2}>


        <ModalBody>
          <FormGroup>
            {items.map((item, index) => (
              <Button
                key={index}
                color="success"
                outline
                size="sm"
                className={index === selectedItem ? "selected" : ""}
                onClick={() => handleItemClick(item)}
              >
                <BsWhatsapp size={20} /> Linea {index + 1}
                <p>{seller[index]}</p>
              </Button>
            ))}
          </FormGroup>
        </ModalBody>

        <ModalFooter>


          <Button outline size="sm" color="secondary" onClick={toggleModal2}>
            Cancelar
          </Button>
          <Button size="sm" color="success" onClick={addData}>
            Aceptar
          </Button>


        </ModalFooter>
      </Modal>




    </div>
  );
}

