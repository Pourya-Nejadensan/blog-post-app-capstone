import PostDetail from './PostDetail.tsx';
import { useNavigate, useParams } from "react-router-dom";
import { PostDTO } from "../../../dto/PostDTO.tsx";
import { useEffect, useState } from "react";
import { Post } from "../../../models/Post.tsx";
import { getPostByIdService } from "../../../services/PostService.tsx";
import { convertPostDTOToPost } from "../../../util/maper/convertPostDTOToPost.tsx";

import { Container } from '@mui/material';
import styled from 'styled-components';

type DetailsPostPageProps = {
    deletePost: (postId: string) => void;
}

export default function DetailsPostPage({ deletePost }: Readonly<DetailsPostPageProps>) {

    const [post, setPost] = useState<Post>();
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
                setPost(post);
            } catch (error) {
                console.error('Error getting post by id:', error);
            }
        };

        fectchPost().then(r => r);
    }, [postId, navigate]);

    if (!post) {
        return <div>Post not found!</div>;
    }

    return (
        <StyledContainer>
            <PostDetail post={post} deletePost={deletePost} />
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