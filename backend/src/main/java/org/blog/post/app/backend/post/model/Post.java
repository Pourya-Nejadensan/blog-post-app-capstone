package org.blog.post.app.backend.post.model;

import lombok.With;

import java.time.Instant;

@With
public record Post(
        String id,
        String title,
        String content,
        String author,
        Instant timestamp,
        int likes,
        int dislikes
) {
}
