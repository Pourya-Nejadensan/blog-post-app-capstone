import axios from 'axios';
import {PostDTO} from "../dto/PostDTO.tsx";

const API_URL = '/api/post';

export const getAllPosts = async () => {
    try {
        const response = await axios.get(`${API_URL}/all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

export const createPost = async (postDTO: PostDTO) => {
    try {
        const response = await axios.post(`${API_URL}/create`, postDTO);
        return response.data;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};

export const deletePost = async (postId: string) => {
    try {
        await axios.delete(`${API_URL}/delete/${postId}`);
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
};
