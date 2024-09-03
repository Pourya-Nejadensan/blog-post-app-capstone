import {Post} from "../../models/Post.tsx";

type PostCardProps = {
    post: Post;
    onDelete: (postId: string) => void;
}

export default function PostCard ({ post , onDelete}: Readonly<PostCardProps>) {
    const handleDelete = () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this post?');
        if (confirmDelete) {
            onDelete(post.id);
        }
}

    return (
        <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p><strong>Author:</strong> {post.author}</p>
            <p><strong>Date:</strong> {post.date} <strong>Time:</strong> {post.time}</p>
            <p><strong>Likes:</strong> {post.likes} <strong>Dislikes:</strong> {post.dislikes}</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}
