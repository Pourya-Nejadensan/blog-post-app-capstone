package org.blog.post.app.backend;

import org.blog.post.app.backend.post.controller.PostController;
import org.blog.post.app.backend.post.service.impl.PostServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class BackendApplicationTests {

    @Autowired
    private ApplicationContext applicationContext;

    @Test
    void contextLoads() {
        assertNotNull(applicationContext.getBean(PostController.class), "PostController bean should be loaded");
        assertNotNull(applicationContext.getBean(PostServiceImpl.class), "PostServiceImpl bean should be loaded");
    }
}
