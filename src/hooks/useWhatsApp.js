import { useState } from "react";

export function useWhatsApp() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [message, setMessage] = useState('');

  const items = ["+573125741767", "+573235823957"];
  const seller = [ 'ANA', 'OLGA']

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
