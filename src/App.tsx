import { Component } from 'react';
import './App.scss';
import { Form } from './components/Form';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component<{}, {}> {
  render() {
    return (
      <div className="App">
        <Form />
      </div>
    );
  }
}

export default App;
