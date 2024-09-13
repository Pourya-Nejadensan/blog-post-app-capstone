import PostCreate from './PostCreate.tsx';
import { Post } from "../../../models/Post.tsx";

interface CreatePostPageProps {
    addNewPost: (newPost: Post) => void
}

export default function CreatePostPage({addNewPost}: Readonly<CreatePostPageProps>) {
    return (
        <div>
            <h1>Create a New Post</h1>
            <PostCreate addNewPost={addNewPost}/>
        </div>
    );
};
