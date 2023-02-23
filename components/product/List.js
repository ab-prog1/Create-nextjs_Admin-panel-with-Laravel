import { numberFormat } from "@/lib/helper";
import Image from "next/image";
import Link from "next/link";

const ProductList = ({ products }) => {

    return (
        <div className="table-responsive">
            <table className="table align-middle">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category </th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td><Image src={product.primary_image} placeholder="blur" blurDataURL={product.primary_image_blurDataURL} layout="responsive" width={80} height={53} alt="" /></td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{numberFormat(product.price)}</td>
                            <td>{product.quantity}</td>
                            <td>{product.status=   ('0') ? "Active" : "Inactive"}</td>
                            <td>
                                <div className="d-flex">
                                    <Link href={`products/${product.id}`}>
                                        <a className="btn btn-sm btn-outline-dark me-2">Show</a>
                                    </Link>
                                    <Link href={`/products/edit/${product.id}`}>
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

export default ProductList;