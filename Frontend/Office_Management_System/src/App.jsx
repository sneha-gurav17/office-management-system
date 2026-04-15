import { useEffect, useMemo, useState } from "react";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import EmployeesPage from "./pages/EmployeesPage";
import AddEmployeePage from "./pages/AddEmployeePage";
import EmployeeDetailsPage from "./pages/EmployeeDetailsPage";
import AttendancePage from "./pages/AttendancePage";
import PayrollPage from "./pages/PayrollPage";
import { api } from "./api/client";

const initialEmployee = {
  name: "",
  email: "",
  role: "",
  department: "",
};

const initialDetails = {
  contactNumber: "",
  BloodGroup: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  aadhaarNo: "",
  panNo: "",
  bankAccountNo: "",
  ifsc: "",
  bankAddress: "",
  bankName: "",
};

const initialAttendance = {
  date: "",
  checkIn: "",
  checkOut: "",
};

const initialPayroll = {
  salary: "",
  bonus: "",
  deductions: "",
  month: "April",
  year: new Date().getFullYear(),
};

const pageMeta = {
  dashboard: {
    title: "Dashboard",
    
  },
  employees: {
    title: "View Employee",
    
  },
  "add-employee": {
    title: "Add Employee",
    subtitle: "Add a new employee record.",
  },
  details: {
    title: "Employee Details",
    subtitle: "Store personal & bank details.",
  },
  attendance: {
    title: "Attendance",
    
  },
  payroll: {
    title: "Payroll",
    subtitle: "Generate salary & mark paid.",
  },
};

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [fullData, setFullData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [employeeForm, setEmployeeForm] = useState(initialEmployee);
  const [detailsForm, setDetailsForm] = useState(initialDetails);
  const [attendanceForm, setAttendanceForm] = useState(initialAttendance);
  const [payrollForm, setPayrollForm] = useState(initialPayroll);

  const [searchInput, setSearchInput] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  const selectedEmployee =
    fullData?.employee ||
    employees.find((e) => e.id === selectedEmployeeId) ||
    null;

  const details = fullData?.details || null;
  const payroll = fullData?.payroll || [];
  const attendance = fullData?.attendance || [];

  const filteredEmployees = useMemo(() => {
    const q = appliedSearch.trim().toLowerCase();
    if (!q) return employees;

    return employees.filter((emp) =>
      [emp.name, emp.email, emp.role, emp.department]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(q))
    );
  }, [employees, appliedSearch]);

  // ✅ FETCH EMPLOYEES
  async function fetchEmployees() {
    setLoading(true);
    try {
      const data = await api("/employees");
      setEmployees(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // ✅ FETCH FULL DATA
  async function fetchFullEmployee(id) {
    if (!id) return;

    setLoading(true);
    try {
      const data = await api(`/employees/full/${id}`);
      setFullData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (selectedEmployeeId) {
      fetchFullEmployee(selectedEmployeeId);
    }
  }, [selectedEmployeeId]);

  function notify(msg) {
    setMessage(msg);
    setError("");
    setTimeout(() => setMessage(""), 2500);
  }

  function fail(err) {
    setError(err.message);
    setMessage("");
  }

  // ✅ ADD EMPLOYEE
  async function addEmployee(e) {
    e.preventDefault();
    setSaving(true);

    try {
      const saved = await api("/employees", {
        method: "POST",
        body: JSON.stringify(employeeForm),
      });

      setEmployeeForm(initialEmployee);
      await fetchEmployees();

      if (saved?.id) setSelectedEmployeeId(saved.id);

      setActivePage("details");
      notify("Employee created");
    } catch (err) {
      fail(err);
    } finally {
      setSaving(false);
    }
  }

  // ✅ SAVE DETAILS
  async function saveDetails(e) {
    e.preventDefault();

    if (!selectedEmployeeId)
      return fail(new Error("Select employee first"));

    setSaving(true);

    try {
      await api(`/employee-details/${selectedEmployeeId}`, {
        method: "POST",
        body: JSON.stringify(detailsForm),
      });

      setDetailsForm(initialDetails);
      await fetchFullEmployee(selectedEmployeeId);

      notify("Details saved");
    } catch (err) {
      fail(err);
    } finally {
      setSaving(false);
    }
  }

  // 🔥 🔥 ATTENDANCE FIX HERE
  function formatDate(date) {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  }

  async function saveAttendance(e) {
    e.preventDefault();

    if (!selectedEmployeeId)
      return fail(new Error("Select employee first"));

    setSaving(true);

    try {
      await api(`/attendance/${selectedEmployeeId}`, {
        method: "POST",
        body: JSON.stringify({
          ...attendanceForm,
          date: formatDate(attendanceForm.date), // ✅ FIX
        }),
      });

      setAttendanceForm(initialAttendance);
      await fetchFullEmployee(selectedEmployeeId);

      notify("Attendance saved");
    } catch (err) {
      fail(err);
    } finally {
      setSaving(false);
    }
  }

  // ✅ PAYROLL
  async function generatePayroll(e) {
    e.preventDefault();

    if (!selectedEmployeeId)
      return fail(new Error("Select employee first"));

    setSaving(true);

    try {
      await api(`/payroll/generate/${selectedEmployeeId}`, {
        method: "POST",
        body: JSON.stringify({
          salary: Number(payrollForm.salary),
          bonus: Number(payrollForm.bonus),
          deductions: Number(payrollForm.deductions),
          month: payrollForm.month,
          year: Number(payrollForm.year),
        }),
      });

      setPayrollForm(initialPayroll);
      await fetchFullEmployee(selectedEmployeeId);

      notify("Payroll generated");
    } catch (err) {
      fail(err);
    } finally {
      setSaving(false);
    }
  }

  async function markPaid(id) {
    try {
      await api(`/payroll/${id}/paid`, { method: "PATCH" });
      await fetchFullEmployee(selectedEmployeeId);
      notify("Marked as paid");
    } catch (err) {
      fail(err);
    }
  }

  // ✅ PAGE ROUTING
  function renderPage() {
    if (activePage === "employees") {
      return (
        <EmployeesPage
          employees={filteredEmployees}
          selectedEmployeeId={selectedEmployeeId}
          onSelectEmployee={setSelectedEmployeeId}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          applySearch={() => setAppliedSearch(searchInput)}
          resetSearch={() => {
            setSearchInput("");
            setAppliedSearch("");
          }}
          selectedEmployee={selectedEmployee}
          details={details}
          loading={loading}
        />
      );
    }

    if (activePage === "add-employee") {
      return (
        <AddEmployeePage
          form={employeeForm}
          setForm={setEmployeeForm}
          onSubmit={addEmployee}
          saving={saving}
        />
      );
    }

    if (activePage === "details") {
      return (
        <EmployeeDetailsPage
          selectedEmployeeId={selectedEmployeeId}
          selectedEmployee={selectedEmployee}
          form={detailsForm}
          setForm={setDetailsForm}
          onSubmit={saveDetails}
          saving={saving}
        />
      );
    }

    if (activePage === "attendance") {
      return (
        <AttendancePage
          selectedEmployeeId={selectedEmployeeId}
          selectedEmployee={selectedEmployee}
          form={attendanceForm}
          setForm={setAttendanceForm}
          onSubmit={saveAttendance}
          saving={saving}
          attendance={attendance}
        />
      );
    }

    if (activePage === "payroll") {
      return (
        <PayrollPage
          selectedEmployeeId={selectedEmployeeId}
          selectedEmployee={selectedEmployee}
          form={payrollForm}
          setForm={setPayrollForm}
          onSubmit={generatePayroll}
          saving={saving}
          payroll={payroll}
          onMarkPaid={markPaid}
        />
      );
    }

    return (
      <DashboardPage
        employees={employees}
        attendance={attendance}
        payroll={payroll}
        selectedEmployee={selectedEmployee}
        details={details}
        setActivePage={setActivePage}
      />
    );
  }

  return (
    <Layout
      activePage={activePage}
      setActivePage={setActivePage}
      pageTitle={pageMeta[activePage].title}
      pageSubtitle={pageMeta[activePage].subtitle}
      selectedEmployee={selectedEmployee}
    >
      {(message || error) && (
        <div className={error ? "alert error" : "alert success"}>
          {error || message}
        </div>
      )}

      {loading && <div className="alert info">Loading...</div>}

      {renderPage()}
    </Layout>
  );
}