import find from 'lodash/find';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

export class Manager {
  actinve = null;
  nodes = [];

  add(node) {
    this.nodes.push(node);
  }

  drag(target) {
    this.active = find(
      this.nodes,
      ({ node }) => node == target || node.contains(target)
    );
    return this.active;
  }
}

export function DraggableContainer(Wrapped) {
  return class extends Component {
    static childContextTypes = {
      manager: PropTypes.object.isRequired
    };

    getChildContext() {
      return {
        manager: this.manager
      };
    }

    constructor(props) {
      super(props);
      this.manager = new Manager();
    }

    componentDidMount() {
      this.container = findDOMNode(this);
      this.container.addEventListener('mousedown', this.handleStart, false);
      this.container.addEventListener('mousemove', this.handleMove, false);
      this.container.addEventListener('mouseup', this.handleEnd, false);
    }

    handleStart = e => {
      const active = this.manager.drag(e.target);

      if (active) {
        this._dragging = true;
        this._pos = {
          x: e.clientX,
          y: e.clientY
        };
      }
    };

    handleMove = e => {
      if (this._dragging) {
        const { active } = this.manager;
        const { top, left } = this.container.getBoundingClientRect();
        const { x, y } = active.pos(e.clientX - left, e.clientY - top);

        this.props.onDragMove(active, x, y);
      }
    };

    handleEnd = () => {
      if (this._dragging) {
        this._dragging = false;
        this.manager.active = null;
      }
    };

    render() {
      return <Wrapped {...this.props} />;
    }
  };
}

export function Draggable(Wrapped) {
  return class extends Component {
    static contextTypes = {
      manager: PropTypes.object.isRequired
    };

    componentDidMount() {
      const node = findDOMNode(this);
      this.context.manager.add({
        props: this.props,
        pos: this.props.pos,
        node
      });
    }

    render() {
      return <Wrapped {...this.props} />;
    }
  };
}
