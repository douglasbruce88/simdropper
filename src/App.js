import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const { List } = require("immutable");

const emptyData = List([
  { name: "-10%", numSims: 0 },
  { name: "-5%", numSims: 0 },
  { name: "0%", numSims: 0 },
  { name: "5%", numSims: 0 },
  { name: "10%", numSims: 0 },
  { name: "15%", numSims: 0 },
  { name: "20%", numSims: 0 }
]);

const data = List([
  { name: "-10%", numSims: 1 },
  { name: "-5%", numSims: 1 },
  { name: "0%", numSims: 1 },
  { name: "5%", numSims: 1 },
  { name: "5%", numSims: 1 },
  { name: "0%", numSims: 1 },
  { name: "15%", numSims: 1 },
  { name: "-5%", numSims: 1 },
  { name: "20%", numSims: 1 },
  { name: "0%", numSims: 1 },
  { name: "-5%", numSims: 1 },
  { name: "0%", numSims: 1 },
  { name: "5%", numSims: 1 },
  { name: "0%", numSims: 1 },
  { name: "15%", numSims: 1 },
  { name: "-10%", numSims: 1 },
  { name: "-5%", numSims: 1 },
  { name: "5%", numSims: 1 },
  { name: "20%", numSims: 1 },
  { name: "0%", numSims: 1 }
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
    const fulldata = emptyData.concat(data);
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
        <BarChart
          onClick={this.addSim}
          width={600}
          height={300}
          data={this.getData()}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis type="number" domain={[0, 10]} interval="1" />
          <CartesianGrid strokeDasharray="3 3" />
          <Legend />
          <Bar isAnimationActive="false" dataKey="numSims" fill="#8884d8" />
        </BarChart>
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
