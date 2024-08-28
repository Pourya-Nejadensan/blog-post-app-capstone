package org.blog.post.app.backend.controller;

import lombok.RequiredArgsConstructor;
import org.blog.post.app.backend.dto.PostDTO;
import org.blog.post.app.backend.service.impl.PostServiceImpl;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/post")
@RequiredArgsConstructor
public class PostController {

    private final PostServiceImpl postServiceImpl;

    @GetMapping("/all")
    public List<PostDTO> getAllPosts() {
        return postServiceImpl.getAllPosts();
    }
}
