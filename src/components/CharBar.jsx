export default function CharBar({ used, limit }) {
  const pct = Math.min((used / limit) * 100, 100);
  const over = used > limit;
  const barColor = over ? "#dc2626" : pct > 90 ? "#d97706" : "#4f46e5";

  return (
    <div className="pc-charbar-track">
      <div
        className="pc-charbar-fill"
        style={{ width: `${pct}%`, backgroundColor: barColor }}
      />
    </div>
  );
}
