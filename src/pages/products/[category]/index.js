// import { Categories } from "@/api/category";
// import { Products } from "@/api/products";

// export { default } from "./category";

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const { category } = params;

//   const categoryCtrl = new Categories();
//   const responseCategory = await categoryCtrl.getBySlug(category);

//   console.log("category", responseCategory);
  

//   const productCtrl = new Products();
//   const responseProduct = await productCtrl.getProductsByCategory(
//     responseCategory.id
//   );

//   return {
//     props: {
//       category: responseCategory,
//       products: responseProduct,
//     },
//   };
// }


import NodeCache from "node-cache";
import { Categories } from "@/api/category";
import { Products } from "@/api/products";

const cache = new NodeCache({ stdTTL: 300 }); // 5 minutos

export { default } from "./category";

export async function getServerSideProps(context) {
  try {
    const { category } = context.params;

    // Intenta obtener la categoría desde la caché
    let responseCategory = cache.get(`category_${category}`);

    if (!responseCategory) {
      const categoryCtrl = new Categories();
      responseCategory = await categoryCtrl.getBySlug(category);
      if (!responseCategory) return { notFound: true };
      cache.set(`category_${category}`, responseCategory);
    }

    // Intenta obtener los productos desde la caché
    let responseProduct = cache.get(`products_${responseCategory.id}`);

    if (!responseProduct) {
      const productCtrl = new Products();
      responseProduct = await productCtrl.getProductsByCategory(responseCategory.id);
      cache.set(`products_${responseCategory.id}`, responseProduct);
    }

    return {
      props: {
        category: responseCategory,
        products: responseProduct || [],
      },
    };
  } catch (error) {
    console.error("Error en getServerSideProps:", error);
    return { props: { category: null, products: [] } };
  }
}
