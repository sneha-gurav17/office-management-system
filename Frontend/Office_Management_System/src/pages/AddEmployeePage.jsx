export default function AddEmployeePage({ form, setForm, onSubmit, saving }) {
  return (
    <section className="page-grid">
      <div className="dashboard-panel form-panel">
        <div className="panel-head">
          <div>
            <p className="section-kicker">Add Employee</p>
            <h2>Create new employee</h2>
          </div>
        </div>

        <form className="form-grid two-col" onSubmit={onSubmit}>
          <label className="field">
            <span>Name</span>
            <input
              className="input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </label>

          <label className="field">
            <span>Email</span>
            <input
              className="input"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </label>

          <label className="field">
            <span>Role</span>
            <input
              className="input"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              required
            />
          </label>

          <label className="field">
            <span>Department</span>
            <input
              className="input"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              required
            />
          </label>

          <button className="primary-btn full-width" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Create Employee"}
          </button>
        </form>
      </div>

      <div className="dashboard-panel tip-panel">
        <p className="section-kicker">Tip</p>
        <h3>Clean employee entry page</h3>
        
      </div>
    </section>
  );
}
