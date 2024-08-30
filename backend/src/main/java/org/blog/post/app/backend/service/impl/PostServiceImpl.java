package org.blog.post.app.backend.service.impl;

import lombok.RequiredArgsConstructor;
import org.blog.post.app.backend.model.Post;
import org.blog.post.app.backend.repository.PostRepository;
import org.blog.post.app.backend.service.PostService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAll().stream()
                .map(post -> new Post(
                        post.id(),
                        post.title(),
                        post.content(),
                        post.author(),
                        post.date(),
                        post.time(),
                        post.likes(),
                        post.dislikes()))
                .toList();
    }
}
