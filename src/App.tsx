import "./App.css";
import Button from "./components/Button";
import { Item } from "react-stately";
import List from "./components/dragDrop/List";

function App() {
  return (
    <List
      aria-label="Example List"
      selectionMode="multiple"
      // selectionBehavior="replace"
    >
      <Item textValue="Charizard">
        Charizard
        <Button onPress={() => alert(`Info for Charizard...`)}>Info</Button>
      </Item>
      <Item textValue="Blastoise">
        Blastoise
        <Button onPress={() => alert(`Info for Blastoise...`)}>Info</Button>
      </Item>
      <Item textValue="Venusaur">
        Venusaur
        <Button onPress={() => alert(`Info for Venusaur...`)}>Info</Button>
      </Item>
      <Item textValue="Pikachu">
        Pikachu
        <Button onPress={() => alert(`Info for Pikachu...`)}>Info</Button>
      </Item>
    </List>
  );
}

export default App;
