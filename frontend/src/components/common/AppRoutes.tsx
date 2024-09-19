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
import HomePage from "../../pages/home/HomePage.tsx";
import LoginPage from "../../pages/login/LoginPage.tsx";
import { useAuth } from "../../hooks/useAuth.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";

export default function AppRoutes() {

    const { posts, loading, error, addNewPost, updatePost, deletePost} = useFetchPosts();
    const { isAuthenticated, handleLogin, handleLogout, checkAuth } = useAuth();

    return (
        <Router>
            <Header
                isAuthenticated={isAuthenticated}
                handleLogout={handleLogout}
                checkAuth={checkAuth}
            />
            <Routes>
                <Route path="/" element={<HomePage
                    isAuthenticated={isAuthenticated}
                />} />
                <Route path="/login" element={<LoginPage
                    isAuthenticated={isAuthenticated}
                    handleLogin={handleLogin}
                    handleLogout={handleLogout}
                    checkAuth={checkAuth}
                />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                <Route element={<ProtectedRoute isAuthenticated={isAuthenticated}/>}>
                    <Route path="/posts" element={<PostList
                        posts={posts}
                        loading={loading}
                        error={error}
                        deletePost={deletePost}
                    />} />
                    <Route path="/create-post" element={<CreatePostPage
                        addNewPost={addNewPost}
                    />} />
                    <Route path="/detail-post/:postId" element={<DetailsPostPage
                        deletePost={deletePost}
                    />} />
                    <Route path="/edit-post/:postId" element={<EditPostPage
                        updatePost={updatePost}
                    />} />
                </Route>
            </Routes>
            <Footer />
        </Router>
    );
}
