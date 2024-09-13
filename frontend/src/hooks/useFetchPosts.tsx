import { useState, useEffect } from 'react';
import { getAllPostsService } from '../services/PostService';
import { Post } from '../models/Post';
import { PostDTO } from "../dto/PostDTO.tsx";
import { convertPostDTOToPost } from "../util/maper/convertPostDTOToPost.tsx";

export const useFetchPosts = () => {

    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const addNewPost = (newPost: Post) => {
        setPosts((prevPosts) => [...prevPosts, newPost]);
    }

    const updatePost = (postId: string, updatedPostDTO: PostDTO) => {
        const updatedPost: Post = convertPostDTOToPost(postId, updatedPostDTO);
        setPosts((prevPosts) =>
            prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
        );
    };

    const deletePost = (postId: string) => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    }

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

        fetchPosts().then(r => r);
    }, []);

    return { posts, loading, error, addNewPost, updatePost, deletePost };
};
