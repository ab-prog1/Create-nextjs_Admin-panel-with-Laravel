import { handleError } from "@/lib/helper"
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import { toast } from "react-toastify"

const DeleteUser = ({ id }) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const handleDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/global?url=/coupons/${id}`)
            
            toast.success('   Discount successfully removed. ')
            router.push("/coupons")

        } catch (err) {
            toast.error(handleError(err))
        } finally {
            setLoading(false)
        }
    }

    return (
        <button onClick={handleDelete} disabled={loading} className="btn btn-dark mt-5">
              Delete
            {loading && <div className="spinner-border spinner-border-sm ms-2"></div>}
        </button>
    )
}

export default DeleteUser;