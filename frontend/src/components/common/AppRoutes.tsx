import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from '../../pages/post/read/PostList.tsx';
import Header from './Header.tsx';
import Footer from './Footer';
import About from './About';
import Contact from './Contact';
import CreatePostPage from "../../pages/post/create/CreatePostPage.tsx";
import DetailsPostPage from "../../pages/post/detail/DetailsPostPage.tsx";
import EditPostPage from "../../pages/post/edit/EditPostPage.tsx";
import { useFetchPosts } from "../../hooks/useFetchPosts.tsx";

export default function AppRoutes() {

    const { posts, loading, error, addNewPost, updatePost, deletePost} = useFetchPosts();

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<PostList
                    posts={posts}
                    loading={loading}
                    error={error}
                    deletePost={deletePost}
                />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/create-post" element={<CreatePostPage
                    addNewPost={addNewPost}
                />} />
                <Route path="/detail-post/:postId" element={<DetailsPostPage
                    deletePost={deletePost}
                />} />
                <Route path="/edit-post/:postId" element={<EditPostPage
                    updatePost={updatePost}
                />} />
            </Routes>
            <Footer />
        </Router>
    );
}
