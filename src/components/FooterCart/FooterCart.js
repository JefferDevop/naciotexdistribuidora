import React, { useState } from "react";
import { useRouter } from "next/router";
import { useCart } from "@/hooks/useCart";
import { Orders } from "@/api/orders";
import { useWhatsApp } from "@/hooks/useWhatsApp";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
} from "reactstrap";

import { BsTrash3 } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { BsWhatsapp } from "react-icons/bs";

import styles from "./FooterCart.module.scss";
import { toast } from "react-toastify";


const ordersCtrl = new Orders();
import { size } from "lodash";


export function FooterCart(props) {

  const { product } = props;
  const { deleteAllCart } = useCart();
  const { items, selectedItem, seller, handleItemClick } = useWhatsApp();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  function handleClick(link) {
    router.push(link);
  }

  function confirmation() {
    const result = window.confirm(
      "¿Está seguro de eliminar los productos del Carrito?"
    );
    if (result) {
      deleteAllCart();
    }
  }

  const generateWhatsAppLink = (phoneNumber, message) => {
    const url = `https://wa.me/${phoneNumber}`;
    const encodedMessage = encodeURIComponent(message);
    return `${url}?text=${encodedMessage}`;
  };

  const addData = () => {
    if (selectedItem === null) {
      toast.error("Seleccione una Linea de Whatsapp", {
        autoClose: 2000,
      });
      return;
    }

    ordersCtrl.createOrder(product).then((response) => {


      if (response) {
        const whatsappLink = generateWhatsAppLink(selectedItem, product);
        window.location.href = whatsappLink; 
      } else {
        toast.error("Error al enviar el pedido", {
          autoClose: 2000,
        });
      }
    });

    // ---------------------------------------------------
    
    
    toggleModal();
  };

  const handleWhatsAppClick = () => {
    if (items.length === 0) {
      toast.error("No hay productos seleccionados para enviar.");
      return;
    }

    toggleModal();
  };

  return (
    <div className={styles.btnWhatsapp}>
      <div className={styles.paneluser}>
        <BiArrowBack onClick={() => handleClick("/")} size="35" color="grey" />

        <Button
          className={styles.whatsapp}
          color="succefull"
          onClick={() => handleWhatsAppClick()}
        >
          <BsWhatsapp size={30} color="green" />
          <p>Enviar Listado</p>
        </Button>

        <BsTrash3 size="25" color="grey" onClick={confirmation} />
      </div>

      <Modal centered isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Seleccione una Linea</ModalHeader>

        <ModalBody>
          {items.map((item, index) => (
            <Button
              key={index}
              color="success"
              size="sm"
              outline
              className={index === selectedItem ? "selected" : ""}
              onClick={() => handleItemClick(item)}
            >
              <BsWhatsapp size={20} /> Linea {index + 1}
              <p>{seller[index]}</p>
            </Button>
          ))}
        </ModalBody>

        <ModalFooter>
          <Button outline size="sm" color="secondary" onClick={toggleModal}>
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
