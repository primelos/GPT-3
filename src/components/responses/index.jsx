import React from "react";
import styled from "styled-components";
import { HiClipboardCopy, HiOutlineClipboardCopy } from "react-icons/hi";

const Responses = ({ item, handleCopy }) => {
  console.log("item", item);
  const { prompt, response, id, copyBool } = item;
  return (
    <ResponseContainer>
      <ResponseWrapper>
        <Prompt>
          <PromptTitle>Prompt:</PromptTitle>
          <PromptText>{prompt}</PromptText>
        </Prompt>
        <Response>
          <ResponseTitle>Response:</ResponseTitle>
          <ResponseText>{response}</ResponseText>
        </Response>
      </ResponseWrapper>
      <IconWrapper>
        {copyBool ? (
          <Clipboard onClick={() => handleCopy(item)} />
        ) : (
          <ClipboardDone onClick={() => handleCopy(item)} />
        )}
      </IconWrapper>
    </ResponseContainer>
  );
};

export default Responses;

const ResponseContainer = styled.section`
  width: 100%;
  display: flex;
  background-color: #e3dfdf;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  margin-bottom: 10px;
`;

const Prompt = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  /* background-color: #e3dfdf; */
  /* border-top-left-radius: 4px; */
  /* border-top-right-radius: 4px; */
`;

const PromptTitle = styled.h4`
  padding: 15px 0 8px 29px;
  font-size: 0.9rem;
`;

const PromptText = styled.p`
  padding: 15px 10px 0 45px;
  font-size: 0.9rem;
  text-transform: lowercase;

  &::first-letter {
    text-transform: uppercase;
  }
`;

const Response = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  /* background-color: #e3dfdf; */
  /* border-bottom-left-radius: 4px; */
  /* border-bottom-right-radius: 4px; */
  margin-bottom: 10px;
`;

const ResponseTitle = styled.h4`
  padding: 10px 0 8px 30px;
  font-size: 0.9rem;
`;

const ResponseText = styled.p`
  padding: 10px 10px 15px 30px;
  font-size: 0.9rem;
`;

const Clipboard = styled(HiClipboardCopy)`
  width: 30px;
  height: 30px;
  padding-right: 10px;
`;

const ClipboardDone = styled(HiOutlineClipboardCopy)`
  width: 30px;
  height: 30px;
  padding-right: 15px;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #e3dfdf; */
  /* border-top-right-radius: 4px;
  border-bottom-right-radius: 4px; */
  /* height: 116px; */
`;

const ResponseWrapper = styled.div`
  height: 100%;
  flex: 1;
`;
