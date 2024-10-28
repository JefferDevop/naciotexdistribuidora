import React, { useEffect, useState } from "react";
import { Categories } from "@/api/category";
import { Videos } from "@/api/videos";
import {
  ListCategories,
  Footer,
  FooterApp,
  ListVideos,
  Redes,
} from "@/components";

import { BasicLayout } from "../../layouts";

const categoriesCtrl = new Categories();
const videosCtrl = new Videos();


export default function HomePage() {
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState(null);
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await categoriesCtrl.getAll();
        setCategories(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await videosCtrl.getAll();
        setVideos(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await productsCtrl.getProductByOfertAndExclusive();
  //       setProducts(response);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   })();
  // }, []);

  if (categories !== null) {
    return (
      <>
        <BasicLayout>
       <Redes />        
         
          <ListCategories categories={categories} />
          <ListVideos videos={videos} />
          {/* <Promotion products={products} /> 
          <Exclusive products={products} /> */}
          <FooterApp />
          <Footer />
        </BasicLayout>
      </>
    );
  } else {
    return (
      <>
        <BasicLayout>
          <p>Cargando...</p>
        </BasicLayout>
      </>
    );
  }
}
