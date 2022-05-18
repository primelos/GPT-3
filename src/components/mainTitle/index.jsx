import React from "react";
import styled from "styled-components";
import { useTypewriter } from "react-simple-typewriter";

const MainTitle = () => {
  const { text } = useTypewriter({
    words: ["Fun with AI"],
    count: 0,
    loop: 1,
    deleteSpeed: 0,
    typeSpeed: 120,
  });

  return (
    <TitleContainer>
      <ImageContainer>
        <Image src="/images/Artificial-Intelligence-12.webp" />
      </ImageContainer>
      <Title>{text}</Title>
    </TitleContainer>
  );
};

export default MainTitle;

const TitleContainer = styled.section`
  margin-bottom: 40px;
  padding-top: 70px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 450px;
  height: auto;
  border-radius: 50%;
  @media screen and (max-width: 1480px) {
    width: 300px;
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 900;
  text-align: center;
  padding-top: 20px;
  width: 100%;
  max-width: 100%;
`;
