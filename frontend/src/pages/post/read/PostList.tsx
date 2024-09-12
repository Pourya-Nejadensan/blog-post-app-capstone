import PostCard from './PostCard.tsx';
import { deletePostService } from '../../../services/PostService.tsx';
import { Post } from '../../../models/Post.tsx';
import { Box } from '@mui/material';
import styled from 'styled-components';

type PostListProps = {
    posts: Post[];
    setPosts: (posts: Post[]) => void;
    loading: boolean;
    error: string | null;
};

export default function PostList({ posts, setPosts, loading, error }: Readonly<PostListProps>) {

    const handleDelete = async (postId: string) => {
        try {
            await deletePostService(postId);
            setPosts(posts.filter(post => post.id !== postId));
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
