import Link from "next/link";

const CouponList = ({ coupons }) => {

    return (
        <div className="table-responsive">
            <table className="table align-middle">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Percentage</th>
                        <th>Expiration date </th>
                        <th> Created date</th>
                        <th>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {coupons.map(coupon => (
                        <tr key={coupon.id}>
                            <td>{coupon.code}</td>
                            <td>{coupon.percentage}</td>
                            <td>{coupon.expired_at}</td>
                            <td>{coupon.created_at}</td>
                            <td>
                                <div className="d-flex">
                                    <Link href={`coupons/${coupon.id}`}>
                                        <a className="btn btn-sm btn-outline-dark me-2">Show</a>
                                    </Link>
                                    <Link href={`/coupons/edit/${coupon.id}`}>
                                        <a className="btn btn-sm btn-dark">Edit</a>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CouponList;