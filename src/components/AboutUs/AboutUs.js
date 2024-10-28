import styles from "./AboutUs.module.scss";

export function AboutUs() {
  return (
    <div className={styles.container}>
      <div className={styles.about}>
        <h1>Nosotros</h1>
        <p>
          Bienvenidos a NACIOTEX DISTRIBUIDORA. Nos dedicamos a ofrecer prendas
          de vestir y accesorios, para todas las edades tanto para compras
          minoristas como para ventas por mayor. Nuestra pasión por la moda se
          refleja en cada prenda que ofrecemos y nos esforzamos por ofrecer un
          servicio al cliente excepcional a cada uno de nuestros clientes. Para
          nuestros clientes mayoristas, ofrecemos descuentos especiales en
          grandes cantidades de compra. Si estás interesado en comprar al por
          mayor, por favor contáctanos para obtener información sobre precios y
          disponibilidad. Nuestra tienda ofrece una amplia variedad de ropa,
          desde prendas básicas y cómodas hasta diseños más elegantes y
          sofisticados. Nos especializamos en ropa de calidad, confeccionada con
          los mejores materiales y a precios asequibles. Nuestro objetivo es
          hacer que cada cliente se sienta seguro y cómodo con su compra. nos
          encanta interactuar con nuestros clientes en las redes sociales.
          Síguenos en Instagram y Facebook para obtener ideas de moda y para
          mantenerte actualizado sobre nuestras últimas colecciones y ofertas
          especiales. esperamos que disfrutes navegando en nuestra catálogo, si
          tienes alguna pregunta o necesitas ayuda con tu compra, nuestro amable
          equipo de servicio al cliente está siempre aquí para ayudarte.
          ¡Gracias por elegirnos!
        </p>
      </div>

      <div className={styles.mision}>
        <h5>Misión</h5>
        <p>
          Nuestra misión en NACIOTEX es ofrecer a nuestros clientes una
          experiencia de compra excepcional, con prendas de vestir y accesorios
          de moda de alta calidad y precios asequibles. Nos esforzamos por hacer
          que cada cliente se sienta seguro y cómodo con su compra,
          proporcionando un servicio al cliente excepcional en todo momento.
          Creemos que la moda es una forma de expresión personal y queremos
          ayudar a nuestros clientes a sentirse confiados y seguros con su
          estilo. Ofrecemos una amplia selección de prendas de vestir y
          accesorios para hombres y mujeres de todas las edades y estilos.
          Además, estamos comprometidos con la sostenibilidad y trabajamos con
          proveedores que comparten nuestra visión de producir prendas de vestir
          de manera ética y respetuosa con el medio ambiente. En NACIOTEX, nos
          esforzamos por superar las expectativas de nuestros clientes y
          construir relaciones duraderas basadas en la confianza y la
          satisfacción. ¡Gracias por elegirnos para ser tu tienda en línea de
          confianza para todas tus necesidades de moda!.
        </p>
      </div>

      <div className={styles.vision}>
        <h5>Visión</h5>
        <p>
          En NACIOTEX, nuestra visión es convertirnos en la tienda en líder en
          moda sostenible y de alta calidad para hombres y mujeres de todas las
          edades. Queremos inspirar a nuestros clientes a expresarse a través de
          la moda y ayudarlos a sentirse seguros y cómodos con su estilo
          personal. Nos esforzamos por ser una empresa ética y sostenible,
          trabajando con proveedores que comparten nuestra visión de producir
          prendas de vestir de manera responsable y respetuosa con el medio
          ambiente. Queremos ser reconocidos como líderes en la industria de la
          moda en línea, no solo por la calidad y el estilo de nuestras prendas
          de vestir y accesorios, sino también por nuestro compromiso con la
          sostenibilidad. Además, queremos construir relaciones duraderas con
          nuestros clientes, basadas en la confianza y la satisfacción. Queremos
          ser una marca en la que los clientes puedan confiar para obtener
          prendas de vestir de calidad y una experiencia de compra excepcional.
          En resumen, nuestra visión en NACIOTEX es liderar la industria de la
          moda, ofreciendo prendas de vestir y accesorios de alta calidad,
          sostenibles y asequibles, mientras brindamos un servicio al cliente
          excepcional y construimos relaciones duraderas con nuestros clientes.
        </p>
      </div>

      <div className={styles.phone}>
        <h5>Líneas de atención</h5>
        <ul>
          <li>(+57) 310 6556056</li>
          <li> naciotex.cali@gmail.com</li>
        </ul>
      </div>

      <div className={styles.adress}>
        <h5>Ubicación:</h5>
        <p>Cra. 8 #16-63, San Nicolas, Cali, Valle del Cauca</p>
      </div>
    </div>
  );
}
