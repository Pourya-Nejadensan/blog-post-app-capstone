import styled from "styled-components";

export default function Contact() {
    return (
        <StyledContainer>
            <StyledHeading>Contact Us</StyledHeading>
            <StyledParagraph>If you have any questions, feel free to reach out to us at pourya.nejadensan@gmail.com.</StyledParagraph>
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