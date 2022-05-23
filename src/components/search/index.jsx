import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Responses from "../responses";
import { fetchData } from "../util/axiosCall";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  prompt: "",
};

const SearchBox = () => {
  const useLocalStorage = () => {
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const itemToSave = window.localStorage.getItem("responseAI");
        return itemToSave ? JSON.parse(itemToSave) : [];
      } catch (error) {
        console.log("error", error);
      }
    });

    const setValue = (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem("responseAI", JSON.stringify(valueToStore));
      } catch (error) {
        console.log("error", error);
      }
    };
    return [storedValue, setValue];
  };
  const [text, setText] = useState(initialState);
  const [data, setData] = useLocalStorage([]);
  const [loading, setLoading] = useState(true);
  const [textToSend, setTextToSend] = useState(null);
  const [selectState, setSelectState] = useState("");

  const inputRef = useRef(null);

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
  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (!textToSend) return;
    const fetchApi = async () => {
      setLoading(true);
      if (!selectState) {
        const temp1 = await fetchData(textToSend);
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
      } else {
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
      }
    };
    fetchApi();
  }, [textToSend]);
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
            rows="10"
            ref={inputRef}
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
  flex: 1;
`;

const TextInput = styled.textarea`
  margin-top: 5px;
  border-radius: 4px;
  padding: 5px;
  font-family: "Nunito", sans-serif;
  &:focus {
    outline: none;
  }
`;

const LabelInput = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  font-weight: 800;
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
  margin-top: 30px;
  @media screen and (max-width: 1480px) {
    margin-top: 30px;
  }
`;

const ButtonMain = styled.div`
  position: absolute;
  top: 224px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1480px) {
    top: 224px;
  }
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
  font-weight: 600;
  &:hover {
    opacity: 0.5;
  }
`;
