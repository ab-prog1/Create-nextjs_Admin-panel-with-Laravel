import Link from "next/link";

const UserList = ({ users }) => {

    return (
        <div className="table-responsive">
            <table className="table align-middle">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone number </th>
                        <th>Membership Date </th>
                        <th>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.cellphone}</td>
                            <td>{user.created_at}</td>
                            <td>
                                <div className="d-flex">
                                    <Link href={`users/${user.id}`}>
                                        <a className="btn btn-sm btn-outline-dark me-2">Show</a>
                                    </Link>
                                    <Link href={`/users/edit/${user.id}`}>
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

export default UserList;