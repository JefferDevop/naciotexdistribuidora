import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Categories } from "@/api/category";
import { BasicLayout } from "@/layouts";
import {
  ListCategories,
  Redes,
  Footer,
  FooterApp,
} from "@/components";

const categoriesCtrl = new Categories();

export default function SuperCategoryPage() {
  const [superCategory, setSuperCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { slug } = router.query;

  // ✅ Carga los datos cuando hay un slug disponible
  useEffect(() => {
    if (!slug) return;

    const fetchCategory = async () => {
      try {
        const response = await categoriesCtrl.getCategoryBySlug(slug);
        setSuperCategory(response);
      } catch (error) {
        console.error("Error al cargar la supercategoría:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [slug]);

  // ✅ Estado de carga
  if (loading) {
    return (
      <BasicLayout>
        <p>Cargando...</p>
      </BasicLayout>
    );
  }

  // ✅ Si no se encuentra la supercategoría (slug inválido)
  if (!superCategory) {
    return (
      <BasicLayout>
        <p>No se encontró esta categoría.</p>
      </BasicLayout>
    );
  }

  // ✅ Render final con los componentes
  return (
    <BasicLayout>
      <Redes />
      <ListCategories superCategories={superCategory} />
      <FooterApp />
      <Footer />
    </BasicLayout>
  );
}
