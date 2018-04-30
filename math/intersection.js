import { dist } from './util';

export const circleCircle = (
  { x: x1, y: y1, r: r1 },
  { x: x2, y: y2, r: r2 }
) => {
  const d = dist({ x: x1, y: y1 }, { x: x2, y: y2 });
  const r = r1 + r2;

  if (d < r) {
    const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
    const h = Math.sqrt(r1 * r1 - a * a);

    const x3 = (x2 - x1) * a / d + x1;
    const y3 = (y2 - y1) * a / d + y1;

    const p1 = {
      x: x3 + h * (y2 - y1) / d,
      y: y3 - h * (x2 - x1) / d
    };

    const p2 = {
      x: x3 - h * (y2 - y1) / d,
      y: y3 + h * (x2 - x1) / d
    };

    return [p1, p2];
  } else if (d === r) {
  } else {
  }
};

export const lineCircle = ({ p1, p2 }, { x, y, r }) => {
  const d = dist(p1, p2);
  const { x: x1, y: y1 } = p1;
  const { x: x2, y: y2 } = p2;
  const dx = (x2 - x1) / d;
  const dy = (y2 - y1) / d;
  const t = dx * (x - x1) + dy * (y - y1);
  const ex = t * dx + x1;
  const ey = t * dy + y1;
  const dd = dist({ x: ex, y: ey }, { x, y });

  if (dd < r) {
    const dt = Math.sqrt(r * r - dd * dd);
    const fx = (t - dt) * dx + x1;
    const fy = (t - dt) * dy + y1;

    const gx = (t + dt) * dx + x1;
    const gy = (t + dt) * dy + y1;

    return [{ x: fx, y: fy }, { x: gx, y: gy }];
  } else if (dd === r) {
  } else {
  }
};

export const lineLine = (l1, l2) => {
  const x1 = l1.p1.x;
  const y1 = l1.p1.y;
  const x2 = l1.p2.x;
  const y2 = l1.p2.y;
  const x3 = l2.p1.x;
  const y3 = l2.p1.y;
  const x4 = l2.p2.x;
  const y4 = l2.p2.y;

  const x =
    ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) /
    ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
  const y =
    ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) /
    ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
  return { x, y };
};
