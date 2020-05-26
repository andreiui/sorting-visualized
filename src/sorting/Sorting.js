import React, { Component } from "react";
import "./Sorting.css";
import { selectionSort, mergeSort } from "./Algorithms.js";

class Quicksort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    this.setState({ list: this.generateArray(0, 24) });
  }

  sortAnimation = (array, l, u, sort, ms) => {
    let animations = [];
    let unsorted = [...array];
    const bars = document.getElementsByClassName("quicksort bar");

    animations = sort(array, l, u);

    for (var i = 0; i < animations.length; i++) {
      const { comp, swap, arr } = animations[i];
      setTimeout(() => {
        if (comp !== undefined && swap === undefined) {
          bars[comp[0]].style.backgroundColor = "slateblue";
          bars[comp[1]].style.backgroundColor = "slateblue";
        } else if (swap !== undefined) {
          if (arr === undefined) {
            bars[swap[0]].style.backgroundColor = "red";
            bars[swap[1]].style.backgroundColor = "red";
            this.setState({ list: this.swap(unsorted, swap[0], swap[1]) });
          } else {
            bars[swap[0]].style.backgroundColor = "lightblue";
            var t;
            for (
              t = 0;
              unsorted[t] !== arr[swap[1]] && t < unsorted.length;
              t++
            );
            bars[t].style.backgroundColor = "red";
            this.setState({
              list: this.swap(unsorted, swap[0], t, arr),
            });
          }
        }
      }, i * ms);
      setTimeout(() => {
        if (comp !== undefined) {
          bars[comp[0]].style.backgroundColor = "lightblue";
          bars[comp[1]].style.backgroundColor = "lightblue";
        } else {
          bars[swap[0]].style.backgroundColor = "lightblue";
          if (arr === undefined) {
            bars[swap[1]].style.backgroundColor = "lightblue";
          } else {
            var t;
            for (
              t = 0;
              unsorted[t] !== arr[swap[1]] && t < unsorted.length;
              t++
            );
            bars[t].style.backgroundColor = "lightblue";
          }
        }
      }, (i + 1) * ms);
    }

    setTimeout(() => {
      for (var i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = "lightblue";
      }
    }, animations.length * ms);

    return unsorted;
  };

  swap(array, i, j, arr) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    return array;
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
            onClick={() =>
              this.setState({
                list: this.sortAnimation(
                  this.state.list,
                  0,
                  this.state.list.length,
                  this.shuffleArray,
                  30
                ),
              })
            }
          >
            Shuffle
          </button>
          <button
            className="sort"
            onClick={() =>
              this.setState({
                list: this.sortAnimation(
                  this.state.list,
                  0,
                  this.state.list.length,
                  selectionSort,
                  50
                ),
              })
            }
          >
            Selection Sort
          </button>
          <button
            className="sort"
            onClick={() =>
              this.setState({
                list: this.sortAnimation(
                  this.state.list,
                  0,
                  this.state.list.length,
                  mergeSort,
                  50
                ),
              })
            }
          >
            Merge Sort
          </button>
        </div>
      </React.Fragment>
    );
  }

  shuffleArray = (array, l, u) => {
    var animations = [];
    let j;

    for (let i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      const a = {};
      a.comp = [i, j];
      a.swap = [i, j];
      array = this.swap(array, i, j);
      animations.push(a);
    }

    return animations;
  };

  generateArray = (start, end) => {
    let array = [];
    for (let i = 0; i < end; i++) {
      array.push(i + start);
    }
    return array;
  };
}

class Bar extends Component {
  state = {
    backgroundColor: "lightblue",
    height: this.props.display * 8 + 7 + "px",
  };

  render() {
    return <div className="quicksort bar" style={this.state} />;
  }
}

export default Quicksort;
