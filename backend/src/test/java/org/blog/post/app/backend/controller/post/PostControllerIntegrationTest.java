package org.blog.post.app.backend.controller.post;

import org.blog.post.app.backend.post.model.Post;
import org.blog.post.app.backend.post.repository.PostRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class PostControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    PostRepository postRepository;

    private Instant combineDateTime() {
        LocalDateTime localDateTime = LocalDateTime.parse("2023-10-01T10:00");
        return localDateTime.atZone(ZoneOffset.UTC).toInstant();
    }

    Instant timestamp = combineDateTime();

    @Test
    @DirtiesContext
    void getAllPosts() throws Exception {
        // given
        postRepository.save(new Post(
                "1",
                "Title1",
                "Content1",
                "Author1",
                timestamp,
                10,
                1
        ));

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
                                "timestamp": "2023-10-01T10:00:00Z",
                                "likes": 10,
                                "dislikes": 1
                            }
                        ]
                        """));
    }


    @Test
    @DirtiesContext
    void createPost() throws Exception {
        // given
        String postDTOJson = """
                {
                    "title": "My First Post",
                    "content": "This is the content of my first post.",
                    "author": "Pourya Nejadensan",
                    "timestamp": "2023-10-01T12:00:00Z",
                    "likes": 0,
                    "dislikes": 0
                }
                """;

        // when
        mockMvc.perform(post("/api/post/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(postDTOJson))

                // then
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("My First Post"))
                .andExpect(jsonPath("$.content").value("This is the content of my first post."))
                .andExpect(jsonPath("$.author").value("Pourya Nejadensan"))
                .andExpect(jsonPath("$.timestamp").value("2023-10-01T12:00:00Z"))
                .andExpect(jsonPath("$.likes").value(0))
                .andExpect(jsonPath("$.dislikes").value(0));
    }

    @Test
    @DirtiesContext
    void deletePostById() throws Exception {
        // given
        postRepository.save(
                new Post(
                        "1",
                        "Title1",
                        "Content1",
                        "Author1",
                        timestamp,
                        10,
                        1
                ));

        // when
        mockMvc.perform(delete("/api/post/delete/{id}", "1")
                        .contentType(MediaType.APPLICATION_JSON))
                // then
                .andExpect(status().isOk())
                .andExpect(content().string("Post deleted successfully"));

        // Verify the post is deleted
        mockMvc.perform(get("/api/post/all"))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    void updatePostById() throws Exception {
        // given
        postRepository.save(
                new Post(
                        "1",
                        "Title1",
                        "Content1",
                        "Author1",
                        timestamp,
                        10,
                        1
                ));

        String postDTOJson = """
                {
                    "title": "My First Post",
                    "content": "This is the content of my first post.",
                    "author": "Pourya Nejadensan",
                    "timestamp": "2023-10-01T12:00:00Z",
                    "likes": 0,
                    "dislikes": 0
                }
                """;

        // when
        mockMvc.perform(put("/api/post/update/{id}", "1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(postDTOJson))
                // then
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("My First Post"))
                .andExpect(jsonPath("$.content").value("This is the content of my first post."))
                .andExpect(jsonPath("$.author").value("Pourya Nejadensan"))
                .andExpect(jsonPath("$.timestamp").value("2023-10-01T12:00:00Z"))
                .andExpect(jsonPath("$.likes").value(0))
                .andExpect(jsonPath("$.dislikes").value(0));
    }

    @Test
    @DirtiesContext
    void getPostById() throws Exception {
        // given
        postRepository.save(
                new Post(
                        "1",
                        "Title1",
                        "Content1",
                        "Author1",
                        timestamp,
                        10,
                        1
                ));

        // when
        mockMvc.perform(get("/api/post/{id}", "1"))
                // then
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Title1"))
                .andExpect(jsonPath("$.content").value("Content1"))
                .andExpect(jsonPath("$.author").value("Author1"))
                .andExpect(jsonPath("$.timestamp").value("2023-10-01T10:00:00Z"))
                .andExpect(jsonPath("$.likes").value(10))
                .andExpect(jsonPath("$.dislikes").value(1));
    }

    @Test
    @DirtiesContext
    void getPostById_NotFound() throws Exception {
        // when
        mockMvc.perform(get("/api/post/{id}", "1"))
                // then
                .andExpect(status().isNotFound());
    }
}
