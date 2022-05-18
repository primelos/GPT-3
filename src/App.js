import styled from "styled-components";
import MainTitle from "./components/mainTitle";
import SearchBox from "./components/search";

function App() {
  return (
    <AppContainer className="App">
      <MainTitle />
      <SearchBox />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 900px;
  max-width: 900px;
  margin: auto;
  min-height: 100vh;
  background-color: #51bee8;
  padding: 0 20px;
  padding-bottom: 10px;
  font-family: "Nunito", sans-serif;
`;
