package org.blog.post.app.backend.service;

import org.blog.post.app.backend.dto.PostDTO;

import java.util.List;

public interface PostService {
    List<PostDTO> getAllPosts();
}
