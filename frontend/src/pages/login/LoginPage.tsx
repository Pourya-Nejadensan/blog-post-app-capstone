import { useEffect } from "react";

import { Container, Typography, Button, Box } from "@mui/material";
import styled from "styled-components";

type LoginPageProps = {
    isAuthenticated: boolean;
    handleLogin: () => void;
    handleLogout: () => void;
    checkAuth: () => void;
};

export default function LoginPage({ isAuthenticated, handleLogin, handleLogout, checkAuth }: Readonly<LoginPageProps>) {
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return (
        <StyledContainer>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '80vh',
                    padding: '20px',
                    width: '100%',
                }}
            >
                <Typography variant="h1" component="h1" sx={{ fontSize: '2.5em', color: '#333' }}>
                    Login Page
                </Typography>
                {isAuthenticated ? (
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body1" component="p" sx={{ fontSize: '1.2em', color: '#666' }}>
                            You are already logged in.
                        </Typography>
                        <Button variant="contained" color="primary" onClick={handleLogout} sx={{ marginTop: '20px' }}>
                            Logout
                        </Button>
                    </Box>
                ) : (
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body1" component="p" sx={{ fontSize: '1.2em', color: '#666', marginBottom: '20px' }}>
                            Choose your method to login:
                        </Typography>
                        <GitHubButton onClick={handleLogin}>
                            <GitHubIcon src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" />
                            Login with GitHub
                        </GitHubButton>
                    </Box>
                )}
            </Container>
        </StyledContainer>
    );
}

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50vh;
    width: 100%;
`;

const GitHubButton = styled(Button)`
    display: flex;
    align-items: center;
    background-color: #333;
    color: #fff;
    margin-top: 20px;

    &:hover {
        background-color: #444;
    }
`;

const GitHubIcon = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 10px;
`;
