package org.blog.post.app.backend.service;

import org.blog.post.app.backend.dto.PostDTO;
import org.blog.post.app.backend.model.Post;

import java.util.List;

public interface PostService {
    List<Post> getAllPosts();
    Post createPost(PostDTO postDTO);
}
