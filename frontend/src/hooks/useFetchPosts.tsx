import { useState, useEffect } from 'react';
import { getAllPostsService } from '../services/PostService';
import { Post } from '../models/Post';

export const useFetchPosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getAllPostsService();
                setPosts(data);
            } catch (error) {
                setError('Error fetching posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return { posts, setPosts, loading, error };
};
