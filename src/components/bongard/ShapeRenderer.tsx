'use client';

import { Shape } from './LevelData';

interface ShapeRendererProps {
  shapes: Shape[];
  boxSize?: number; // Size of the containing box in pixels (default: 100)
}

export default function ShapeRenderer({ shapes, boxSize = 100 }: ShapeRendererProps) {
  // Helper function to convert percentage position to actual coordinates
  const getCoordinates = (position: { x: number; y: number }) => {
    return {
      x: (position.x / 100) * boxSize,
      y: (position.y / 100) * boxSize,
    };
  };

  // Render a circle
  const renderCircle = (shape: Shape, index: number) => {
    const coords = getCoordinates(shape.position);
    const radius = (shape.size / 100) * boxSize / 2;

    return (
      <circle
        key={`circle-${index}`}
        cx={coords.x}
        cy={coords.y}
        r={radius}
        fill={shape.color}
        stroke="rgba(255, 255, 255, 0.3)"
        strokeWidth="2"
      />
    );
  };

  // Render a square
  const renderSquare = (shape: Shape, index: number) => {
    const coords = getCoordinates(shape.position);
    const size = (shape.size / 100) * boxSize;
    const x = coords.x - size / 2;
    const y = coords.y - size / 2;

    return (
      <rect
        key={`square-${index}`}
        x={x}
        y={y}
        width={size}
        height={size}
        fill={shape.color}
        stroke="rgba(255, 255, 255, 0.3)"
        strokeWidth="2"
        rx="4"
      />
    );
  };

  // Render a triangle
  const renderTriangle = (shape: Shape, index: number) => {
    const coords = getCoordinates(shape.position);
    const size = (shape.size / 100) * boxSize;
    const rotation = shape.rotation || 0;

    // Define triangle points (pointing up by default)
    // Equilateral triangle
    const height = size * Math.sqrt(3) / 2;
    const points = [
      { x: 0, y: -height * 2/3 },           // Top point
      { x: -size / 2, y: height / 3 },      // Bottom left
      { x: size / 2, y: height / 3 },       // Bottom right
    ];

    // Convert points to string format and apply rotation
    const pointsString = points
      .map(p => `${p.x},${p.y}`)
      .join(' ');

    return (
      <g
        key={`triangle-${index}`}
        transform={`translate(${coords.x}, ${coords.y}) rotate(${rotation})`}
      >
        <polygon
          points={pointsString}
          fill={shape.color}
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="2"
        />
      </g>
    );
  };

  // Render the appropriate shape based on type
  const renderShape = (shape: Shape, index: number) => {
    switch (shape.type) {
      case 'circle':
        return renderCircle(shape, index);
      case 'square':
        return renderSquare(shape, index);
      case 'triangle':
        return renderTriangle(shape, index);
      default:
        return null;
    }
  };

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${boxSize} ${boxSize}`}
      preserveAspectRatio="xMidYMid meet"
      className="pointer-events-none"
    >
      {shapes.map((shape, index) => renderShape(shape, index))}
    </svg>
  );
}