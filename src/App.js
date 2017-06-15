import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import Center from "react-center";
import { bondData, equityData } from "./Data.js";
const { List } = require("immutable");

const emptyData = List([
  { name: -20, numSims: 0 },
  { name: -15, numSims: 0 },
  { name: -10, numSims: 0 },
  { name: -5, numSims: 0 },
  { name: 0, numSims: 0 },
  { name: 5, numSims: 0 },
  { name: 10, numSims: 0 },
  { name: 15, numSims: 0 },
  { name: 20, numSims: 0 }
]);

var paddedStyle = {
  margin: "10px 10px 10px 0"
};

class SimpleBarChart extends Component {
  constructor(props) {
    super(props);
    this.state = { numberOfSimulations: 0 };
  }

  getData = () => {
    const fulldata = emptyData.concat(equityData);
    const finalData = fulldata
      .take(emptyData.count() + this.state.numberOfSimulations)
      .groupBy(x => x.name)
      .map(function(x) {
        return {
          name: x.first().name,
          numSims: x.reduce((acc, elem) => acc + elem.numSims, 0)
        };
      });
    return finalData.toArray();
  };

  addSim = evt => {
    this.setState((prevState, props) => ({
      numberOfSimulations: prevState.numberOfSimulations + 1
    }));
  };

  reset = evt => {
    this.setState((prevState, props) => ({
      numberOfSimulations: 0
    }));
  };

  render() {
    return (
      <div>
        <div style={paddedStyle}>
          Number of simulations: {this.state.numberOfSimulations}
        </div>
        <button style={paddedStyle} onClick={this.reset}>Reset</button>
        <Center>
          <BarChart
            width={700}
            height={400}
            onClick={this.addSim}
            data={this.getData()}
          >
            <XAxis dataKey="name" />
            <YAxis type="number" domain={[0, 10]} />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar isAnimationActive={false} dataKey="numSims" fill="#8884d8" />
          </BarChart>
        </Center>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>
            Welcome to SimDrop - click on the chart to run a simulation!
          </h2>
        </div>
        <SimpleBarChart />
      </div>
    );
  }
}

export default App;
