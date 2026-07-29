import { PLATFORMS } from "../platforms";

export function countHashtags(text) {
  const matches = text.match(/#[a-zA-Z0-9_]+/g);
  return matches ? matches.length : 0;
}

export function validateForPlatform(key, text, mediaCount) {
  const rules = PLATFORMS[key];
  const issues = [];
  const len = text.length;
  const hashtagCount = countHashtags(text);

  if (len === 0) {
    issues.push({ type: "warning", message: "Post text is empty." });
  }

  if (len > rules.charLimit) {
    issues.push({
      type: "error",
      message: `${len - rules.charLimit} characters over the ${rules.charLimit} limit.`,
    });
  } else if (len > rules.charLimit * 0.9) {
    issues.push({
      type: "warning",
      message: `Approaching the ${rules.charLimit} character limit.`,
    });
  }

  if (hashtagCount > rules.maxHashtags) {
    issues.push({
      type: "error",
      message: `Too many hashtags (${hashtagCount}/${rules.maxHashtags} allowed).`,
    });
  }

  if (mediaCount > rules.maxMedia) {
    issues.push({
      type: "error",
      message: `Too many attachments (${mediaCount}/${rules.maxMedia} allowed).`,
    });
  }

  if (rules.mediaRequired && mediaCount === 0) {
    issues.push({ type: "error", message: "This platform requires at least one image." });
  }

  return issues;
}
