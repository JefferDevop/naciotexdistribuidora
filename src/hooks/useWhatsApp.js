import { useState, useEffect } from "react";

import { Sellers } from "@/api/sellers";

export function useWhatsApp() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [message, setMessage] = useState('');
  const [items, setItems] = useState([]);
  const [seller, setSeller] = useState([]);


  const sellersCtrl = new Sellers();






  useEffect(() => {
    (async () => {
      try {
        const data = await sellersCtrl.getAllSeller();
        // Transforma los datos del backend a tus arrays
        setItems(data.map(s => s.phone_number));
        setSeller(data.map(s => s.name));
      } catch (error) {
        console.error("Error al cargar vendedores:", error);
      }
    })();
  }, []);


console.log("items", items);
console.log("seller", seller);



  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  const generateWhatsAppLink = (phoneNumber, message) => {
    setMessage(message);
    const url = `https://wa.me/${phoneNumber}`;
    const encodedMessage = encodeURIComponent(message);
    return `${url}?text=${encodedMessage}`;
  };


  return {
    items,
    seller,
    selectedItem,
    handleItemClick,
    generateWhatsAppLink,
  };
}
