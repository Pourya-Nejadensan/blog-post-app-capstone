import { useFetchPosts } from '../../hooks/useFetchPosts';
import PostCard from '../post/PostCard';
import { deletePost } from '../../services/PostService';
import { useState, useEffect } from 'react';
import { Post } from '../../models/Post';
import { Box } from '@mui/material';
import styled from 'styled-components';

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
        <StyledBox>
            {posts.map(post => (
                <PostCard key={post.id} post={post} onDelete={handleDelete} />
            ))}
        </StyledBox>
    );
}

const StyledBox = styled(Box)`
    margin-top: 64px; /* Adjust based on the height of the header */
    margin-bottom: 64px; /* Adjust based on the height of the footer */
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px; /* Adjust the gap between items as needed */
`;
