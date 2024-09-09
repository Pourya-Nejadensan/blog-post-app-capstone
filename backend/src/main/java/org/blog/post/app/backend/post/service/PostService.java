package org.blog.post.app.backend.post.service;

import org.blog.post.app.backend.post.dto.PostDTO;
import org.blog.post.app.backend.post.model.Post;

import java.util.List;

public interface PostService {
    List<Post> getAllPosts();
    Post createPost(PostDTO postDTO);
    void deletePostById(String id);
    PostDTO updatePostById(String id, PostDTO postDTO);
    PostDTO getPostById(String id);
}
