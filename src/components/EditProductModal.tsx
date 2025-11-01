import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { Product } from "../types/invoice";
import { invoiceApi } from "../api/InvoiceApi";
import toast from "react-hot-toast";

interface EditModalProps {
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    count: number;
    description : string
  };
}

function EditProductModal({onClose , product} : EditModalProps) {
    const [name , setName] = useState(product.name)
    const [price, setPrice] = useState(product.price.toString());
    const [count , setCount] = useState(product.count.toString())
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn : (updateData : Product) =>{
            return invoiceApi.updateProduct(updateData);
        },
        onSuccess : ()=>{
            toast.success('ویرایش با موفقیت انجام شد')
             queryClient.invalidateQueries({ queryKey: ["products"] });
             onClose();
        },
        onError : ()=>{
            toast.error('ویرایش انجام نشد')
        }
    })

    const handleSubmit = (e : React.FormEvent)=>{
        e.preventDefault();
        console.log({ id: product.id, name, price, count });

        mutation.mutate({
          id: product.id,
          name,
          price: Number(price),
          count: Number(count),
          description: product.description || "",
        });
    }
  return (
    <div
      dir="rtl"
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-5">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          ویرایش محصول
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="نام کالا"
            className="border border-gray-300 rounded p-2 text-right focus:outline-none "
          />
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            placeholder="تعداد"
            className="border border-gray-300 rounded p-2 text-right focus:outline-none  "
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="فی"
            className="border border-gray-300 rounded p-2 text-right focus:outline-none  "
          />

          <div className="border border-gray-300 rounded p-2 text-right text-gray-800 font-medium">
            جمع نهایی: {(Number(count) * Number(price)).toLocaleString()} تومان
          </div>

          <div className="flex justify-center gap-5 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-400 text-white rounded px-4 py-2 hover:bg-red-600 "
            >
              لغو
            </button>
            <button
              type="submit"
              className="bg-blue-400 text-white rounded px-4 py-2 hover:bg-blue-800 "
            >
              ذخیره تغییرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductModal;
