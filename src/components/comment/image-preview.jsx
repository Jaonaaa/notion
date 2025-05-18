import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { fabric } from "fabric";
import ColorPicker from "./color-picker";
import ToolBar from "./toolbar";

// Simple Dialog implementation
function SimpleDialog({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl" aria-label="Fermer">
          ×
        </button>
        <div className="mb-4">
          <h2 className="text-lg font-bold">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
}

const ImagePreview = ({ imageUrl, onAddDrawing }) => {
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const [activeColor, setActiveColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(3);
  const [activeTool, setActiveTool] = useState("brush");
  const [dialogOpen, setDialogOpen] = useState(false);

  const initCanvas = (canvas) => {
    if (!canvas || fabricCanvas) return;

    const newCanvas = new fabric.Canvas(canvas, {
      isDrawingMode: true,
      width: 500,
      height: 400,
    });

    if (imageUrl) {
      fabric.Image.fromURL(imageUrl, (img) => {
        img.scaleToWidth(newCanvas.width || 500);
        newCanvas.setBackgroundImage(img, newCanvas.renderAll.bind(newCanvas));
      });
    }

    newCanvas.freeDrawingBrush.color = activeColor;
    newCanvas.freeDrawingBrush.width = brushSize;
    setFabricCanvas(newCanvas);
  };

  const handleColorChange = (color) => {
    setActiveColor(color);
    if (fabricCanvas && fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.color = color;
    }
  };

  const handleBrushSizeChange = (size) => {
    setBrushSize(size);
    if (fabricCanvas && fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.width = size;
    }
  };

  const handleAddAnnotation = () => {
    if (!fabricCanvas) return;

    const annotatedImage = fabricCanvas.toDataURL({ format: "png" });
    onAddDrawing(annotatedImage);
    toast("Annotation ajoutée !");
    setDialogOpen(false);
  };

  const handleToolChange = (tool) => {
    setActiveTool(tool);

    if (!fabricCanvas) return;

    switch (tool) {
      case "brush":
      case "pencil":
        fabricCanvas.isDrawingMode = true;
        fabricCanvas.freeDrawingBrush = new fabric.PencilBrush(fabricCanvas);
        fabricCanvas.freeDrawingBrush.color = activeColor;
        fabricCanvas.freeDrawingBrush.width = brushSize;
        break;
      case "eraser":
        fabricCanvas.isDrawingMode = true;
        const eraser = new fabric.PencilBrush(fabricCanvas);
        eraser.color = "#ffffff";
        eraser.width = brushSize;
        fabricCanvas.freeDrawingBrush = eraser;
        break;
      case "select":
        fabricCanvas.isDrawingMode = false;
        break;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Aperçu du Tableau</h3>
        {/* {imageUrl && ( */}
        <button
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
          onClick={() => setDialogOpen(true)}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Annoter
        </button>
        {/* )} */}
      </div>

      <SimpleDialog open={dialogOpen} onClose={() => setDialogOpen(false)} title="Outils de dessin">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <canvas id="drawing-canvas" ref={initCanvas} />
          </div>
          <div className="flex flex-col gap-4 w-full md:w-64">
            <div>
              <label className="font-medium text-sm block mb-1">Couleur du pinceau</label>
              <ColorPicker color={activeColor} onChange={handleColorChange} />
            </div>
            <div>
              <label className="font-medium text-sm block mb-1">Taille du pinceau</label>
              <input
                type="range"
                min={1}
                max={20}
                value={brushSize}
                onChange={(e) => handleBrushSizeChange(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-sm text-gray-500 mt-1">Taille : {brushSize}px</div>
            </div>
            <ToolBar
              activeTool={activeTool}
              onToolChange={handleToolChange}
              onClear={() => {
                throw new Error("Function not implemented.");
              }}
              onSave={() => {
                throw new Error("Function not implemented.");
              }}
              onLoad={() => {
                throw new Error("Function not implemented.");
              }}
              brushSize={0}
              onBrushSizeChange={() => {
                throw new Error("Function not implemented.");
              }}
            />
            <button
              onClick={handleAddAnnotation}
              className="mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Enregistrer l'annotation
            </button>
          </div>
        </div>
      </SimpleDialog>

      {imageUrl ? (
        <div className="relative">
          <img src={imageUrl} alt="Aperçu du tableau" className="w-full h-auto rounded-md border border-gray-200" />
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-md p-12 flex items-center justify-center bg-gray-50">
          <p className="text-gray-500">Dessinez quelque chose pour voir l'aperçu</p>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
