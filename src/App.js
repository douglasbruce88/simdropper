import React, { Component } from "react";
import logo from "./images/red-pin.jpg";
import "./App.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  Legend
} from "recharts";
import Center from "react-center";
import { Data } from "./Data.js";

var paddedStyle = {
  margin: "10px 10px 10px 0"
};

const colours = [
  "#FF0000",
  "#FF0000",
  "#FF0000",
  "#FFD300",
  "#FFD300",
  "#FFD300",
  "#00FF00",
  "#00FF00",
  "#00FF00",
  "#00FF00",
  "#00FF00",
  "#00FF00",
  "#00FF00",
  "#00FF00",
  "#00FF00",
  "#00FF00",
  "#00FF00",
  "#00FF00"
];

class SimpleBarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfSimulations: 0,
      maxSims: Data.get("equity").count()
    };
  }

  getData = setToUse => {
    const datasetToUse = Data.get(setToUse);
    const emptyData = Data.get("empty");
    const newestSimBucket =
      this.state.numberOfSimulations >= this.state.maxSims
        ? 0
        : datasetToUse.skip(this.state.numberOfSimulations - 1).first();
    const first = this.state.numberOfSimulations === 0;
    const finalData = emptyData
      .concat(datasetToUse)
      .take(
        first
          ? emptyData.count()
          : emptyData.count() + this.state.numberOfSimulations - 1
      )
      .groupBy(x => x)
      .map(function(x) {
        return {
          name: x.first(),
          numSims: x.count() - 1,
          newestSim: first ? 0 : x.first() === newestSimBucket
        };
      });
    return finalData.toArray();
  };

  addSim = evt => {
    this.setState((prevState, props) => ({
      numberOfSimulations: Math.min(
        prevState.maxSims,
        prevState.numberOfSimulations + 1
      )
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
        <br />
        <span style={{ display: "inline-block", marginRight: "300px" }}>
          Global Equities
        </span>
        <span style={{ display: "inline-block", marginLeft: "300px" }}>
          SJP Managed Portfolio
        </span>
        <Center>
          <span>
            Number of<br />occurences
          </span>
          <BarChart
            width={700}
            height={400}
            onClick={this.addSim}
            data={this.getData("equity")}
          >
            <XAxis dataKey="name" />
            <YAxis type="number" domain={[0, 20]} />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar isAnimationActive={false} stackId="a" dataKey="numSims">
              {this.getData("sjp").map((entry, index) =>
                <Cell
                  cursor="pointer"
                  fill={colours[index]}
                  key={`cell-${index}`}
                />
              )}
            </Bar>
            <Bar
              isAnimationActive={false}
              stackId="a"
              dataKey="newestSim"
              fill="#8884d8"
            />
          </BarChart>
          <BarChart
            width={700}
            height={400}
            onClick={this.addSim}
            data={this.getData("sjp")}
          >
            <XAxis dataKey="name" />
            <YAxis type="number" domain={[0, 20]} />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar isAnimationActive={false} stackId="a" dataKey="numSims">
              {this.getData("sjp").map((entry, index) =>
                <Cell
                  cursor="pointer"
                  fill={colours[index]}
                  key={`cell-${index}`}
                />
              )}
            </Bar>
            <Bar
              isAnimationActive={false}
              stackId="a"
              dataKey="newestSim"
              fill="#8884d8"
            />
          </BarChart>
        </Center>
        <span style={{ display: "inline-block", marginRight: "300px" }}>
          Fund Value
        </span>
        <span style={{ display: "inline-block", marginLeft: "300px" }}>
          Fund Value
        </span>
        <div style={paddedStyle}>
          Number of simulations: {this.state.numberOfSimulations}
        </div>
        <button style={paddedStyle} onClick={this.reset}>
          Reset
        </button>
        <br />
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
          <h2>Redington Investment Simulator</h2>
        </div>
        <SimpleBarChart />
      </div>
    );
  }
}

export default App;
