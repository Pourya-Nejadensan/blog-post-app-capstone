export default function LoginPage(){
    function handleLogin() {
        const host: string = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin;

        window.open(host + "/oauth2/authorization/github", "_self");
            }
    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}
