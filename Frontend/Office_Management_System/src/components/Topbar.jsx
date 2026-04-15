export default function Topbar({ pageTitle, pageSubtitle, selectedEmployee }) {
  return (
    <header className="topbar">
      <div>
        <p className="topbar-kicker">Office Management System</p>
        <h1>{pageTitle}</h1>
        <p className="topbar-subtitle">{pageSubtitle}</p>
      </div>

      <div className="topbar-chip">
        <span>Selected</span>
        <strong>{selectedEmployee?.name || "No employee"}</strong>
      </div>
    </header>
  );
}