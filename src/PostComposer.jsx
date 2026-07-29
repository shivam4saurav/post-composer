import { useState, useMemo } from "react";
import "./PostComposer.css";

import { PLATFORMS } from "./platforms";
import { validateForPlatform } from "./utils/validation";
import PlatformSelector from "./components/PlatformSelector";
import MediaUploader from "./components/MediaUploader";
import PlatformValidationCard from "./components/PlatformValidationCard";

export default function PostComposer() {
  const [text, setText] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState(["twitter"]);
  const [media, setMedia] = useState([]);
  const [posted, setPosted] = useState(false);

  const togglePlatform = (key) => {
    setSelectedPlatforms((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
    );
  };

  const addMedia = (newItems) => {
    setMedia((prev) => [...prev, ...newItems]);
  };

  const removeMedia = (id) => {
    setMedia((prev) => prev.filter((m) => m.id !== id));
  };

  const validationByPlatform = useMemo(() => {
    const result = {};
    selectedPlatforms.forEach((key) => {
      result[key] = validateForPlatform(key, text, media.length);
    });
    return result;
  }, [text, media, selectedPlatforms]);

  const hasBlockingErrors = useMemo(() => {
    return Object.values(validationByPlatform).some((issues) =>
      issues.some((i) => i.type === "error")
    );
  }, [validationByPlatform]);

  const canPost = selectedPlatforms.length > 0 && text.trim().length > 0 && !hasBlockingErrors;

  const handlePost = () => {
    if (!canPost) return;
    setPosted(true);
    setTimeout(() => setPosted(false), 2500);
  };

  const handleReset = () => {
    setText("");
    setSelectedPlatforms(["twitter"]);
    setMedia([]);
    setPosted(false);
  };

  return (
    <div className="pc-page">
      <div className="pc-card">
        {posted && (
          <div className="pc-success-banner" role="status">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Post published
          </div>
        )}

        <div className="pc-card-header">
          <h1>Post Composer</h1>
          <p>Write once, publish across your selected platforms.</p>
        </div>

        <PlatformSelector selectedPlatforms={selectedPlatforms} onToggle={togglePlatform} />

        <div className="pc-textarea-wrap">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What do you want to share?"
            rows={5}
            className="pc-textarea"
          />
        </div>

        <MediaUploader media={media} onAddFiles={addMedia} onRemove={removeMedia} />

        <div className="pc-validation-section">
          {selectedPlatforms.length === 0 && (
            <p className="pc-empty-note">Select at least one platform to see its rules.</p>
          )}

          {selectedPlatforms.map((key) => (
            <PlatformValidationCard
              key={key}
              cfg={PLATFORMS[key]}
              text={text}
              mediaCount={media.length}
              issues={validationByPlatform[key]}
            />
          ))}
        </div>

        <div className="pc-footer">
          <span className="pc-footer-note">
            {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? "s" : ""} selected
          </span>
          <div className="pc-footer-actions">
            <button type="button" className="pc-reset-btn" onClick={handleReset}>
              Reset
            </button>
            <button className="pc-publish-btn" onClick={handlePost} disabled={!canPost}>
              {posted ? "Published" : "Publish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
