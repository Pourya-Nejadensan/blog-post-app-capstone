import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from '../post/PostList';
import Header from './header/Header.tsx';
import Footer from './Footer';
import About from './About';
import Contact from './Contact';
import CreatePostPage from "../../pages/post/CreatePostPage";
import DetailsPostPage from "../../pages/post/DetailsPostPage";
import EditPostPage from "../../pages/post/EditPostPage.tsx";

export default function AppRoutes() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<PostList />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/create-post" element={<CreatePostPage />} />
                <Route path="/detail-post/:id" element={<DetailsPostPage />} />
                <Route path="/edit-post/:id" element={<EditPostPage />} />
            </Routes>
            <Footer />
        </Router>
    );
}
