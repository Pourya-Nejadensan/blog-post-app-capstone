import { useParams } from 'react-router-dom';
import EditPostForm from './EditPostForm.tsx';
import { Post } from "../../../models/Post.tsx";
import { getPostByIdService } from "../../../services/PostService.tsx";
import { useEffect, useState } from "react";
import { PostDTO } from "../../../dto/PostDTO.tsx";

type EditPostPageProps = {
    updatePost: (postId: string, updatedPost: PostDTO) => void;
}

export default function EditPostPage({ updatePost }: Readonly<EditPostPageProps>) {

    const [postToEdit, setPostToEdit] = useState<Post>();
    const { postId } = useParams<{ postId: string }>();

    if (postId === undefined) {
        throw new Error('Undefined id');
    } else {
        useEffect(() => {
            const fetchPost = async () => {
                try {
                    const postToEdit = await getPostByIdService(postId);
                    setPostToEdit(postToEdit);
                } catch (error) {
                    console.error('Error getting post by id:', error);
                }
            };
            fetchPost().then(r => r);
        }, [postId]);
    }

    if (!postToEdit) {
        return <div>Post not found</div>;
    }

    return (
        <div>
            <h1>Edit Post</h1>
            <EditPostForm  postId={postId}  post={postToEdit} updatePost={updatePost} />
        </div>
    );
}
