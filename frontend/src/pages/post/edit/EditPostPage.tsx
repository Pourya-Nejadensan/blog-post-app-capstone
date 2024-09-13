import { useNavigate , useParams } from 'react-router-dom';
import EditPostForm from './EditPostForm.tsx';
import { Post } from "../../../models/Post.tsx";
import { getPostByIdService } from "../../../services/PostService.tsx";
import { useEffect, useState } from "react";
import { PostDTO } from "../../../dto/PostDTO.tsx";
import {convertPostDTOToPost} from "../../../util/maper/convertPostDTOToPost.tsx";

import { Container, Typography } from '@mui/material';
import styled from 'styled-components';

type EditPostPageProps = {
    updatePost: (postId: string, updatedPost: PostDTO) => void;
}

export default function EditPostPage({ updatePost }: Readonly<EditPostPageProps>) {

    const [postToEdit, setPostToEdit] = useState<Post>();
    const { postId } = useParams<{ postId: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if(!postId) {
            navigate('/');
            return
        }
        const fectchPost = async () => {
            try {
                const postDTO: PostDTO = await getPostByIdService(postId);
                const post: Post = convertPostDTOToPost(postId, postDTO);
                setPostToEdit(post);
            } catch (error) {
                console.error('Error getting post by id:', error);
            }
        };

        fectchPost().then(r => r);
    }, [postId, navigate]);


    if (!postToEdit) {
        return <div>Post not found</div>;
    }

    return (
        <StyledContainer>
            <Typography variant="h4" component="h1">Edit Post</Typography>
            <EditPostForm post={postToEdit} updatePost={updatePost} />
        </StyledContainer>
    );
}

const StyledContainer = styled(Container)`
    margin-top: 64px;
    margin-bottom: 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
`;