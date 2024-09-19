import { Link } from "react-router-dom";

import { Container as MuiContainer, Typography } from "@mui/material";
import styled from "styled-components";

type HomePageProps = {
    isAuthenticated: boolean;
};

export default function HomePage({ isAuthenticated }: Readonly<HomePageProps>) {
    return (
        <StyledContainer>
            <MuiContainer
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
                <Typography variant="h1" component="h1" sx={{ fontSize: '2.8em', color: '#333', padding: '60px' }}>
                    Welcome to blog post app
                </Typography>
                {!isAuthenticated && (
                    <Typography variant="body1" component="p" sx={{ fontSize: '1.2em', color: '#666' }}>
                        Please <StyledLink to="/login">log in</StyledLink> to access all the features of our website.
                    </Typography>
                )}
            </MuiContainer>
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

const StyledLink = styled(Link)`
    color: #007bff;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;