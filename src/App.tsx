import React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import './App.css';
import { Container } from './Components/Container';


function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <div>
          <Container />
        </div>
      </DndProvider>
    </div>
  );
}

export default App;
