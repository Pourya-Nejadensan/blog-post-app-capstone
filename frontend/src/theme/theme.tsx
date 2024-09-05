import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';


export const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        error: {
            main: red.A400,
        },
    },
});
