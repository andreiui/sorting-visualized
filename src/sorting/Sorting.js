import React, { Component } from "react";
import "./Sorting.css";

class Quicksort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    this.generateArray(1, 100);
  }

  render() {
    return (
      <React.Fragment>
        <div className="quicksort">
          {this.state.list.map((number) => (
            <Bar key={number} display={number} />
          ))}
        </div>
        <div className="quicksort button">
          <button
            className="shuffle"
            onClick={() => this.shuffleArray(this.state.list)}
          >
            Shuffle
          </button>
        </div>
      </React.Fragment>
    );
  }

  shuffleArray = (array) => {
    let j, x;
    for (let i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = array[i];
      array[i] = array[j];
      array[j] = x;
    }
    this.setState({ list: array });
  };

  generateArray = (start, end) => {
    let array = [];
    for (let i = 0; i <= end; i++) {
      array.push(i + start);
    }
    this.shuffleArray(array);
  };
}

class Bar extends Component {
  render() {
    return (
      <div
        className="quicksort bar"
        style={{ height: this.props.display * 5 + "px" }}
      />
    );
  }
}

export default Quicksort;
