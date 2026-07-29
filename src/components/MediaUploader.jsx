import { useRef } from "react";
import { Image as ImageIcon, X } from "lucide-react";

export default function MediaUploader({ media, onAddFiles, onRemove }) {
  const fileInputRef = useRef(null);

  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    const newItems = files.map((f) => ({
      id: `${f.name}-${Date.now()}-${Math.random()}`,
      name: f.name,
    }));
    onAddFiles(newItems);
    e.target.value = "";
  };

  return (
    <div className="pc-media-section">
      <div className="pc-media-controls">
        <button className="pc-add-media-btn" onClick={() => fileInputRef.current?.click()}>
          <ImageIcon size={16} />
          Add media
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          hidden
          onChange={handleFiles}
        />
        <span className="pc-media-count">{media.length} attached</span>
      </div>

      {media.length > 0 && (
        <div className="pc-media-chips">
          {media.map((m) => (
            <div key={m.id} className="pc-media-chip">
              <ImageIcon size={12} />
              <span className="pc-media-chip-name">{m.name}</span>
              <button className="pc-media-remove" onClick={() => onRemove(m.id)}>
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
