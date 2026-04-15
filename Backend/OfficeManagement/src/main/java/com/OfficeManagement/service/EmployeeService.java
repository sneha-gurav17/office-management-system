package com.OfficeManagement.service;

import com.OfficeManagement.model.*;
import com.OfficeManagement.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository repo;
    private final EmployeeDetailsRepository detailsRepo;
    private final PayrollRepository payrollRepo;
    private final AttendanceRepository attendanceRepo;

    public EmployeeService(EmployeeRepository repo,
                           EmployeeDetailsRepository detailsRepo,
                           PayrollRepository payrollRepo,
                           AttendanceRepository attendanceRepo) {
        this.repo = repo;
        this.detailsRepo = detailsRepo;
        this.payrollRepo = payrollRepo;
        this.attendanceRepo = attendanceRepo;
    }


    // Add Employee
    public Employee addEmployee(Employee emp) {
        return repo.save(emp);
    }

    // Get All Employees
    public List<Employee> getAll() {
        return repo.findAll();
    }

    // Update Employee
    public Employee update(Long id, Employee emp) {
        Employee e = repo.findById(id).orElseThrow();
        e.setName(emp.getName());
        e.setEmail(emp.getEmail());
        e.setRole(emp.getRole());
        e.setDepartment(emp.getDepartment());
        return repo.save(e);
    }

    // Masking Aadhar No, Pan No, Bank Acc No
    private String maskAadhaar(String aadhaar) {
        if (aadhaar == null || aadhaar.length() < 4) return aadhaar;

        return "XXXXXXXX" + aadhaar.substring(aadhaar.length() - 4);
    }
    private String maskPan(String pan) {
        if (pan == null || pan.length() < 4) return pan;
        return "XXXXX" + pan.substring(pan.length() - 4);
    }

    private String maskBank(String acc) {
        if (acc == null || acc.length() < 4) return acc;
        return "XXXXXX" + acc.substring(acc.length() - 4);
    }

    // Search employee
    public List<Employee> searchByName(String name) {
        return repo.findByNameContainingIgnoreCase(name);
    }


    // Delete Employee
    public void delete(Long id) {
        repo.deleteById(id);
    }

    // ✅ FULL DETAILS API LOGIC
    public EmployeeFullResponse getFullDetails(Long id) {

        Employee emp = repo.findById(id).orElseThrow();

        EmployeeDetails details = detailsRepo.findByEmployeeId(id).orElse(null);

        if (details != null) {
            details.setAadhaarNo(maskAadhaar(details.getAadhaarNo()));
            details.setPanNo(maskPan(details.getPanNo()));
            details.setBankAccountNo(maskBank(details.getBankAccountNo()));
        }


        List<Payroll> payroll = payrollRepo.findByEmployeeId(id);

        List<Attendance> attendance = attendanceRepo.findByEmployeeId(id);

        return new EmployeeFullResponse(emp, details, payroll, attendance);
    }
}