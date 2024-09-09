import styled from 'styled-components';
import { AppBar as MuiAppBar, Toolbar as MuiToolbar, Button, Box as MuiBox } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <AppBar>
            <Toolbar>
                <BoxBar>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/about">About</Button>
                    <Button color="inherit" component={Link} to="/contact">Contact</Button>
                    <Button color="inherit" component={Link} to="/create-post">Create Post</Button>
                </BoxBar>
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
