import React, { Component } from "react";
import "./Sorting.css";
import {
  shuffleArray,
  selectionSort,
  mergeSort,
  quickSort,
} from "./Algorithms.js";

class Main extends Component {
  render() {
    return (
      <React.Fragment>
        <Title />
        <Sorting />
      </React.Fragment>
    );
  }
}

class Sorting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      done: true,
      method: "",
      sorted: true,
    };
  }
  buttons = [
    {
      class: "shuffle",
      title: "Shuffle",
      func: shuffleArray,
      speed: 35,
      active: "Shuffling...",
    },
    {
      class: "sorting",
      title: "Selection Sort",
      func: selectionSort,
      speed: 40,
      active: "Sorting...",
    },
    {
      class: "sorting",
      title: "Merge Sort",
      func: mergeSort,
      speed: 40,
      active: "Sorting...",
    },
    {
      class: "sorting",
      title: "Quick Sort",
      func: quickSort,
      speed: 40,
      active: "Sorting...",
    },
  ];

  componentDidMount() {
    this.setState({ list: this.generateArray(0, 52) });
  }

  sortAnimation = (array, l, u, sort, method, ms) => {
    if (!this.state.done) {
      return array;
    }

    let animations = [];
    let unsorted = [...array];
    const bars = document.getElementsByClassName("sorting bar");
    this.setState({ done: false, method: method, sorted: false });

    animations = sort(array, l, u);
    console.log(animations.filter((a) => a.comp !== undefined));

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
          var t;
          bars[comp[0]].style.backgroundColor = "lightblue";
          bars[comp[1]].style.backgroundColor = "lightblue";
          if (swap !== undefined) {
            bars[swap[0]].style.backgroundColor = "lightblue";
            if (arr === undefined) {
              bars[swap[1]].style.backgroundColor = "lightblue";
            } else {
              for (
                t = 0;
                unsorted[t] !== arr[swap[1]] && t < unsorted.length;
                t++
              );
              bars[t].style.backgroundColor = "lightblue";
            }
          }
        } else {
          bars[swap[0]].style.backgroundColor = "lightblue";
          if (arr === undefined) {
            bars[swap[1]].style.backgroundColor = "lightblue";
          } else {
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
      this.setState({ done: true, method: "" });
      if (method === "Sorting...") {
        this.setState({ sorted: true });
      }
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
      <div className="container">
        <div className="sorting">
          {this.state.list.map((number) => (
            <Bar key={number} display={number} />
          ))}
        </div>
        <div className="buttons">
          {this.getShuffle()}
          {this.getButtons()}
        </div>
      </div>
    );
  }

  generateArray = (start, end) => {
    let array = [];
    for (let i = 0; i < end; i++) {
      array.push(i + start);
    }
    return array;
  };

  getShuffle = () => {
    if (this.state.sorted) {
      return (
        <button
          className="button"
          key="Shuffle"
          onClick={() =>
            this.setState({
              list: this.sortAnimation(
                this.state.list,
                0,
                this.state.list.length,
                shuffleArray,
                "Shuffling...",
                35
              ),
            })
          }
        >
          Shuffle
        </button>
      );
    }
  };

  getButtons = () => {
    if (this.state.done && !this.state.sorted) {
      return this.buttons
        .filter((button) => button.class === "sorting")
        .map((button) => (
          <button
            className="button"
            key={button.title}
            onClick={() =>
              this.setState({
                list: this.sortAnimation(
                  this.state.list,
                  0,
                  this.state.list.length,
                  button.func,
                  button.active,
                  button.speed
                ),
              })
            }
          >
            {button.title}
          </button>
        ));
    } else {
      return (
        <React.Fragment>
          <h2 className="text">{this.state.method}</h2>
        </React.Fragment>
      );
    }
  };
}

const Title = () => {
  return (
    <div className="title">
      <div className="title logo">
        <h1 className="text">
          <i>52</i>&nbsp;<small>lines</small>&nbsp;
        </h1>
        <h2 className="text">
          <i>/</i>&nbsp;
        </h2>
        <h3 className="text">
          <i>12</i>&nbsp;<small>algorithms</small>
        </h3>
      </div>
      <div className="text">
        <small>made by andreipascu.</small>
      </div>
    </div>
  );
};

class Bar extends Component {
  state = {
    backgroundColor: "lightblue",
    height: this.props.display * 10 + 10 + "px",
  };

  render() {
    return <div className="sorting bar" style={this.state} />;
  }
}

export default Main;
