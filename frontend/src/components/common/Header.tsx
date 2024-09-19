import styled from 'styled-components';
import { AppBar as MuiAppBar, Toolbar as MuiToolbar, Button, Box as MuiBox } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect } from "react";

type HeaderProps = {
    isAuthenticated: boolean;
    checkAuth: () => void;
    handleLogout: () => void;
}

export default function Header({ isAuthenticated, checkAuth, handleLogout }: Readonly<HeaderProps>) {

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return (
        <AppBar>
            <Toolbar>
                <BoxBar>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/about">About</Button>
                    <Button color="inherit" component={Link} to="/contact">Contact</Button>
                    {isAuthenticated && (
                        <>
                            <Button color="inherit" component={Link} to="/posts">Posts</Button>
                            <Button color="inherit" component={Link} to="/create-post">Create Post</Button>
                        </>
                    )}
                    </BoxBar>
                <RightBox>
                    {isAuthenticated ? (
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    ) : (
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                    )}
                </RightBox>
            </Toolbar>
        </AppBar>
    );
}

const AppBar = styled(MuiAppBar)`
    position: fixed;
    width: 100%;
    top: 0;
`;

const Toolbar = styled(MuiToolbar)`
    display: flex;
    justify-content: space-between;
`;

const BoxBar = styled(MuiBox)`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const RightBox = styled(MuiBox)`
    display: flex;
    justify-content: flex-end;
    background-color: #d27619;
    border-radius: 10px;
    &:hover {
        background-color: darkorange;
    }
`;
