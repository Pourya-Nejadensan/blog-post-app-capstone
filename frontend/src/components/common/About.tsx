import styled from "styled-components";

export default function About() {
    return (
        <StyledContainer>
            <StyledHeading>About Us</StyledHeading>
            <StyledParagraph>Welcome to our blog! We share the latest news and articles on various topics.</StyledParagraph>
        </StyledContainer>
    );
}

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
`;

const StyledHeading = styled.h2`
    font-size: 2.8em;
    color: #1a237e;
    margin-bottom: 30px;
`;

const StyledParagraph = styled.p`
    font-size: 1.4em;
    color: #424242;
    text-align: center;
    max-width: 750px;
`;