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
  width: 900px;
  max-width: 900px;
  margin: auto;
  height: 100%;
  background-color: #95bf46;
  padding: 0 20px;
  padding-bottom: 10px;
  overflow: hidden;
`;
