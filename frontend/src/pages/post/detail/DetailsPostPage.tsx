import PostDetail from './PostDetail.tsx';
import {useNavigate, useParams} from "react-router-dom";
import { PostDTO } from "../../../dto/PostDTO.tsx";
import { useEffect, useState } from "react";
import { Post } from "../../../models/Post.tsx";
import { getPostByIdService } from "../../../services/PostService.tsx";
import { convertPostDTOToPost } from "../../../util/maper/convertPostDTOToPost.tsx";

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
        <div>
            <h1>Post detail page</h1>
            <PostDetail post={post} deletePost={deletePost}/>
        </div>
    );
}
