import { Link } from 'react-router-dom';
import { Post } from "../../models/Post";

type PostCardProps = {
    post: Post;
    onDelete: (postId: string) => void;
}

export default function PostCard({ post, onDelete }: Readonly<PostCardProps>) {

    const handleDeletePostCard = (postId: string) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this post?');
        if (confirmDelete) {
            onDelete(postId);
        }
    };

    return (
        <div>
            <Link to={`/detail-post/${post.id}`} state={post.id}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <p><strong>Author:</strong> {post.author}</p>
                <p><strong>Date:</strong> {post.date} <strong>Time:</strong> {post.time}</p>
                <p><strong>Likes:</strong> {post.likes} <strong>Dislikes:</strong> {post.dislikes}</p>
            </Link>
            <button onClick={() => handleDeletePostCard(post.id)}>Delete</button>
        </div>
    );
}
