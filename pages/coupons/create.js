import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { handleError } from "@/lib/helper";
import { toast } from "react-toastify";

import DatePicker, { DateObject } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import gregorian from "react-date-object/calendars/gregorian"
import gregorian_en from "react-date-object/locales/gregorian_en"

const CreateCoupon = () => {
    const [loading, setLoading] = useState(false)
    const [dateExpire, setDateExpire] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {

        try {
            setLoading(true)
            const res = await axios.post(`/global?url=/coupons`, {
                ...data,
                expired_at: dateExpire instanceof DateObject ? dateExpire.convert(gregorian, gregorian_en).format('YYYY-MM-DD HH:mm:ss') : null
            })

            toast.success('The discount code has been created successfully. ')

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
                <h4 className="fw-bold">Create a discount </h4>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="row gy-4">
                <div className="col-md-3">
                    <label className="form-label">code</label>
                    <input {...register("code", { required: 'The code field is required.' })} type="text" className="form-control" />
                    <div className="form-text text-danger">{errors.code?.message}</div>
                </div>
                <div className="col-md-3">
                    <label className="form-label">Percentage</label>
                    <input {...register("percentage", { required: 'The percentage field is required.' })} type="text" className="form-control" />
                    <div className="form-text text-danger">{errors.percentage?.message}</div>
                </div>
                <div className="col-md-3">
                    <label className="form-label">Expiration date </label>
                    <DatePicker
                        inputClass="form-control"
                        calendar={persian}
                        locale={persian_fa}
                        value={dateExpire}
                        onChange={setDateExpire}
                        format="YYYY-MM-DD HH:mm:ss"
                    />
                </div>
                <div>
                    <button type="submit" disabled={loading} className="btn btn-outline-dark mt-3">
                    Create a discount
                        {loading && <div className="spinner-border spinner-border-sm ms-2"></div>}
                    </button>
                </div>
            </form>
        </>
    )
}

export default CreateCoupon;