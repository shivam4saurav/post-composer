import { PLATFORMS } from "../platforms";

export default function PlatformSelector({ selectedPlatforms, onToggle }) {
  return (
    <div className="pc-platform-list">
      {Object.entries(PLATFORMS).map(([key, cfg]) => {
        const active = selectedPlatforms.includes(key);
        return (
          <button
            key={key}
            onClick={() => onToggle(key)}
            className={`pc-platform-btn ${active ? "active" : ""}`}
            style={active ? { backgroundColor: cfg.color } : undefined}
          >
            {cfg.label}
          </button>
        );
      })}
    </div>
  );
}
