import axios from 'axios';
import { PostDTO } from "../dto/PostDTO";

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

export const updatePost = async (postId: string, postDTO: PostDTO) => {
    try {
        const response = await axios.put(`${API_URL}/update/${postId}`, postDTO);
        return response.data;
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
};

export const getPostById = async (postId: string) => {
    try {
        const response = await axios.get(`${API_URL}/${postId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error;
    }
};
