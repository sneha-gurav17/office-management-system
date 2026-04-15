export default function AttendancePage({
  selectedEmployeeId,
  selectedEmployee,
  form,
  setForm,
  onSubmit,
  saving,
  attendance,
}) {
  return (
    <section className="page-grid">
      <div className="dashboard-panel form-panel">
        <div className="panel-head">
          <div>
            <p className="section-kicker">Attendance</p>
            <h2>Manual attendance entry</h2>
          </div>
          <span className="pill">
            {selectedEmployee ? selectedEmployee.name : "Select employee"}
          </span>
        </div>

        {!selectedEmployeeId && (
          <div className="notice-box">
            Select an employee first, then enter the attendance date and time.
          </div>
        )}

        <form className="form-grid two-col" onSubmit={onSubmit}>
          <label className="field">
            <span>Date</span>
            <input
              className="input"
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
              required
            />
          </label>

          <label className="field">
            <span>Check In</span>
            <input
              className="input"
              type="time"
              value={form.checkIn}
              onChange={(e) =>
                setForm({ ...form, checkIn: e.target.value })
              }
              required
            />
          </label>

          <label className="field">
            <span>Check Out</span>
            <input
              className="input"
              type="time"
              value={form.checkOut}
              onChange={(e) =>
                setForm({ ...form, checkOut: e.target.value })
              }
              required
            />
          </label>

          <button
            className="primary-btn full-width"
            type="submit"
            disabled={saving || !selectedEmployeeId}
          >
            {saving ? "Saving..." : "Save Attendance"}
          </button>
        </form>
      </div>

      {/* TABLE */}
      <div className="dashboard-panel table-panel">
        <div className="panel-head">
          <div>
            <p className="section-kicker">Attendance records</p>
            <h3>Employee attendance</h3>
          </div>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Hours</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {attendance.length ? (
                attendance.map((row) => (
                  <tr key={row.id}>
                    
                    {/* ✅ FORMAT DATE */}
                    <td>
                      {row.date
                        ? row.date.split("-").reverse().join("-")
                        : "—"}
                    </td>

                    <td>{row.checkIn || "—"}</td>
                    <td>{row.checkOut || "—"}</td>
                    <td>{row.totalHours ?? "—"}</td>

                    <td>
                      <span
                        className={`status-pill ${String(
                          row.status || ""
                        ).toLowerCase()}`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-cell">
                    No attendance records yet.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </section>
  );
}