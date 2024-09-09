import { Box, Container } from '@mui/material';
import styled from 'styled-components';
import React, { ReactNode } from 'react';



const Main = styled(Box)`
  margin-top: 64px; /* Adjust based on the height of the header */
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
`;


type LayoutProps = {
    children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Container>
            <Main>{children}</Main>
        </Container>
    );
};

export default Layout;