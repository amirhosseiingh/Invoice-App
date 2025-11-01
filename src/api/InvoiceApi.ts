import type { Product } from './../types/invoice';
import axios from "axios";
const API_URL = "https://6903577ad0f10a340b23c392.mockapi.io/Invoice";

export const invoiceApi = {
    getProducts : async () : Promise<Product[]> =>{
        const res = await axios.get(API_URL)
        return res.data
    },
    addProduct : async (product : Omit<Product , 'id'>) : Promise<Product> => {
      const res = await axios.post(API_URL , product)  
      return res.data
    },
    updateProduct : async (Product:Product) : Promise<Product> => {
        const res = await axios.put(`${API_URL}/${Product.id}` , Product)
        return res.data
    },
    deleteProduct : async (id :string) : Promise<void> => {
        await axios.delete(`${API_URL}/${id}`)
    }
}