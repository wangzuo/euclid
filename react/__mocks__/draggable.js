import React, { Component } from 'react';

export default function Draggable(Wrapped) {
  return class extends Component {
    render() {
      return <Wrapped {...this.props} />;
    }
  };
}
