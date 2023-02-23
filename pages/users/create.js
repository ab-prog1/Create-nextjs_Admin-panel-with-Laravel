import { handleError } from "@/lib/helper";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const CreateUser = () => {
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const res = await axios.post(`/global?url=/users`, {
                ...data
            })
            toast.success('User successfully created.')

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
                <h4 className="fw-bold"> Create  user</h4>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="row gy-4">
                <div className="col-md-3">
                    <label className="form-label">Full name</label>
                    <input {...register("name", { required: 'The name field is required.' })} type="text" className="form-control" />
                    <div className="form-text text-danger">{errors.name?.message}</div>
                </div>
                <div className="col-md-3">
                    <label className="form-label">Email address</label>
                    <input {...register("email", { required: 'The Email field is required.' })} type="text" className="form-control" />
                    <div className="form-text text-danger">{errors.email?.message}</div>
                </div>
                <div className="col-md-3">
                    <label className="form-label">Contact number </label>
                    <input {...register("cellphone", { required: 'The Contact number field is required.', pattern: { value: /^(\+98|0)?9\d{9}$/i, message: 'فیلد شماره تماس معتبر نمیباشد' } })} type="text" className="form-control" />
                    <div className="form-text text-danger">{errors.cellphone?.message}</div>
                </div>
                <div className="col-md-3">
                    <label className="form-label">Password </label>
                    <input {...register("password", { required: 'The Password field is required.' })} type="password" className="form-control" />
                    <div className="form-text text-danger">{errors.password?.message}</div>
                </div>
                <div>
                    <button type="submit" disabled={loading} className="btn btn-outline-dark mt-3">
                    Create  user
                        {loading && <div className="spinner-border spinner-border-sm ms-2"></div>}
                    </button>
                </div>
            </form>
        </>
    )
}

export default CreateUser;