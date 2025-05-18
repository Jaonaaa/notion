import { XIcon } from "lucide-react";

export const Drawer = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 bacgdkdrop-blur-sm">
      <div className="bg-white w-full md:max-w-md rounded-t-2xl md:rounded-2xl shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className=" cursor-pointer absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-2xl"
          aria-label="Fermer"
        >
          <XIcon className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Drawer;
