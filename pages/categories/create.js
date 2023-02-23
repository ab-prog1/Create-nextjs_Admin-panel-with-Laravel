import { handleError } from "@/lib/helper";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const CreateCategory = () => {
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const res = await axios.post(`/global?url=/categories`, {
                ...data
            })
            toast.success('The desired category was created successfully.')

        } catch (err) {
            toast.error(handleError(err))
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h4 className="fw-bold">Create categories  </h4>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="row gy-4">
                <div className="col-md-3">
                    <label className="form-label">Name</label>
                    <input {...register("name", { required: '   The name field is required.' })} type="text" className="form-control" />
                    <div className="form-text text-danger">{errors.name?.message}</div>
                </div>
                <div className="col-md-3">
                    <label className="form-label">Description</label>
                    <input {...register("description")} type="text" className="form-control" />
                    <div className="form-text text-danger">{errors.description?.message}</div>
                </div>
                
                <div>
                    <button type="submit" disabled={loading} className="btn btn-outline-dark mt-3">
                    Create categories
                        {loading && <div className="spinner-border spinner-border-sm ms-2"></div>}
                    </button>
                </div>
            </form>
        </>
    )
}

export default CreateCategory;