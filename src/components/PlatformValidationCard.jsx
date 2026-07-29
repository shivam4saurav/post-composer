import { AlertCircle, CheckCircle2, Hash } from "lucide-react";
import CharBar from "./CharBar";
import { countHashtags } from "../utils/validation";

export default function PlatformValidationCard({ cfg, text, mediaCount, issues }) {
  const hashtagCount = countHashtags(text);

  return (
    <div className="pc-platform-card" style={{ borderLeft: `3px solid ${cfg.color}` }}>
      <div className="pc-platform-card-top">
        <div className="pc-platform-name">
          <span className="pc-dot" style={{ backgroundColor: cfg.color }} />
          <span>{cfg.label}</span>
        </div>
        <span className={`pc-count-text ${text.length > cfg.charLimit ? "over" : ""}`}>
          {text.length}/{cfg.charLimit}
        </span>
      </div>

      <CharBar used={text.length} limit={cfg.charLimit} />

      <div className="pc-stats-row">
        <span>
          <Hash size={12} /> {hashtagCount}/{cfg.maxHashtags}
        </span>
        <span>
          Media {mediaCount}/{cfg.maxMedia}
        </span>
      </div>

      {issues.length > 0 && (
        <ul className="pc-issue-list">
          {issues.map((issue, idx) => (
            <li key={idx} className={`pc-issue ${issue.type}`}>
              <AlertCircle size={13} />
              {issue.message}
            </li>
          ))}
        </ul>
      )}

      {issues.length === 0 && (
        <div className="pc-ready">
          <CheckCircle2 size={13} />
          Ready to publish
        </div>
      )}
    </div>
  );
}
