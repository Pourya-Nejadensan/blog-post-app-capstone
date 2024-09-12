import { useNavigate } from 'react-router-dom';
import { Post } from "../../../models/Post.tsx";
import { deletePostService } from "../../../services/PostService.tsx";
import { format } from "date-fns";

type PostDetailProps = {
    post: Post;
    deletePost: (postId: string) => void;
};

export default function PostDetail({ post, deletePost }: Readonly<PostDetailProps>) {

    const navigate = useNavigate();

    const handleEditPostDetail = () => {
        navigate(`/edit-post/${post.id}`);
    };

    const handleDelete = async (postId: string) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this post?');
        if (confirmDelete) {
            try {
                await deletePostService(postId);
                deletePost(postId);
                navigate('/');
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };

    if (!post) {
        return <div>Post not found</div>;
    }

    const formattedDate = format(new Date(post.timestamp), 'yyyy-MM-dd');
    const formattedTime = format(new Date(post.timestamp), 'HH:mm');

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p><strong>Author:</strong> {post.author}</p>
            <p><strong>Date:</strong> {formattedDate} <strong>Time:</strong> {formattedTime}</p>
            <p><strong>Likes:</strong> {post.likes} <strong>Dislikes:</strong> {post.dislikes}</p>
            <button onClick={ handleEditPostDetail }>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
    );
}
