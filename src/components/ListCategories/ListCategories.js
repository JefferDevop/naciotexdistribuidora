"use client";

import Link from "next/link";
import { CardImg, CardTitle } from "reactstrap";
import { BASE_NAME } from "@/config/constants";
import styles from "./ListCategories.module.scss";

export function ListCategories({ superCategories }) {
  const uploadPath = "image/upload/";
  const scaleOptions = "c_scale,f_auto,q_30,w_500/";

  if (!superCategories?.categories?.length) {
    return <p className="text-center py-4">No hay categorías disponibles.</p>;
  }

  return (
    <section className={styles.content}>
      <h4>{superCategories.name} </h4>
      <div className={styles.list}>
        {superCategories.categories.map((category) => {
          const imageUrl = category.image
            ? `${BASE_NAME}${uploadPath}${scaleOptions}${category.image.split(uploadPath)[1]}`
            : category.image_alterna;

          return (
            <Link
              key={category.id}
              href={`/products/${category.slug}`}
              prefetch
              className={styles.card}
            >
              <CardImg
                alt={`Imagen de ${category.name}`}
                src={imageUrl}
                className={styles.skeleton}
              />
              <div className={styles.category}>
                <CardTitle className={styles.title}>
                  <h6>{category.name}</h6>
                  {!category.image && <h6>Ver más</h6>}
                </CardTitle>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
