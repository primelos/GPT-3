import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Responses from "../responses";
import { fetchData } from "../util/axiosCall";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  prompt: "",
};
const SearchBox = () => {
  const [text, setText] = useState(initialState);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [textToSend, setTextToSend] = useState(null);
  const [selectState, setSelectState] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text?.prompt.length === 0) {
      return;
    }
    setTextToSend(text.prompt);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setText({ ...text, [name]: value });
  };

  const handleSelectChange = (e) => {
    console.log("e.target.value", e.target.value);

    setSelectState(e.target.value);
  };

  const handleCopy = async (res) => {
    let copyLink = await navigator.clipboard.writeText(res.response);
    setData(
      data.map((item) =>
        item.id === res.id ? { ...item, copyBool: true } : item
      )
    );
  };

  useEffect(() => {
    if (!textToSend) return;
    const fetchApi = async () => {
      setLoading(true);
      setTimeout(async () => {
        const temp1 = await fetchData(textToSend, selectState);
        setData((prevData) => [
          {
            id: uuidv4(),
            prompt: text.prompt,
            response: temp1.text,
            copyBool: false,
          },
          ...prevData,
        ]);
        setText({ prompt: "" });
        setLoading(false);
      }, Math.round(Math.random() * 2000));
    };
    fetchApi();
  }, [textToSend]);

  console.log("data", data);

  return (
    <div>
      <FormData onSubmit={(e) => handleSubmit(e)}>
        <LabelInput>
          Enter prompt
          <TextInput
            name="prompt"
            type="text"
            placeholder="Search"
            value={text?.prompt}
            onChange={handleChange}
            rows="12"
          />
        </LabelInput>
        <ButtonMain>
          <SelectTitle>Change AI Engine</SelectTitle>
          <SelectButton
            value={selectState}
            onChange={(e) => handleSelectChange(e)}
          >
            <option value="">GPT-3 Models</option>
            <option value="text-davinci-002">davinci</option>
            <option value="text-curie-001">curie</option>
            <option value="text-babbage-001">babbage</option>
            <option value="text-ada-001">ada</option>
          </SelectButton>
          <InfoLink
            href="https://beta.openai.com/docs/engines/gpt-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click for Models Details...
          </InfoLink>
        </ButtonMain>
        <ButtonContainer>
          <Button
            type="submit"
            disabled={!text?.prompt}
            setActive={!text?.prompt}
          >
            Submit
          </Button>
        </ButtonContainer>
      </FormData>
      {data.length === 0 ? null : <ResponseHeader>Responses</ResponseHeader>}
      {data?.map((item) => (
        <Responses key={item.id} item={item} handleCopy={handleCopy} />
      ))}
    </div>
  );
};

export default SearchBox;

const FormData = styled.form`
  width: 100%;
  position: relative;
`;

const TextInput = styled.textarea`
  margin-top: 5px;
  border-radius: 4px;
  padding: 5px;

  &:focus {
    outline: none;
  }
`;

const LabelInput = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  font-weight: 600;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 5px;
`;

const Button = styled.button`
  color: whitesmoke;
  background-color: ${(props) => (props.setActive ? "gray" : "#2412f2")};
  padding: 15px 40px;
  font-size: 1rem;
  border-radius: 4px;
  border: none;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const ResponseHeader = styled.h2`
  width: 100%;
  margin: 0 auto;
  padding-bottom: 20px;
`;

const ButtonMain = styled.div`
  position: absolute;
  top: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SelectTitle = styled.h4`
  font-size: 1rem;
  padding-right: 10px;
`;

const SelectButton = styled.select`
  padding: 15px 5px;
  border-radius: 4px;
  font-size: 0.9rem;
  border: none;
  margin-right: 5px;
`;

const InfoLink = styled.a`
  text-decoration: none;
  font-size: 1rem;
  color: black;
  margin-left: 10px;
  /* position: absolute;
  top: 250px; */
  &:hover {
    opacity: 0.5;
  }
`;
