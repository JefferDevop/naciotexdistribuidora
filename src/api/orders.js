import { BASE_API } from "../config/constants";

export class Orders {


  async createOrder(rawOrderData) {

 
    
    // Extraer el número de pedido y la lista de productos
    const orderNumberMatch = rawOrderData.match(/Pedido No\. (\w+)/);

  
    
    if (!orderNumberMatch) {
      console.error('Número de pedido no encontrado.');
      return;
    }
    const orderNumber = orderNumberMatch[1];
    const products = JSON.parse(rawOrderData.replace(orderNumberMatch[0], '').trim());
    
  
    // Transformar los datos
    const orderDetails = await Promise.all(products.map(async (product) => {
     
      return {
        product: product.codigo,
        quantity: product.Cantidad,
        price: product.Precio,
        ordered: true
      };
    }));

    const order = {
      order_number: orderNumber,
      order_details: orderDetails
    };
  
    // Enviar la orden al backend
    try {
      const response = await fetch(`${BASE_API}/api/order/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error al crear la orden:', error);
    }
  }
  

}
