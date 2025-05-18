import React from "react";

const ColorPicker = ({ color, onChange }) => {
  const colors = [
    "#000000", // Black
    "#FF0000", // Red
    "#00FF00", // Green
    "#0000FF", // Blue
    "#FFFF00", // Yellow
    "#FF00FF", // Magenta
    "#00FFFF", // Cyan
    "#FFA500", // Orange
    "#800080", // Purple
    "#008000", // Dark Green
    "#FFC0CB", // Pink
    "#A52A2A", // Brown
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="text-sm font-medium mb-2">Couleurs</div>
      <div className="flex flex-wrap gap-2 p-2 border rounded-lg bg-white shadow-sm">
        {colors.map((c) => (
          <div
            key={c}
            className="color-picker-item"
            style={{ backgroundColor: c, outline: color === c ? "2px solid #666" : "none" }}
            onClick={() => onChange(c)}
            title={c}
          />
        ))}
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="w-6 h-6 cursor-pointer"
          title="Couleur personnalisée"
        />
      </div>
    </div>
  );
};

export default ColorPicker;
