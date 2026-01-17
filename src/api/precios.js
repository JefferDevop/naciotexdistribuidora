
import { BASE_API_PRECIOS } from "../config/constants";


export async function fetchProductByBarcode(code) {


    const codeFilter = `producto=${code}`;
   
    try {
      const url = `${BASE_API_PRECIOS}/?${codeFilter}`;
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }