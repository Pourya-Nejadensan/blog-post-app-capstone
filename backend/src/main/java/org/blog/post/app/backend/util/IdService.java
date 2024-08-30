package org.blog.post.app.backend.util;

import static java.util.UUID.randomUUID;

public class IdService {

    private IdService() {
        throw new IllegalStateException("Utility class");
    }

    public static String generateId() {
        return randomUUID().toString();
    }
}
