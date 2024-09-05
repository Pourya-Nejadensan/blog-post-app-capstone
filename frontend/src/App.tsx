import './App.css';
import AppRoutes from './components/common/Routes';
import { Container, Box, Stack } from '@mui/material';

function App() {
    return (
        <Container>
            <Box display="flex" justifyContent="center">
                <Stack spacing={2} sx={{ width: '100%', maxWidth: { xs: '100%', sm: '90%', md: '80%' } }}>
                    <AppRoutes />
                </Stack>
            </Box>
        </Container>
    );
}

export default App;