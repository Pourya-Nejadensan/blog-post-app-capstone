package org.blog.post.app.backend.post.model;

import lombok.With;

@With
public record Post(
        String id,
        String title,
        String content,
        String author,
        String date,
        String time,
        int likes,
        int dislikes
) {
}
