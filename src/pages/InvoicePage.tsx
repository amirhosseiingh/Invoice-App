
import Header from "../components/Header"
import type { Product } from "../types/invoice"
import { invoiceApi } from "../api/InvoiceApi"
import { useState } from "react"

import AddProductModal from "../components/AddProductModal"
import DeleteConfirmModal from "../components/DeleteConfirmModal"
import EditProductModal from "../components/EditProductModal"
import { useQuery } from "@tanstack/react-query"
import Spinner from "../assets/spiner"

function InvoicePage() {
    // const queryClient = useQueryClient()
    
    const [modalOpen , setModalOpen]= useState(false)
    const [deleteModalOpen , setDeleteModalOpen] = useState(false)
    const [selectedId , setSelectedId] = useState<string | null>(null)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [addModalOpen, setAddModalOpen] = useState(false);

    const {data : products , isLoading} = useQuery<Product[]>({
        queryKey : ["products"] , 
        queryFn : invoiceApi.getProducts
    })
    
  if (isLoading) return <Spinner/>;




  return (
    <div className="p-6 space-y-4 ">
      <div className="bg-blue-100 text-blue-900 p-3 rounded-lg mb-6 text-center font-medium">
         پروژه مدیریت فاکتور — ساخته شده توسط امیرحسین قنبریان
      </div>

      <Header />
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-300 text-blue-900 p-2 rounded font-medium hover:bg-blue-400 "
          onClick={() => setAddModalOpen(true)}
        >
          افزودن محصول
        </button>
      </div>

      <table className="w-full border text-left ">
        <thead>
          <tr className="bg-gray-50 text-center">
            <th className="p-2 border">نام کالا</th>
            <th className="p-2 border">تعداد</th>
            <th className="p-2 border">فی</th>
            <th className="p-2 border">جمع</th>
            <th className="p-2 border">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product.id} className="hover:bg-gray-100">
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
                  onClick={() => {
                    setSelectedId(product.id), setDeleteModalOpen(true);
                  }}
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {deleteModalOpen && selectedId && (
        <DeleteConfirmModal
          productId={selectedId}
          onClose={() => {
            setDeleteModalOpen(false);
            setSelectedId(null);
          }}
        />
      )}
      {addModalOpen && (
        <AddProductModal onClose={() => setAddModalOpen(false)} />
      )}
      {modalOpen && editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => {
            setModalOpen(false), setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}

export default InvoicePage
