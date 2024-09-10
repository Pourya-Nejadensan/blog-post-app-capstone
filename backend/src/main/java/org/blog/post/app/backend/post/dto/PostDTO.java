package org.blog.post.app.backend.post.dto;

import java.time.Instant;

public record PostDTO(
        String title,
        String content,
        String author,
        Instant timestamp,
        int likes,
        int dislikes
) {
}
