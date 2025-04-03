import { useCart } from "@/hooks/useCart";
import { Button, CardImg } from "reactstrap";
import { map } from "lodash";
import { BASE_NAME } from "@/config/constants";
import classNames from "classnames";

import { BsTrash3 } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";

import styles from "./ListCart.module.scss";

export function ListCart(props) {
  const { product } = props;

  const scale = "c_scale,f_auto,q_50,w_150/";
  const upload = "image/upload/";

  const { decreaseCart, incrementCart, deleteCart } = useCart();
  const format = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Cambia 'es-ES' por tu configuración regional
  };

  return (
    <div>
      <div className={styles.list}>
        <h4>CARRITO</h4>
        {map(product, (item) => (
          <div key={item.codigo} >
            {item.active && !item.soldout ? (
              <div className={styles.active}>
                {item.images ? (
                  <CardImg
                    alt="Card image cap"
                    src={
                      BASE_NAME + upload + scale + item.images.split(upload)[1]
                    }
                  />
                ) : (
                  <CardImg
                    alt="Card image cap"
                    src={item.image_alterna}
                    className={styles.skeleton}
                  />
                )}
                <div className={styles.detalle}>
                  <p className={styles.name}>{item.name_extend}</p>

                  {/* <p className={styles.price}>$ {format(item.price1)} </p> */}
                  {/* <p className={styles.price}>Mayor: $ {item.price2}</p> */}

                  <div className={styles.btn}>
                    <span>
                      <AiOutlineMinusCircle
                        onClick={() => decreaseCart(item.codigo)}
                        size={30}
                        color="grey"
                      />
                      <p>{item.quantity}</p>
                      <AiFillPlusCircle
                        onClick={() => incrementCart(item.codigo)}
                        size={30}
                        color="green"
                      />
                    </span>

                    <Button
                      onClick={() => deleteCart(item.codigo)}
                      className={styles.btnDelete}
                    >
                      <BsTrash3 size="15" color="red" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.inactive}>
                {item.images ? (
                  <CardImg
                    alt="Card image cap"
                    src={
                      BASE_NAME + upload + scale + item.images.split(upload)[1]
                    }
                  />
                ) : (
                  <CardImg
                    alt="Card image cap"
                    src={item.image_alterna}
                    className={styles.skeleton}
                  />
                )}
                <p className={styles.name}>{item.name_extend}</p>

                <h3>AGOTADO</h3>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
