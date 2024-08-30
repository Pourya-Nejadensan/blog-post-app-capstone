import { Post } from '../../models/Post.tsx';

export default function PostCard (post: Readonly<Post>) {
    return (
        <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p><strong>Author:</strong> {post.author}</p>
            <p><strong>Date:</strong> {post.date} <strong>Time:</strong> {post.time}</p>
            <p><strong>Likes:</strong> {post.likes} <strong>Dislikes:</strong> {post.dislikes}</p>
        </div>
    );
};
