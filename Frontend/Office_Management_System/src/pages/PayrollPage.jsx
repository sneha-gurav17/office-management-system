export default function PayrollPage({
  selectedEmployeeId,
  selectedEmployee,
  form,
  setForm,
  onSubmit,
  saving,
  payroll,
  onMarkPaid,
}) {
  return (
    <section className="page-grid">
      <div className="dashboard-panel form-panel">
        <div className="panel-head">
          <div>
            <p className="section-kicker">Payroll</p>
            <h2>Generate salary</h2>
          </div>
          <span className="pill">
            {selectedEmployee ? selectedEmployee.name : "Select employee"}
          </span>
        </div>

        {!selectedEmployeeId && (
          <div className="notice-box">
            Select an employee first, then generate payroll.
          </div>
        )}

        <form className="form-grid two-col" onSubmit={onSubmit}>
          <label className="field">
            <span>Salary</span>
            <input
              className="input"
              type="number"
              value={form.salary}
              onChange={(e) => setForm({ ...form, salary: e.target.value })}
              required
            />
          </label>

          <label className="field">
            <span>Bonus</span>
            <input
              className="input"
              type="number"
              value={form.bonus}
              onChange={(e) => setForm({ ...form, bonus: e.target.value })}
              required
            />
          </label>

          <label className="field">
            <span>Deductions</span>
            <input
              className="input"
              type="number"
              value={form.deductions}
              onChange={(e) => setForm({ ...form, deductions: e.target.value })}
              required
            />
          </label>

          <label className="field">
            <span>Month</span>
            <input
              className="input"
              value={form.month}
              onChange={(e) => setForm({ ...form, month: e.target.value })}
              required
            />
          </label>

          <label className="field">
            <span>Year</span>
            <input
              className="input"
              type="number"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              required
            />
          </label>

          <button className="primary-btn full-width" type="submit" disabled={saving || !selectedEmployeeId}>
            {saving ? "Generating..." : "Generate Payroll"}
          </button>
        </form>
      </div>

      <div className="dashboard-panel payroll-panel">
        <div className="panel-head">
          <div>
            <p className="section-kicker">Payroll cards</p>
            <h3>Monthly salary details</h3>
          </div>
        </div>

        <div className="payroll-list">
          {payroll.length ? (
            payroll.map((row) => (
              <div className="payroll-card" key={row.id}>
                <div className="payroll-head">
                  <div>
                    <p className="payroll-month">
                      {row.month} {row.year}
                    </p>
                    <h4>₹{Number(row.netSalary || 0).toLocaleString("en-IN")}</h4>
                  </div>
                  <span className={`status-pill ${String(row.status || "").toLowerCase()}`}>
                    {row.status}
                  </span>
                </div>

                <div className="payroll-breakdown">
                  <div>
                    <span>Salary</span>
                    <strong>₹{Number(row.salary || 0).toLocaleString("en-IN")}</strong>
                  </div>
                  <div>
                    <span>Bonus</span>
                    <strong>₹{Number(row.bonus || 0).toLocaleString("en-IN")}</strong>
                  </div>
                  <div>
                    <span>Deductions</span>
                    <strong>₹{Number(row.deductions || 0).toLocaleString("en-IN")}</strong>
                  </div>
                </div>

                {row.status !== "PAID" && (
                  <button className="secondary-btn full-width" onClick={() => onMarkPaid(row.id)}>
                    Mark as Paid
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="empty-state">No payroll records yet.</div>
          )}
        </div>
      </div>
    </section>
  );
}