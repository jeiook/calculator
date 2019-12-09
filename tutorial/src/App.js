//refer to: https://reactjs.org/

import React from 'react';
import './App.css';
import * as Text from './modules/text'

class Screen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: "", answer: ""};
        this.handletextChange = this.handletextChange.bind(this);
    }
    render() {
        return (
            <div class="screen-container">
                <input 
                    id="screen" 
                    onChange={this.handletextChange}
                    value={this.state.text}
                />
                <p>
                    {this.state.answer}
                </p>
            </div>
        );
    }

    handletextChange(e){
        this.setState({ text: e.target.value });
        this.setState({ answer: this.calculate(e.target.value) });
    }

    calculate(e) {
        if (e === "") {
            return "";
        }
        if (!Text.isvalid(e)) {
            return "invalid input";
        }
        return e;
    }
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Screen/>
            </header>
        </div>
    );
}

export default App;