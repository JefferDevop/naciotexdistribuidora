import { TopBar } from "../../components";
import styles from "./BasicLayout.module.scss";

export function BasicLayout(props) {
  const { children } = props;

  return (
    <>
      <div className={styles.basicLayout}>
        <TopBar />
        {children}
      </div>
    </>
  );
}
