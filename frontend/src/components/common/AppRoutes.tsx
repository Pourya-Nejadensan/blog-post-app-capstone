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
import { Post } from "../../models/Post.tsx";
import { PostDTO } from "../../dto/PostDTO.tsx";
import { convertPostDTOToPost } from "../../util/maper/convertPostDTOToPost.tsx";

export default function AppRoutes() {

    const { posts, setPosts, loading, error} = useFetchPosts();

    const addNewPost = (newPost: Post) => {
        setPosts((prevPosts) => [...prevPosts, newPost]);
    }

    const updatePost = (postId: string, updatedPostDTO: PostDTO) => {
        const updatedPost: Post = convertPostDTOToPost(postId, updatedPostDTO);
        setPosts((prevPosts) =>
            prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
        );
    };

    const deletePost = (postId: string) => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    }

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<PostList
                    posts={posts}
                    setPosts={setPosts}
                    loading={loading}
                    error={error}
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
