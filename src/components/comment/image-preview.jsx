import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { fabric } from "fabric";
import ColorPicker from "./color-picker";
import ToolBar from "./toolbar";
import { addComment } from "../../queries/comment";

const ImagePreview = ({ imageUrl, onAddDrawing, idStory = 1 }) => {
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const [activeColor, setActiveColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(3);
  const [activeTool, setActiveTool] = useState("brush");

  const initCanvas = (canvas) => {
    if (!canvas || fabricCanvas) return;

    const newCanvas = new fabric.Canvas(canvas, {
      isDrawingMode: true,
      width: 900,
      height: 600,
    });

    if (imageUrl) {
      fabric.Image.fromURL(imageUrl, (img) => {
        img.scaleToWidth(newCanvas.width || 900);

        const canvasWidth = newCanvas.getWidth();
        const canvasHeight = newCanvas.getHeight();

        const imgWidth = img.getScaledWidth();
        const imgHeight = img.getScaledHeight();

        img.set({
          left: (canvasWidth - imgWidth) / 2,
          top: (canvasHeight - imgHeight) / 2,
          originX: "left",
          originY: "top",
          selectable: false,
        });

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

  const handleAddAnnotation = async () => {
    if (!fabricCanvas) return;

    fabricCanvas.backgroundImage?.set({ selectable: false });
    fabricCanvas.renderAll();

    const annotatedImage = fabricCanvas.toDataURL({
      format: "png",
      multiplier: 2,
    });

    await addComment({ idstory: idStory, image_base64: annotatedImage });

    // Uncomment to download
    // const link = document.createElement("a");
    // link.href = annotatedImage;
    // link.download = "image-annotée.png";
    // link.click();

    toast("Nouvelle image enregistrée !");
    if (onAddDrawing) onAddDrawing(annotatedImage);
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
      case "eraser": {
        fabricCanvas.isDrawingMode = true;
        const eraser = new fabric.PencilBrush(fabricCanvas);
        eraser.color = "#ffffff";
        eraser.width = brushSize;
        fabricCanvas.freeDrawingBrush = eraser;
        break;
      }
      case "select":
        fabricCanvas.isDrawingMode = false;
        break;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4"></div>
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
            className="mt-auto px-4 py-3 bg-blue-600 rounded-full text-white  hover:bg-blue-700 transition"
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
