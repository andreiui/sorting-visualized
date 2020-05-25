import React, { Component } from 'react';
import './Tab.css';

class Tab extends Component {
  state = {};
  render() {
    return (
      <div className='tab'>
        <Icon />
        <Description />
      </div>
    );
  }
}

class Icon extends Component {
  render() {
    return <div className='tab-icon' style={this.getImg()} />;
  }
  getImg() {
    return {};
  }
}

class Description extends Component {
  state = {};
  render() {
    return (
      <div className='tab-description'>
        <h1 className='title'>Title</h1>
        <p className='description'>Description</p>
      </div>
    );
  }
}

export default Tab;
