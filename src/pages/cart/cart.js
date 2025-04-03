import React, { useEffect, useState, useCallback } from "react";
import { useCart } from "@/hooks/useCart";
import { Products } from "@/api/products";
import { Footer, FooterCart, ListCart, NotFound, Redes } from "@/components";
import { BasicLayout } from "@/layouts";
import { size } from "lodash";
import { BASE_NAME } from "@/config/constants";

const productCtrl = new Products();

export default function CartPage() {
  const { cart } = useCart();
  const [product, setProduct] = useState("");
  const [load, setLoad] = useState(true);
  const hasProduct = size(product) > 0;

  const [newProduct, setNewProduct] = useState("");

  const identificadorUnico = generarIdentificadorUnico();



  const fetchProducts = useCallback(async () => {
    if (cart?.length === 0) {
      setProduct([]);
      setLoad(false);
      return;
    }
  
    try {
      const data = await Promise.all(
        cart.map(async (item) => {
          const response = await productCtrl.getProductById(item.id);
          return { ...response, quantity: item.quantity };
        })
      );
      setProduct(data);
    } catch (error) {
      console.error(`Error al cargar productos: ${error}`);
    } finally {
      setLoad(false);
    }
  }, [cart]);

  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);





  useEffect(() => {
    (async () => {
      try {
        // Filtrar productos activos y no agotados
        const productosFiltrados = product.filter(
          (item) => item.active && !item.soldout
        );
  
        const newObjectArray = productosFiltrados.map((record) => ({
          codigo: record.codigo,
          Nombre: record.name_extend,
          Referencia: record.ref,
          Cantidad: record.quantity,
          Precio: record.price1,
          Imagen: BASE_NAME + record.images,
        }));
  
        const newArrayAsString = JSON.stringify(newObjectArray, null, 2);
  
        setNewProduct(`Pedido No. ${identificadorUnico} ${newArrayAsString}`);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [product]);
  

  return (
    <>
      <BasicLayout>
        <Redes />

        {load ? (
          <h1>Cargando ...</h1>
        ) : (
          <>
            {hasProduct ? (
              <ListCart product={product} />
            ) : (
              <NotFound
                title={"Uppss... en este momento no hay productos en el Carrito"}
              />
            )}
          </>
        )}

        <FooterCart product={newProduct}/>
        <Footer />
      </BasicLayout>
    </>
  );
}


function generarIdentificadorUnico() {
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numeros = '0123456789';

  let identificador = '';

  const letraAleatoria = letras[Math.floor(Math.random() * letras.length)];
  identificador += letraAleatoria;

  for (let i = 0; i < 4; i++) {
    const numeroAleatorio = Math.floor(Math.random() * 10);
    identificador += numeros[numeroAleatorio];
  }

  

  return identificador;
}
