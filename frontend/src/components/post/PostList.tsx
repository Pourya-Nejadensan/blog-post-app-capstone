import { useFetchPosts } from '../../hooks/useFetchPosts.tsx';
import PostCard from './PostCard';

export default function PostList() {
    const { posts, loading, error } = useFetchPosts();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <PostCard {...post} />
                    </li>
                ))}
            </ul>
        </div>
    );
}