import Loading from "@/components/Loading";
import { handleError } from "@/lib/helper";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useSWR from "swr";

const EditUser = () => {
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    const { data: user, error, mutate } = useSWR(router.query.id && `/global?url=/users/${router.query.id}`)

    if (error) {
        toast.error(handleError(error))
    }

    if (!user) {
        return <Loading />
    }

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const res = await axios.put(`/global?url=/users/${router.query.id}`, {
                ...data
            })

            mutate(res.data)

            toast.success(' User edited successfully. ')

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
                <h4 className="fw-bold"> Edit user: {user.name}</h4>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="row gy-4">
                <div className="col-md-3">
                    <label className="form-label">Full name</label>
                    <input {...register("name", { required: 'The name field is required.' })} defaultValue={user.name} type="text" className="form-control" />
                    <div className="form-text text-danger">{errors.name?.message}</div>
                </div>
                <div className="col-md-3">
                    <label className="form-label">Email address</label>
                    <input {...register("email", { required: 'The Email field is required.' })} defaultValue={user.email} type="text" className="form-control" />
                    <div className="form-text text-danger">{errors.email?.message}</div>
                </div>
                <div className="col-md-3">
                    <label className="form-label">Contact number </label>
                    <input {...register("cellphone", { required: 'The Contact number field is required.', pattern: { value: /^(\+98|0)?9\d{9}$/i, message: 'فیلد شماره تماس معتبر نمیباشد' } })} defaultValue={user.cellphone} type="text" className="form-control" />
                    <div className="form-text text-danger">{errors.cellphone?.message}</div>
                </div>
                <div className="col-md-3">
                    <label className="form-label">Password </label>
                    <input {...register("password", { required: 'The Password field is required.' })} type="text" className="form-control" />
                    <div className="form-text text-danger">{errors.password?.message}</div>
                </div>
                <div>
                    <button type="submit" disabled={loading} className="btn btn-outline-dark mt-3">
                    Edit user
                        {loading && <div className="spinner-border spinner-border-sm ms-2"></div>}
                    </button>
                </div>
            </form>
        </>
    )
}

export default EditUser;