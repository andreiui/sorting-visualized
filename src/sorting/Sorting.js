import React, { Component } from "react";
import "./Sorting.css";
import { shuffleArray, selectionSort, mergeSort } from "./Algorithms.js";

class Sorting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      done: true,
    };
  }
  buttons = [
    {
      class: "shuffle",
      title: "Shuffle",
      func: shuffleArray,
      speed: 35,
    },
    {
      class: "sorting",
      title: "Selection Sort",
      func: selectionSort,
      speed: 40,
    },
    {
      class: "sorting",
      title: "Merge Sort",
      func: mergeSort,
      speed: 40,
    },
  ];

  componentDidMount() {
    this.setState({ list: this.generateArray(0, 24) });
  }

  sortAnimation = (array, l, u, sort, ms) => {
    if (!this.state.done) {
      return array;
    }

    let animations = [];
    let unsorted = [...array];
    const bars = document.getElementsByClassName("sorting bar");
    this.setState({ done: false });

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

    setTimeout(() => {
      this.setState({ done: true });
    }, (animations.length + 1) * ms);

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
        <div className="sorting">
          {this.state.list.map((number) => (
            <Bar key={number} display={number} />
          ))}
        </div>
        <div className="sorting button">
          {this.buttons.map((button) => (
            <button
              key={button.title}
              onClick={() =>
                this.setState({
                  list: this.sortAnimation(
                    this.state.list,
                    0,
                    this.state.list.length,
                    button.func,
                    button.speed
                  ),
                })
              }
            >
              {button.title}
            </button>
          ))}
        </div>
      </React.Fragment>
    );
  }

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
    return <div className="sorting bar" style={this.state} />;
  }
}

export default Sorting;
