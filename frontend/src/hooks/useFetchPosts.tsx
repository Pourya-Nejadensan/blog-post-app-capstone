import { useState, useEffect } from 'react';
import { getAllPosts } from '../services/PostService';
import { Post } from '../models/Post.tsx';

export const useFetchPosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await getAllPosts();
                setPosts(res);
            } catch (error) {
                setError('Failed to fetch posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts().then(r => r);
    }, []);

    return { posts, loading, error };
};
