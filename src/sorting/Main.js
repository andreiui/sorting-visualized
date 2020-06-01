import React, { Component } from "react";
import "./Main.css";
import Sorting from "./Sorting";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <Header />
        <Sorting />
      </React.Fragment>
    );
  }
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="header">
        <Title />
        <Settings />
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
            type="range"
            min="64"
            max="156"
            defaultValue="156"
            className="slider-input"
          />
          &nbsp;<small>Max</small>
        </div>
        <div className="slider">
          <b>Speed&nbsp;&nbsp;&nbsp;&nbsp;</b>
          <small>Slow</small>&nbsp;
          <input
            type="range"
            min="2"
            max="12"
            defaultValue="9"
            className="slider-input"
          />
          &nbsp;<small>Fast</small>
        </div>
      </div>
    );
  }
}

const Title = () => {
  return (
    <div className="title">
      <div className="logo">
        <h1 className="text">
          156&nbsp;<small>lines</small>&nbsp;
        </h1>
        <h2 className="text">|&nbsp;</h2>
        <h3 className="text">
          7&nbsp;<small>algorithms</small>
        </h3>
      </div>
      <div className="text">
        <small>
          made by{" "}
          <a className="a" href="https://github.com/andreiui?tab=projects">
            Andrei Pascu
          </a>
        </small>
      </div>
    </div>
  );
};

export default Main;
