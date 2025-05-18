import React from "react";
import { Brush, Pencil, Eraser, MousePointer, Trash2 } from "lucide-react";

const ToolBar = ({ activeTool, onToolChange, onClear }) => {
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

      <div className="flex gap-1">
        <button className="border rounded p-2 bg-white hover:bg-gray-100 transition" onClick={onClear} title="Effacer">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default ToolBar;
