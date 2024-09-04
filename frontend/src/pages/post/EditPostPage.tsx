import { useLocation } from 'react-router-dom';
import EditPostForm from '../../components/post/EditPostForm';

export default function EditPostPage() {
    const postState = useLocation().state;

    return (
        <div>
            <h1>Edit Post</h1>
            <EditPostForm  postId={postState.postId} post={postState.post} />
        </div>
    );
}
