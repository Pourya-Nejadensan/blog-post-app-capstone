package org.blog.post.app.backend.controller;

import org.blog.post.app.backend.model.Post;
import org.blog.post.app.backend.repository.PostRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class PostControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    PostRepository postRepository;

    @Test
    @DirtiesContext
    void getAllPosts() throws Exception {
        // given
        postRepository.save(new Post("1", "Title1", "Content1", "Author1", "2023-10-01", "10:00", 10, 1));

        // when
        mockMvc.perform(get("/api/post/all"))

        // then
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                            {
                                "id": "1",
                                "title": "Title1",
                                "content": "Content1",
                                "author": "Author1",
                                "date": "2023-10-01",
                                "time": "10:00",
                                "likes": 10,
                                "dislikes": 1
                            }
                        ]
                        """));
    }

}
