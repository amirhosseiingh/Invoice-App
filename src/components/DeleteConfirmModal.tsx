import { useMutation, useQueryClient } from "@tanstack/react-query"
import { invoiceApi } from "../api/InvoiceApi"
import toast from "react-hot-toast"


interface DeleteModalProps {
    productId : string ,
    onClose : ()=> void
}


function DeleteConfirmModal({productId , onClose} : DeleteModalProps) {

    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn : invoiceApi.deleteProduct,
        onSuccess : ()=>{
            toast.success("محصول با موفقیت حذف شد")
            queryClient.invalidateQueries({queryKey : ['products']})
            onClose()
        },
        onError :()=>{
            toast.error("محصول حذف نشد")
        }
    })
   return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 space-y-4 text-center">
        <h2 className="text-lg font-semibold text-gray-800">
          آیا از حذف این محصول مطمئن هستی؟
        </h2>
        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            لغو
          </button>
          <button
            onClick={() => deleteMutation.mutate(productId)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            تایید حذف
          </button>
        </div>
      </div>
    </div>
  );
  
}

export default DeleteConfirmModal
