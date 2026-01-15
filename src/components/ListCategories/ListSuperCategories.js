
import Link from "next/link";
import { BASE_NAME } from "@/config/constants";
import styles from "./ListCategories.module.scss";

import { CardImg, CardTitle } from "reactstrap";

export function ListSuperCategories({ superCategories }) {

  const uploadPath = "image/upload/";
  const scaleOptions = "c_scale,f_auto,q_30,w_500/";


  

  // ✅ Vista general de todas las supercategorías
  return (
    <section className={styles.content}>
       <h4>CATEGORÍAS</h4>

       <div className={styles.list}>
        {superCategories?.map((supercat) => {

           const imageUrl = supercat.image
            ? `${BASE_NAME}${uploadPath}${scaleOptions}${supercat.image.split(uploadPath)[1]}`
            : supercat.image_alterna;

          return (
            <Link
              key={supercat.id}
              href={`/categorias/${supercat.slug}`}
              prefetch
              className={styles.card}
            >
            <CardImg
                alt={`Imagen de ${supercat.name}`}
                src={imageUrl}
                className={styles.skeleton}
              />
               <div className={styles.category}>
                <CardTitle className={styles.title}>
                  <h6>{supercat.name}</h6>
                  { <h5>Ver más</h5>}
                </CardTitle>
              </div>
            
            </Link>
            
          );
        })}
      </div>
    </section>
  );
}
