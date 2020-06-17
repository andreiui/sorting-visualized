import React, { Component } from "react";
import "./Sorting.css";
import {
  shuffleArray,
  selectionSort,
  bubbleSort,
  cocktailSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort,
  timSort,
  radixSort_base2,
  radixSort_base16,
} from "./Algorithms.js";

function generateArray(start, end) {
  let array = [];
  for (let i = 0; i < end; i++) {
    array.push(i + start);
  }
  return array;
}

class Sorting extends Component {
  constructor() {
    super();
    this.state = {
      size: "150",
      speed: "8",
    };
  }

  componentDidMount() {
    document.title = 'Sorting Visualized';
    this.setStyle("staircase");
  }

  setStyle = (id) => {
    let selectors = document.getElementsByClassName("selector");
    for (let s of selectors) {
      s.style.color = "gray";
    }
    let selector = document.getElementById(id);
    selector.style.color = "black";
    let list = document.getElementsByClassName("list");
    if (id === "staircase") {
      list[0].style.alignItems = "flex-end";
    }
    if (id === "soundwaves") {
      list[0].style.alignItems = "center";
    }
    if (id === "stalactites") {
      list[0].style.alignItems = "flex-start";
    }
  }

  setSize = () => {
    let newSize = document.getElementById("size").value;
    this.setState({ size: newSize });
  }

  setSpeed = () => {
    let newSpeed = document.getElementById("speed").value;
    this.setState({ speed: newSpeed });
  }

  render() {
    return (
      <div className="sorting-visualized">
        <Header
          setStyle={this.setStyle}
          size={this.state.size}
          setSize={this.setSize}
          speed={this.state.speed}
          setSpeed={this.setSpeed}
        />
        <List
          size={this.state.size}
          speed={this.calculateSpeed(this.state.speed)}
        />
      </div>
    );
  }

  calculateSpeed(speed) {
    return (1 / (Math.log2(speed) / 3)) ** 1.5;
  }
}

const Header = (props) => {
  return (
    <div className="header">
      <Title setStyle={props.setStyle} />
      <Settings
        size={props.size}
        setSize={props.setSize}
        speed={props.speed}
        setSpeed={props.setSpeed}
      />
    </div>
  );
}
const Title = (props) => {
  return (
    <div className="title">
      <h2 className="logo">Sorting Visualized</h2>
      <Styles setStyle={props.setStyle} />
    </div>
  );
}

const Styles = (props) => {
  return (
    <div className="styles">
      <button
        className="selector"
        id="staircase"
        onClick={() => props.setStyle("staircase")}
      >
        Staircase
      </button> /&nbsp;
      <button
        className="selector"
        id="soundwaves"
        onClick={() => props.setStyle("soundwaves")}
      >
        Soundwaves
      </button> /&nbsp;
      <button
        className="selector"
        id="stalactites"
        onClick={() => props.setStyle("stalactites")}
      >
        Stalactites
      </button>
    </div>
  );
}

const Settings = (props) => {
  return (
    <div className="settings">
      <div className="slider">
        <b>Size&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
        <small>Min</small>&nbsp;
    <input
          id="size"
          type="range"
          min="64"
          max="172"
          step="1"
          defaultValue={props.size}
          className="slider-input"
          onChange={props.setSize}
        />
    &nbsp;<small>Max</small>
      </div>
      <div className="slider">
        <b>Speed&nbsp;&nbsp;&nbsp;&nbsp;</b>
        <small>Slow</small>&nbsp;
    <input
          id="speed"
          type="range"
          min="4"
          max="14"
          step="2"
          defaultValue={props.speed}
          className="slider-input"
          onChange={props.setSpeed}
        />
    &nbsp;<small>Fast</small>
      </div>
    </div>
  );
}

class List extends Component {
  state = {
    list: [],
    done: true,
    method: "",
    sorted: true,
    size: "0",
  };
  buttons = [
    {
      class: "sorting",
      title: "Selection Sort",
      func: selectionSort,
      speed: 6,
      active: "Sorting...",
    },
    {
      class: "sorting",
      title: "Bubble Sort",
      func: bubbleSort,
      speed: 6,
      active: "Sorting...",
    },

    {
      class: "sorting",
      title: "Cocktail Sort",
      func: cocktailSort,
      speed: 6,
      active: "Sorting...",
    },
    {
      class: "sorting",
      title: "Insertion Sort",
      func: insertionSort,
      speed: 6,
      active: "Sorting...",
    },
    {
      class: "sorting",
      title: "Merge Sort",
      func: mergeSort,
      speed: 12,
      active: "Sorting...",
    },
    {
      class: "sorting",
      title: "Quicksort",
      func: quickSort,
      speed: 12,
      active: "Sorting...",
    },
    {
      class: "sorting",
      title: "Heapsort",
      func: heapSort,
      speed: 6,
      active: "Sorting...",
    },
    {
      class: "sorting",
      title: "Timsort",
      func: timSort,
      speed: 12,
      active: "Sorting...",
    },
    {
      class: "sorting",
      title: "Radix-2 Sort",
      func: radixSort_base2,
      speed: 6,
      active: "Sorting...",
    },
    {
      class: "sorting",
      title: "Radix-16 Sort",
      func: radixSort_base16,
      speed: 12,
      active: "Sorting...",
    }
  ];

  static getDerivedStateFromProps(props, state) {
    if (state.size !== props.size) {
      return { list: generateArray(0, props.size), size: props.size };
    }
    return null;
  }

  sortAnimation = (array, l, u, sort, method, ms) => {
    if (!this.state.done) {
      return array;
    }

    let animations = [];
    let unsorted = [...array];
    const bars = document.getElementsByClassName("sorting bar");
    this.setState({ done: false, method: method, sorted: false });
    let sizeInputSlider = document.getElementById("size");
    let speedInputSlider = document.getElementById("speed");

    sizeInputSlider.disabled = true;
    speedInputSlider.disabled = true;
    ms *= this.props.speed;

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
      speedInputSlider.disabled = false;
      if (method === "Sorting...") {
        this.setState({ sorted: true });
        sizeInputSlider.disabled = false;
      }
    }, (animations.length + 1) * ms);

    return unsorted;
  };

  swap(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    return array;
  }

  render() {
    return (
      <div className="container">
        <div className="list">
          {this.state.list.map((number) => (
            <Bar key={number} height={number} />
          ))}
        </div>
        <div className="buttons">
          {this.getShuffle()}
          {this.getButtons()}
        </div>
      </div>
    );
  }

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
                12
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
        <h2 className="status">{this.state.method}</h2>
      );
    }
  };
}

class Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "lightblue",
      height: this.props.height * 3.2 + 4 + "px",
    };
  }

  render() {
    return <div className="sorting bar" style={this.state} />;
  }
}

export default Sorting;
