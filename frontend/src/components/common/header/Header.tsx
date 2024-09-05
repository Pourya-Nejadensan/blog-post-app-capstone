import './Header.css';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <AppBar className="app-bar">
            <Toolbar className="toolbar">
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    My Blog App Capstone
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/about">About</Button>
                    <Button color="inherit" component={Link} to="/contact">Contact</Button>
                    <Button color="inherit" component={Link} to="/create-post">Create Post</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
