const items = [
  { key: "dashboard", label: "Dashboard" },
  { key: "employees", label: "View Employee" },
  { key: "add-employee", label: "Add Employee" },
  { key: "details", label: "Employee Details" },
  { key: "attendance", label: "Attendance" },
  { key: "payroll", label: "Payroll" },
];

export default function Sidebar({ activePage, setActivePage, selectedEmployee }) {
  return (
    <aside className="sidebar">
      <div>
        <div className="brand-block">
          {/* <div className="brand-badge">OM</div> */}
          <div>
            <h2>Office Manager</h2>
            <p>HR system dashboard</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {items.map((item) => (
            <button
              key={item.key}
              className={activePage === item.key ? "nav-item active" : "nav-item"}
              onClick={() => setActivePage(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebar-note">
        <p className="sidebar-note-label">Selected employee</p>
        <h3>{selectedEmployee?.name || "None selected"}</h3>
        <p>{selectedEmployee?.department || "Choose an employee from the list"}</p>
      </div>
    </aside>
  );
}