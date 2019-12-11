import React from 'react';
import './App.css';
import * as Calculate from './modules/calculate'

class Screen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: "", answer: ""};
        this.handletextChange = this.handletextChange.bind(this);
    }
    render() {
        return (
            <div className="screen-container">
                <input 
                    id="screen" 
                    onChange={this.handletextChange}
                    value={this.state.text}
                />
                <p>
                    {this.state.answer}
                </p>
                <p>
                    driver result: {Calculate.driver()}
                </p>
            </div>
        );
    }

    handletextChange(e){
        this.setState({ text: e.target.value });
        this.setState({ answer: Calculate.evaluate(e.target.value) });
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