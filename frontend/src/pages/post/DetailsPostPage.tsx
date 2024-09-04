import PostDetail from '../../components/post/PostDetail.tsx';
import {useLocation} from "react-router-dom";

export default function DetailsPostPage() {

    const postIdState = useLocation().state;

    return (
        <div>
            <h1>Post detail page</h1>
            <PostDetail postId={postIdState}/>
        </div>
    );
}
