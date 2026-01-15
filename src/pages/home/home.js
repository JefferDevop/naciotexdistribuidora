import React, { useEffect, useState } from "react";
import { BasicLayout } from "@/layouts";
import {
  ListSuperCategories,
  ListVideos,
  Footer,
  FooterApp,
  Redes,
} from "@/components";

import { Categories } from "@/api/category";
import { Videos } from "@/api/videos";

const categoriesCtrl = new Categories();
const videosCtrl = new Videos();


export default function SuperCategoryPage() {
  const [data, setData] = useState({
    superCategories: null,
    videos: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔹 Ejecutar ambas llamadas a la vez
    const fetchData = async () => {
      try {
        const [superCategoriesRes, videosRes] = await Promise.all([
          categoriesCtrl.getAllSuperCategory(),
          videosCtrl.getAll(),
        ]);

        setData({
          superCategories: superCategoriesRes,
          videos: videosRes,
        });
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const { superCategories, videos } = data;


  if (loading) {
    return (
      <BasicLayout>
        <p>Cargando...</p>
      </BasicLayout>
    );
  }

  return (
    <BasicLayout>
      <Redes />

      {superCategories && (
        <ListSuperCategories superCategories={superCategories} />
      )}

      {videos && <ListVideos videos={videos} />}

      <FooterApp />
      <Footer />
    </BasicLayout>
  );
}
