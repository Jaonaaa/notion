import React from "react";
import { Brush, Pencil, Eraser, MousePointer } from "lucide-react";

const ToolBar = ({ activeTool, onToolChange }) => {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <div className="flex items-center gap-1 border rounded-lg p-1 bg-white shadow-sm">
        <button
          className={`tool-button ${activeTool === "select" ? "active" : ""}`}
          onClick={() => onToolChange("select")}
          title="Sélectionner"
        >
          <MousePointer size={20} />
        </button>
        <button
          className={`tool-button ${activeTool === "brush" ? "active" : ""}`}
          onClick={() => onToolChange("brush")}
          title="Pinceau"
        >
          <Brush size={20} />
        </button>
        <button
          className={`tool-button ${activeTool === "pencil" ? "active" : ""}`}
          onClick={() => onToolChange("pencil")}
          title="Crayon"
        >
          <Pencil size={20} />
        </button>
        <button
          className={`tool-button ${activeTool === "eraser" ? "active" : ""}`}
          onClick={() => onToolChange("eraser")}
          title="Gomme"
        >
          <Eraser size={20} />
        </button>
      </div>
    </div>
  );
};

export default ToolBar;
