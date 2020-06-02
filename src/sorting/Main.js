import React, { Component } from "react";
import "./Main.css";
import Sorting from "./Sorting.js";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: "156",
      speed: "9",
    };
    this.setSize = this.setSize.bind(this);
    this.setSpeed = this.setSpeed.bind(this);
  }

  setSize() {
    let newSize = document.getElementById("size").value;
    this.setState({ size: newSize });
  }

  setSpeed() {
    let newSpeed = document.getElementById("speed").value;
    this.setState({ speed: newSpeed });
  }

  render() {
    return (
      <React.Fragment>
        <Header
          size={this.state.size}
          setSize={this.setSize}
          speed={this.state.speed}
          setSpeed={this.setSpeed}
        />
        <Sorting size={this.state.size} speed={this.state.speed} />
      </React.Fragment>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <div className="header">
        <Title size={this.props.size} />
        <Settings
          size={this.props.size}
          setSize={this.props.setSize}
          speed={this.props.speed}
          setSpeed={this.props.setSpeed}
        />
      </div>
    );
  }
}

class Settings extends Component {
  render() {
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
            defaultValue={this.props.size}
            className="slider-input"
            onChange={this.props.setSize}
          />
          &nbsp;<small>Max</small>
        </div>
        <div className="slider">
          <b>Speed&nbsp;&nbsp;&nbsp;&nbsp;</b>
          <small>Slow</small>&nbsp;
          <input
            id="speed"
            type="range"
            min="2"
            max="12"
            step="2"
            defaultValue={this.props.speed}
            className="slider-input"
            onChange={this.props.setSpeed}
          />
          &nbsp;<small>Fast</small>
        </div>
      </div>
    );
  }
}

class Title extends Component {
  render() {
    return (
      <div className="title">
        <div className="logo">
          <h1 className="text">
            {this.props.size}&nbsp;<small>lines</small>&nbsp;
          </h1>
          <h2 className="text">|&nbsp;</h2>
          <h3 className="text">
            7&nbsp;<small>algorithms</small>
          </h3>
        </div>
        <div className="text">
          <small>
            made by{" "}
            <a className="a" href="https://github.com/andreiui">
              Andrei Pascu
            </a>
          </small>
        </div>
      </div>
    );
  }
}

export default Main;
