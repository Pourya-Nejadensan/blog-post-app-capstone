package org.blog.post.app.backend.controller;

import lombok.RequiredArgsConstructor;
import org.blog.post.app.backend.model.Post;
import org.blog.post.app.backend.service.impl.PostServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/post")
@RequiredArgsConstructor
public class PostController {

    private final PostServiceImpl postServiceImpl;

    @GetMapping("/all")
    public List<Post> getAllPosts() {
        return postServiceImpl.getAllPosts();
    }
}
