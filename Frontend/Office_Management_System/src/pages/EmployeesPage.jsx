export default function EmployeesPage({
  employees,
  selectedEmployeeId,
  onSelectEmployee,
  searchInput,
  setSearchInput,
  applySearch,
  resetSearch,
  selectedEmployee,
  details,
  loading,
}) {
  const filteredEmployees = employees.filter((emp) => {
    const q = searchInput.trim().toLowerCase();
    if (!q) return true;
    return [emp.name, emp.email, emp.role, emp.department]
      .filter(Boolean)
      .some((item) => item.toLowerCase().includes(q));
  });

  return (
    <section className="page-grid">
      <div className="employees-top">
        <div>
          <p className="section-kicker">Search</p>
          <h2>Search Employee</h2>
          <p className="section-subtext">
            Find employees by name, email, role, or department.
          </p>
        </div>

        <div className="search-bar">
          <input
            className="input"
            placeholder="Type employee name..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="primary-btn" onClick={applySearch}>
            Search
          </button>
          <button className="secondary-btn" onClick={resetSearch}>
            Reset
          </button>
        </div>
      </div>

      <div className="employees-grid">
        <div className="dashboard-panel">
          <div className="panel-head">
            <div>
              <p className="section-kicker">Employee list</p>
              <h3>View Employee</h3>
            </div>
            <span className="pill">{filteredEmployees.length} records</span>
          </div>

          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Department</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="empty-cell">
                      Loading employees...
                    </td>
                  </tr>
                ) : filteredEmployees.length ? (
                  filteredEmployees.map((emp) => (
                    <tr
                      key={emp.id}
                      className={selectedEmployeeId === emp.id ? "row-active" : ""}
                      onClick={() => onSelectEmployee(emp.id)}
                    >
                      <td>{emp.name}</td>
                      <td>{emp.email}</td>
                      <td>{emp.role}</td>
                      <td>{emp.department}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="empty-cell">
                      No employees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dashboard-panel details-card">
          <div className="panel-head">
            <div>
              <p className="section-kicker">Every detail</p>
              <h3>Employee profile</h3>
            </div>
            <span className="pill">
              {selectedEmployee ? `ID #${selectedEmployee.id}` : "No selection"}
            </span>
          </div>

          {selectedEmployee ? (
            <div className="details-stack">
              <div className="summary-box">
                <h4>{selectedEmployee.name}</h4>
                <p>{selectedEmployee.email}</p>
                <div className="tag-row">
                  <span className="tag">{selectedEmployee.role}</span>
                  <span className="tag">{selectedEmployee.department}</span>
                </div>
              </div>

              <div className="info-grid-2">
                <div className="info-card">
                  <span>Contact</span>
                  <strong>{details?.contactNumber || "—"}</strong>
                </div>
                <div className="info-card">
                  <span>Blood Group</span>
                  <strong>{details?.bloodGroup || "—"}</strong>
                </div>
                <div className="info-card">
                  <span>Address</span>
                  <strong>{details?.address || "—"}</strong>
                </div>
                <div className="info-card">
                  <span>City</span>
                  <strong>{details?.city || "—"}</strong>
                </div>
                <div className="info-card">
                  <span>State</span>
                  <strong>{details?.state || "—"}</strong>
                </div>
                <div className="info-card">
                  <span>Pincode</span>
                  <strong>{details?.pincode || "—"}</strong>
                </div>
                <div className="info-card">
                  <span>Aadhaar</span>
                  <strong>{details?.aadhaarNo || "—"}</strong>
                </div>
                <div className="info-card">
                  <span>PAN</span>
                  <strong>{details?.panNo || "—"}</strong>
                </div>
                <div className="info-card">
                  <span>Bank</span>
                  <strong>{details?.bankName || "—"}</strong>
                </div>
                <div className="info-card">
                  <span>Account</span>
                  <strong>{details?.bankAccountNo || "—"}</strong>
                </div>
                <div className="info-card">
                  <span>IFSC</span>
                  <strong>{details?.ifsc || "—"}</strong>
                </div>
                <div className="info-card">
                  <span>Bank Address</span>
                  <strong>{details?.bankAddress || "—"}</strong>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-state large">
              Choose an employee from the table to see full details.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}