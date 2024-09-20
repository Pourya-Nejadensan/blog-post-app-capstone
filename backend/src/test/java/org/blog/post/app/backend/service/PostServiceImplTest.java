package org.blog.post.app.backend.service;

import org.blog.post.app.backend.post.dto.PostDTO;
import org.blog.post.app.backend.post.exception.ResourceNotFoundException;
import org.blog.post.app.backend.post.model.Post;
import org.blog.post.app.backend.post.repository.PostRepository;
import org.blog.post.app.backend.post.service.impl.PostServiceImpl;
import org.blog.post.app.backend.post.util.IdService;
import org.junit.jupiter.api.Test;
import org.springframework.test.annotation.DirtiesContext;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PostServiceImplTest {

    private final PostRepository postRepository = mock(PostRepository.class);
    private final IdService idService = mock(IdService.class);
    private final PostServiceImpl postServiceImpl = new PostServiceImpl(postRepository, idService);

    private Instant combineDateTime() {
        LocalDateTime localDateTime = LocalDateTime.parse("2023-10-01" + "T" + "10:00");
        return localDateTime.atZone(ZoneId.systemDefault()).toInstant();
    }

    Instant timestamp = combineDateTime();

    @Test
    void getAllPostsTest_whenPostsAreEmpty_thenReturnTrue() {
        // given
        when(postRepository.findAll()).thenReturn(List.of());

        // when
        List<Post> posts = postServiceImpl.getAllPosts();

        // then
        assertTrue(posts.isEmpty());
    }

    @Test
    void getAllPostsTest_whenPostsAreNotEmpty_thenReturnTrue() {
        // given
        List<Post> mockPosts = List.of(
            new Post(
                    "1",
                    "Title1",
                    "Content1",
                    "Author1",
                    timestamp,
                    10,
                    1
            ),

            new Post(
                    "2",
                    "Title2",
                    "Content2",
                    "Author2",
                    timestamp,
                    20,
                    2
            )
        );

        when(postRepository.findAll()).thenReturn(mockPosts);

        // when
        List<Post> posts = postServiceImpl.getAllPosts();

        // then
        verify(postRepository).findAll();
        assertEquals(posts, mockPosts);
    }

    @Test
    void getAllPostsTest_whenPostsAreReturned_thenReturnSamePosts() {
        // given
        List<Post> mockPosts = List.of(
                new Post(
                        "1",
                        "Title1",
                        "Content1",
                        "Author1",
                        timestamp,
                        10,
                        1
                ),

                new Post(
                        "2",
                        "Title2",
                        "Content2",
                        "Author2",
                        timestamp,
                        20,
                        2
                )
        );

        when(postRepository.findAll()).thenReturn(mockPosts);

        // when
        List<Post> posts = postServiceImpl.getAllPosts();

        // then
        verify(postRepository).findAll();
        assertEquals(mockPosts, posts);
        assertEquals(2, posts.size());
        assertEquals("Title1", posts.get(0).title());
        assertEquals("Title2", posts.get(1).title());
    }

    @Test
    void createPostTest_whenPostIsCreated_thenReturnCreatedPost() {
        // given
        Post expectedPost = new Post(
                "1",
                "Title1",
                "Content1",
                "Author1",
                timestamp,
                10,
                1);
        when(postRepository.save(expectedPost)).thenReturn(expectedPost);
        when(idService.generateId()).thenReturn(expectedPost.id());

        PostDTO postDTO = new PostDTO(
                expectedPost.title(),
                expectedPost.content(),
                expectedPost.author(),
                expectedPost.timestamp(),
                expectedPost.likes(),
                expectedPost.dislikes());

        // when
        Post createdPost = postServiceImpl.createPost(postDTO);

        // then
        verify(postRepository).save(expectedPost);
        verify(idService).generateId();
        assertEquals(expectedPost, createdPost);
    }

    @Test
    @DirtiesContext
    void deletePostById_whenPostExists_thenPostIsDeleted(){
        //GIVEN
        doNothing().when(postRepository).deleteById("1");
        //WHEN
        postRepository.deleteById("1");
        //THEN
        verify(postRepository).deleteById("1");
    }

    @Test
    @DirtiesContext
    void deletePostById_whenPostDoesNotExist_thenThrowResourceNotFoundException() {
        // given
        doThrow(new ResourceNotFoundException("Post", "id", "1")).when(postRepository).deleteById("1");

        // when & then
        assertThrows(ResourceNotFoundException.class, () -> postServiceImpl.deletePostById("1"));
    }

    @Test
    void updatePostById_whenPostExists_thenPostIsUpdated() {
        // given
        Post post = new Post(
                "1",
                "Title1",
                "Content1",
                "Author1",
                timestamp,
                10,
                1
        );
        when(postRepository.findById("1")).thenReturn(Optional.of(post));
        when(postRepository.save(post)).thenReturn(post);

        PostDTO postDTO = new PostDTO(
                "Title1",
                "Content1",
                "Author1",
                timestamp,
                10,
                1
        );

        // when
        PostDTO updatedPost = postServiceImpl.updatePostById("1", postDTO);

        // then
        verify(postRepository).findById("1");
        verify(postRepository).save(post);
        assertEquals(postDTO, updatedPost);
    }

    @Test
    void updatePostById_whenPostDoesNotExist_thenThrowResourceNotFoundException() {
        // given
        when(postRepository.findById("1")).thenReturn(Optional.empty());

        PostDTO postDTO = new PostDTO(
                "Title1",
                "Content1",
                "Author1",
                timestamp,
                10,
                1
        );

        // when & then
        assertThrows(ResourceNotFoundException.class, () -> postServiceImpl.updatePostById("1", postDTO));
    }

    @Test
    void getPostById_whenPostExists_thenReturnPost() {
        // given
        Post post = new Post(
                "1",
                "Title1",
                "Content1",
                "Author1",
                timestamp,
                10,
                1
        );
        when(postRepository.findById("1")).thenReturn(Optional.of(post));

        // when
        PostDTO postDTO = postServiceImpl.getPostById("1");

        // then
        verify(postRepository).findById("1");
        assertEquals(post.title(), postDTO.title());
        assertEquals(post.content(), postDTO.content());
        assertEquals(post.author(), postDTO.author());
        assertEquals(post.timestamp(), postDTO.timestamp());
        assertEquals(post.likes(), postDTO.likes());
        assertEquals(post.dislikes(), postDTO.dislikes());
    }

    @Test
    void getPostById_whenPostDoesNotExist_thenThrowResourceNotFoundException() {
        // given
        when(postRepository.findById("1")).thenReturn(Optional.empty());

        // when & then
        assertThrows(ResourceNotFoundException.class, () -> postServiceImpl.getPostById("1"));
    }
}