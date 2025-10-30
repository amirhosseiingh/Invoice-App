import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Header from "../components/Header"
import type { Product } from "../types/invoice"
import { invoiceApi } from "../api/InvoiceApi"
import { useState } from "react"
import toast from "react-hot-toast"

function InvoicePage() {
    const queryClient = useQueryClient()
    const [modalOpen , setModalOpen]= useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const {data : products , isLoading} = useQuery<Product[]>({
        queryKey : ["products"] , 
        queryFn : invoiceApi.getProducts
    })
    const deleteMutation = useMutation({
      mutationFn: invoiceApi.deleteProduct,
      onSuccess: () => {
        toast.success("محصول با موفقیت حذف شد");
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
      onError: () => {
        toast.error("حذف محصول انجام نشد");
      },
    });

  if (isLoading) return <div>Loading...</div>;




  return (
    <div className="p-6">
      <Header />

      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="p-2 border">نام کالا</th>
            <th className="p-2 border">تعداد</th>
            <th className="p-2 border">فی</th>
            <th className="p-2 border">جمع</th>
            <th className="p-2 border">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product.id}>
              <td className="p-2 border text-center">{product.name}</td>
              <td className="p-2 border text-center">{product.count}</td>
              <td className="p-2 border text-center">{product.price}</td>
              <td className="p-2 border text-center">
                {product.price * product.count}
              </td>
              <td className="p-2 border w-64 text-center">
                <button
                  className="text-yellow-800 mr-8 bg-yellow-200 p-1 rounded hover:text-yellow-200 hover:bg-yellow-800"
                  onClick={() => {
                    setModalOpen(true);
                    setEditingProduct(product);
                  }}
                >
                  ویرایش
                </button>
                <button
                  className="text-red-800 mr-8 bg-red-400 p-1 rounded hover:text-red-400 hover:bg-red-800"
                  onClick={() => deleteMutation.mutate(product.id)}
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InvoicePage
