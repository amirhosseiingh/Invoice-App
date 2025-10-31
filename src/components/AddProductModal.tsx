import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invoiceApi } from "../api/InvoiceApi";
import toast from "react-hot-toast";
import type { Product } from "../types/invoice";



interface AddModalProps {
  onClose: () => void;
}

function AddProductModal({ onClose }: AddModalProps) {
  const { register, handleSubmit, reset } = useForm<Product>();
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: invoiceApi.addProduct,
    onSuccess: () => {
      toast.success("محصول با موفقیت اضافه شد");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      reset();
      onClose();
    },

    onError: () => {
      toast.error("خطا در افزودن محصول");
    },
  });

  const onSubmit = (data: Product) => {
    addMutation.mutate({
      name: data.name,
      count: Number(data.count),
      price: Number(data.price),
      description: data.description,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-5">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          افزودن محصول
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col "
        >
          <input
            {...register("name")}
            placeholder="نام کالا"
            className="input border text-right border-gray-100 rounded p-0.5"
          />
          <input
            type="number"
            {...register("count")}
            placeholder="تعداد"
            className=" border text-right border-gray-100 rounded p-0.5"
            onChange={(e) => setCount(+e.target.value)}
          />
          <input
            type="number"
            {...register("price")}
            placeholder="فی"
            className=" border text-right border-gray-100 rounded p-0.5"
            onChange={(e) => setPrice(+e.target.value)}
          />
          <input
            {...register("description")}
            placeholder="توضیحات"
            className=" border text-right border-gray-100 rounded p-0.5"
          />
          <div className="border text-right border-gray-100 rounded p-0.5 text-gray-800">
            جمع نهایی: {count * price} تومان
          </div>
          <div className="flex justify-center gap-5 pt-4">
            <button
              type="button"
              onClick={onClose}
              className=" bg-red-300 text-white rounded p-1 hover:bg-red-900"
            >
              لغو
            </button>
            <button
              type="submit"
              className=" bg-blue-300 text-white rounded p-1 hover:bg-blue-900"
            >
              افزودن
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductModal;
