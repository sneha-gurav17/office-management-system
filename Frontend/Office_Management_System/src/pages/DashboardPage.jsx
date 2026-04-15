import StatCard from "../components/StatCard";

export default function DashboardPage({
  employees,
  attendance,
  payroll,
  selectedEmployee,
  details,
  setActivePage,
}) {
  return (
    <section className="page-grid">
      <div className="stats-grid">
        <StatCard
          label="Total Employees"
          value={employees.length}
          hint="All employee records"
        />
        <StatCard
          label="Attendance"
          value={attendance.length}
          hint="For selected employee"
        />
        <StatCard
          label="Payroll"
          value={payroll.length}
          hint="For selected employee"
        />
        <StatCard
          label="Details"
          value={details ? "Saved" : "None"}
          hint="Personal profile data"
        />
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-panel hero-panel">
          <p className="section-kicker">Welcome</p>
          <h2>HR Management Portal</h2>
          

          <div className="hero-actions">
            <button onClick={() => setActivePage("employees")} className="primary-btn">
              View Employees
            </button>
            <button onClick={() => setActivePage("add-employee")} className="secondary-btn">
              Add Employee
            </button>
          </div>
        </div>

        <div className="dashboard-panel info-panel">
          <p className="section-kicker">Selected employee</p>
          {selectedEmployee ? (
            <div className="summary-stack">
              <div className="summary-row">
                <span>Name</span>
                <strong>{selectedEmployee.name}</strong>
              </div>
              <div className="summary-row">
                <span>Email</span>
                <strong>{selectedEmployee.email}</strong>
              </div>
              <div className="summary-row">
                <span>Role</span>
                <strong>{selectedEmployee.role}</strong>
              </div>
              <div className="summary-row">
                <span>Department</span>
                <strong>{selectedEmployee.department}</strong>
              </div>
              <div className="summary-row">
                <span>Bank</span>
                <strong>{details?.bankName || "—"}</strong>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              Select an employee in the list to see a quick summary.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}