import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from '../post/PostList';
import Header from './Header';
import Footer from './Footer';
import About from './About';
import Contact from './Contact';
import CreatePostPage from "../../pages/CreatePostPage.tsx";

export default function AppRoutes() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<PostList />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/create-post" element={<CreatePostPage />} />
            </Routes>
            <Footer />
        </Router>
    );
}