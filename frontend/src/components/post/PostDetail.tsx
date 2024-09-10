import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Post } from "../../models/Post.tsx";
import { deletePost, getPostById } from "../../services/PostService.tsx";
import {format} from "date-fns";

type PostDetailProps = {
    readonly postId: string;
};

export default function PostDetail({ postId }: PostDetailProps) {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const fetchedPost = await getPostById(postId);
                setPost(fetchedPost);
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost().then(r => r);
    }, [postId]);

    const handleEditPostDetail = (post: Post) => {
        navigate(`/edit-post/${postId}`, { state: { post: post, postId: postId } });
    };

    const handleDelete = async (postId: string) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this post?');
        if (confirmDelete) {
            try {
                await deletePost(postId);
                navigate('/');
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

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
            <button onClick={() => handleEditPostDetail(post)}>Edit</button>
            <button onClick={() => handleDelete(postId)}>Delete</button>
        </div>
    );
}
