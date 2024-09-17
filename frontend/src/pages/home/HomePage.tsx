import {Link} from "react-router-dom";

export default function HomePage(){
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>Please <Link to="/login">log in</Link> to access all the features of our website.</p>
        </div>
    );
}
