import React from "react";
import styled from "styled-components";
import { useTypewriter } from "react-simple-typewriter";

const MainTitle = () => {
  const { text } = useTypewriter({
    words: ["Fun with AI"],
    count: 0,
    loop: 1,
    deleteSpeed: 0,

    /* Config */
  });

  return (
    <TitleContainer>
      <Title>{text}</Title>
    </TitleContainer>
  );
};

export default MainTitle;

const TitleContainer = styled.section`
  margin-bottom: 40px;
  padding-top: 70px;
`;

const Title = styled.h1`
  font-size: 3rem;
`;
