import PostCreate from './PostCreate.tsx';
import { Post } from "../../../models/Post.tsx";

import { Typography, Box } from '@mui/material';
import styled from 'styled-components';

interface CreatePostPageProps {
    addNewPost: (newPost: Post) => void
}

export default function CreatePostPage({addNewPost}: Readonly<CreatePostPageProps>) {
    return (
        <StyledContainer>
            <Typography variant="h3" component="h1" align="center">Create a New Post</Typography>
            <PostCreate addNewPost={addNewPost} />
        </StyledContainer>
    );
};

const StyledContainer = styled(Box)`
    width: 100%;
    max-width: 800px;
    margin: 32px auto;
    padding: 16px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;