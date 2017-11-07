import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DraggableContainer, Draggable } from './draggable';
import * as styles from './styles';

const DraggablePoint = Draggable(({
  point
}) => {
  return (
    <circle
      style={styles.pointDraggable}
      className="point"
      cx={point.x}
      cy={point.y}
      r="4"
    />
  );
});

const Geom = ({ geom }) => {
  const { type, name, draggable } = geom;

  if (type === 'Point') {
    return (
      <g>
        <text x={geom.x + 4} y={geom.y - 4}>{name}</text>
        {draggable
          ? <DraggablePoint point={geom} pos={geom.pos} />
          : <circle
              style={styles.point}
              className="point"
              cx={geom.x}
              cy={geom.y}
              r="3"
            />}
      </g>
    );
  } else if (type === 'Line') {
    return (
      <line
        style={styles.line}
        className="line"
        x1={geom.p1.x}
        y1={geom.p1.y}
        x2={geom.p2.x}
        y2={geom.p2.y}
      />
    );
  } else if (type === 'Circle') {
    return (
      <circle
        className="circle"
        style={styles.circle}
        cx={geom.x}
        cy={geom.y}
        r={geom.r}
      />
    );
  }

  return null;
};

const SceneSVG = DraggableContainer(({ geoms, width, height }) => {
  return (
    <svg
      className="geometry"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMin meet"
      style={{ width, height, ...styles.svg }}
    >
      {geoms.map(geom => <Geom key={geom.name} geom={geom} />)}
    </svg>
  );
});

class Scene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      geoms: props.scene.toJSON()
    };
  }

  onDragMove = (active, x, y) => {
    const scene = this.props.scene.movePoint(active.props.point.name, x, y);
    this.setState({
      geoms: scene.toJSON()
    });
  };

  render() {
    const { width, height } = this.props.scene;
    const { geoms } = this.state;

    return (
      <SceneSVG
        width={width}
        height={height}
        geoms={geoms}
        onDragMove={this.onDragMove}
      />
    );
  }
}

export default Scene;
