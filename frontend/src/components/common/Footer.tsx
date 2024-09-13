import styled from 'styled-components';
import { Box, Typography } from '@mui/material';

export default function Footer() {
    return (
        <FooterContainer>
            <Typography variant="body2">
                &copy; 2024 My Project. All rights reserved.
            </Typography>
        </FooterContainer>
    );
}

const FooterContainer = styled(Box)`
    left: 0;
    right: 0;
    width: 100%;
    background-color: #1976d2;
    color: white;
    padding: 20px;
    position: fixed;
    bottom: 0;
    text-align: center;
`;
