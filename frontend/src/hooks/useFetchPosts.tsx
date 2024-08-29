import { useState, useEffect } from 'react';
import { getAllPosts } from '../services/PostService';
import { PostDTO } from '../models/PostDTO.tsx';

export const useFetchPosts = () => {
    const [posts, setPosts] = useState<PostDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getAllPosts();
                setPosts(data);
            } catch (error) {
                setError('Failed to fetch posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return { posts, loading, error };
};
