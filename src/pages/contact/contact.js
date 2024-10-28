import { Footer, Contact, Redes } from "@/components";
import { BasicLayout } from "../../layouts";

export default function ContactHome() {
  return (
    <>
      <BasicLayout>
        <Redes />
        <Contact />

        <Footer />
      </BasicLayout>
    </>
  );
}
