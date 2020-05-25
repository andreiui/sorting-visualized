import React, { Component } from 'react';
import './tab.css';

class Tab extends Component {
  state = {};
  render() {
    return (
      <div className='Tab'>
        <Icon />
        <Description />
      </div>
    );
  }
}

class Icon extends Component {
  render() {
    return <div className='Tab-Icon' style={this.getImg()} />;
  }
  getImg() {
    return {};
  }
}

class Description extends Component {
  state = {};
  render() {
    return (
      <div className='Tab-Description'>
        <h1 className='Title'>Title</h1>
        <p className='Description'>Description</p>
      </div>
    );
  }
}

export default Tab;
