import React, { Component } from "react";
import "./Quicksort.css";

class Quicksort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
  }
  render() {
    return (
      <React.Fragment>
        <div className="quicksort">
          {this.state.list.map((number) => (
            <Card key={number} display={number} />
          ))}
        </div>
        <div className="quicksort">
          <button
            className="shuffle"
            onClick={() => this.shuffle(this.state.list)}
          >
            Shuffle
          </button>
          <button
            className="sort"
            onClick={() => this.shuffle(this.state.list)}
          >
            Sort
          </button>
        </div>
        <div className="quicksort">
          <input></input>
        </div>
      </React.Fragment>
    );
  }
  shuffle = (a) => {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    this.setState(a);
  };
  setArrayInput = (a) => {
    this.setState(a);
  };
}

class Card extends Component {
  render() {
    return (
      <div className="quicksort card" style={{ height: this.getHeight() }} />
    );
  }
  getHeight() {
    return this.props.display * 16 + "px";
  }
}

export default Quicksort;
