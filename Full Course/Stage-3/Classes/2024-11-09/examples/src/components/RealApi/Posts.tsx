import { useEffect, useState } from "react";
import Comments from "./Comments";

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
}

interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

interface PostsProps {
    user: User;
}

const Posts = ({ user }: PostsProps) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [activePost, setActivePost] = useState<Post | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Fetch posts when the user prop changes
    useEffect(() => {
        // Fetch posts when the user prop changes
        const fetchPosts = async () => {
            try {
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
                );
                if (!response.ok) throw new Error("Failed to fetch posts");
                const data = await response.json();
                setPosts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        // Reset error state
        setError(null);

        // Call the fetchPosts function
        fetchPosts();
    }, [user]);

    if (loading) {
        return <div className="p-4">Loading posts...</div>;
    }
    if (error) {
        return <div className="p-4">Error: {error}</div>;
    }

    return (
        <div className="p-4">
            <h2>Posts by {user.name} </h2>
            <ul className="list-group">
                {posts.map((post) => (
                    <li className="list-group-item" key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                        <p>
                            <a
                                className="link-opacity-100"
                                onClick={() =>
                                    setActivePost(
                                        activePost?.id === post.id ? null : post
                                    )
                                }
                            >
                                {activePost?.id === post.id
                                    ? "hide comments"
                                    : "show comments"}
                            </a>
                        </p>
                        {activePost?.id === post.id ? (
                            <Comments post={activePost} />
                        ) : (
                            ""
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Posts;
