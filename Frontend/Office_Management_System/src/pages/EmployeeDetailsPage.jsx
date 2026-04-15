export default function EmployeeDetailsPage({
  selectedEmployeeId,
  selectedEmployee,
  form,
  setForm,
  onSubmit,
  saving,
}) {
  return (
    <section className="page-grid">
      <div className="dashboard-panel form-panel wide-panel">
        <div className="panel-head">
          <div>
            <p className="section-kicker">Employee Details</p>
            <h2>Personal & bank details</h2>
          </div>
          <span className="pill">
            {selectedEmployee ? selectedEmployee.name : "Select employee"}
          </span>
        </div>

        {!selectedEmployeeId && (
          <div className="notice-box">
            Select an employee first from the employee list, then add details here.
          </div>
        )}

        <form className="form-grid two-col" onSubmit={onSubmit}>
          <div className="section-card">
            <h4>Contact & Address</h4>
            <label className="field">
              <span>Contact Number</span>
              <input
                className="input"
                value={form.contactNumber}
                onChange={(e) =>
                  setForm({ ...form, contactNumber: e.target.value })
                }
                required
              />
            </label>

            <label className="field">
              <span>Blood Group</span>
              <input
                className="input"
                value={form.BloodGroup}
                onChange={(e) => setForm({ ...form, BloodGroup: e.target.value })}
                required
              />
            </label>

            <label className="field">
              <span>Address</span>
              <input
                className="input"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                required
              />
            </label>

            <label className="field">
              <span>City</span>
              <input
                className="input"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                required
              />
            </label>

            <label className="field">
              <span>State</span>
              <input
                className="input"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                required
              />
            </label>

            <label className="field">
              <span>Pincode</span>
              <input
                className="input"
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                required
              />
            </label>
          </div>

          <div className="section-card">
            <h4>Personal & Bank Info</h4>
            <label className="field">
              <span>Aadhaar No</span>
              <input
                className="input"
                value={form.aadhaarNo}
                onChange={(e) => setForm({ ...form, aadhaarNo: e.target.value })}
                required
              />
            </label>

            <label className="field">
              <span>PAN No</span>
              <input
                className="input"
                value={form.panNo}
                onChange={(e) => setForm({ ...form, panNo: e.target.value })}
                required
              />
            </label>

            <label className="field">
              <span>Bank Name</span>
              <input
                className="input"
                value={form.bankName}
                onChange={(e) => setForm({ ...form, bankName: e.target.value })}
                required
              />
            </label>

            <label className="field">
              <span>Bank Account No</span>
              <input
                className="input"
                value={form.bankAccountNo}
                onChange={(e) =>
                  setForm({ ...form, bankAccountNo: e.target.value })
                }
                required
              />
            </label>

            <label className="field">
              <span>IFSC</span>
              <input
                className="input"
                value={form.ifsc}
                onChange={(e) => setForm({ ...form, ifsc: e.target.value })}
                required
              />
            </label>

            <label className="field">
              <span>Bank Address</span>
              <input
                className="input"
                value={form.bankAddress}
                onChange={(e) => setForm({ ...form, bankAddress: e.target.value })}
                required
              />
            </label>

            <button
              className="primary-btn full-width"
              type="submit"
              disabled={saving || !selectedEmployeeId}
            >
              {saving ? "Saving..." : "Save Details"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}