import { useEffect, useState } from "react";

interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

interface Comment {
    id: number;
    postId: number;
    name: string;
    email: string;
    body: string;
}

interface CommentsProps {
    post: Post;
}

const Comments = ({ post }: CommentsProps) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch comments when the post prop changes
    useEffect(() => {
        // Fetch comments when the post prop changes
        const fetchComments = async () => {
            try {
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`
                );
                if (!response.ok) throw new Error("Failed to fetch comments");
                const data = await response.json();
                setComments(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        // Reset error state
        setError(null);

        // Call the fetchComments function
        fetchComments();
    }, [post]);

    if (loading) {
        return <div className="p-4">Loading comments...</div>;
    }
    if (error) {
        return <div className="p-4">Error: {error}</div>;
    }

    return (
        <div className="p-4">
            <ul className="list-group">
                {comments.map((comment) => (
                    <li key={comment.id} className="list-group-item">
                        <strong>{comment.name}</strong> - {comment.email}
                        <p>{comment.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Comments;
