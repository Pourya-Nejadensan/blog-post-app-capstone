import { useNavigate } from 'react-router-dom';
import { Post } from "../../../models/Post.tsx";
import { deletePostService } from "../../../services/PostService.tsx";
import { format } from "date-fns";

import { Button, Typography, Box } from '@mui/material';
import styled from 'styled-components';

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
        <StyledContainer>
            <Typography variant="h3" component="h1">{post.title}</Typography>
            <Typography variant="subtitle1" component="p">By {post.author} on {formattedDate} at {formattedTime}</Typography>
            <Typography variant="body1" component="p" mt={10} mb={10} align={"left"} sx={{ wordBreak: 'break-word'}}>{post.content}</Typography>
            <Box mt={2} display="flex" justifyContent="left">
                <Button variant="contained" color="primary" onClick={handleEditPostDetail} sx={{ mr: 1 }}>Edit</Button>
                <Button variant="contained" color="error" onClick={() => handleDelete(post.id)}>Delete</Button>
            </Box>
        </StyledContainer>
    );
}

const StyledContainer = styled(Box)`
    width: 100%;
    max-width: 800px;
    margin: 32px auto;
    padding: 16px;
    border-radius: 8px;
    background-color: #fff;
`;
