import { useFetchPosts } from '../../hooks/useFetchPosts';
import PostCard from './PostCard';
import { deletePost } from '../../services/PostService';
import { useState, useEffect } from 'react';
import { Post } from '../../models/Post';

export default function PostList() {
    const { posts, loading, error } = useFetchPosts();
    const [postList, setPostList] = useState<Post[]>([]);

    useEffect(() => {
        setPostList(posts);
    }, [posts]);

    const handleDelete = async (postId: string) => {
        try {
            await deletePost(postId);
            setPostList(postList.filter(post => post.id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Posts</h1>
                  <ul>
                    {postList.map(post => (
                        <li key={post.id}>
                            <PostCard post={post} onDelete={handleDelete} />
                        </li>
                    ))}
                </ul>
        </div>
    );
}
