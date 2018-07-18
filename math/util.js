const { tan, acos, sqrt } = Math;

// min (inclusive) and max (exclusive)
export const random = (min, max) => Math.random() * (max - min) + min;

export const dist = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
};

export const circumcircle = (
  { x: x1, y: y1 },
  { x: x2, y: y2 },
  { x: x3, y: y3 }
) => {
  const x12 = x2 - x1;
  const y12 = y2 - y1;
  const x13 = x3 - x1;
  const y13 = y3 - y1;

  const z2 = x12 * (x1 + x2) + y12 * (y1 + y2);
  const z3 = x13 * (x1 + x3) + y13 * (y1 + y3);
  const d = 2.0 * (x12 * (y3 - y2) - y12 * (x3 - x2));

  const x = (y13 * z2 - y12 * z3) / d;
  const y = (x12 * z3 - x13 * z2) / d;

  const r = dist({ x: x1, y: y1 }, { x, y });
  return { x, y, r };
};

export const area = ({ x: x1, y: y1 }, { x: x2, y: y2 }, { x: x3, y: y3 }) => {
  return (x3 * y2 - x2 * y3 - (x3 * y1 - x1 * y3) + (x2 * y1 - x1 * y2)) / 2;
};

export const angle = ({ x: x1, y: y1 }, { x: x2, y: y2 }, { x: x3, y: y3 }) => {
  const a = dist({ x: x2, y: y2 }, { x: x3, y: y3 });
  const b = dist({ x: x1, y: y1 }, { x: x3, y: y3 });
  const c = dist({ x: x1, y: y1 }, { x: x2, y: y2 });

  return (Math.acos((a * a + c * c - b * b) / (2 * a * c)) * 180) / Math.PI;
};

export const incircle = (
  { x: x1, y: y1 },
  { x: x2, y: y2 },
  { x: x3, y: y3 }
) => {
  const a = dist({ x: x2, y: y2 }, { x: x3, y: y3 });
  const b = dist({ x: x1, y: y1 }, { x: x3, y: y3 });
  const c = dist({ x: x1, y: y1 }, { x: x2, y: y2 });
  const p = a + b + c;

  const x = (a * x1 + b * x2 + c * x3) / p;
  const y = (a * y1 + b * y2 + c * y3) / p;

  const r = (1 / 2) * sqrt(((b + c - a) * (c + a - b) * (a + b - c)) / p);
  return { x, y, r };
};

export const orthocenter = (
  { x: x1, y: y1 },
  { x: x2, y: y2 },
  { x: x3, y: y3 }
) => {
  const k1 = (y3 - y2) / (x2 - x3);
  const k2 = (y3 - y1) / (x1 - x3);
  const y = (k1 * y1 - k2 * y2 + x2 - x1) / (k1 - k2);
  const x = k1 * y - k1 * y1 + x1;
  return { x, y };
};

export const centroid = (
  { x: x1, y: y1 },
  { x: x2, y: y2 },
  { x: x3, y: y3 }
) => {
  return { x: (x1 + x2 + x3) / 3, y: (y1 + y2 + y3) / 3 };
};
