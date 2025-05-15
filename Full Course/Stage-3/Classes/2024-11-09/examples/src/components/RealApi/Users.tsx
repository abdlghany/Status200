import { useState, useEffect } from "react";
import Posts from "./Posts";

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
}

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeUser, setActiveUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Fetch users when the component mounts
    useEffect(() => {
        // Fetch users when the component mounts
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/users"
                );
                if (!response.ok) throw new Error("Failed to fetch users");
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        // Reset error state
        setError(null);

        // Call the fetchUsers function
        fetchUsers();
    }, []);

    if (loading) {
        return <div className="p-4">Loading users...</div>;
    }
    if (error) {
        return <div className="p-4">Error: {error}</div>;
    }

    return (
        <>
            <div className="p-4">
                <h2>Users List</h2>
                <ul className="list-group">
                    {users.map((user) => (
                        <li
                            className={`list-group-item ${
                                user.id === activeUser?.id ? "active" : ""
                            }`}
                            key={user.id}
                            onClick={() => setActiveUser(user)}
                        >
                            {user.name}
                        </li>
                    ))}
                </ul>
            </div>
            {activeUser ? <Posts user={activeUser} /> : ""}
        </>
    );
};

export default Users;
