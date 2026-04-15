package com.OfficeManagement.service;

import com.OfficeManagement.model.Employee;
import com.OfficeManagement.model.Payroll;
import com.OfficeManagement.repository.EmployeeRepository;
import com.OfficeManagement.repository.PayrollRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PayrollService {

    private final PayrollRepository payrollRepo;
    private final EmployeeRepository empRepo;

    public PayrollService(PayrollRepository payrollRepo, EmployeeRepository empRepo) {
        this.payrollRepo = payrollRepo;
        this.empRepo = empRepo;
    }

    // Generate Payroll
    public Payroll generatePayroll(Long employeeId, Payroll payroll) {

        Employee emp = empRepo.findById(employeeId).orElseThrow();

        double netSalary = payroll.getSalary()
                + payroll.getBonus()
                - payroll.getDeductions();

        payroll.setNetSalary(netSalary);
        payroll.setStatus("PENDING");
        payroll.setEmployee(emp);

        return payrollRepo.save(payroll);
    }

    // Get payroll by employee
    public List<Payroll> getPayrollByEmployee(Long employeeId) {
        return payrollRepo.findByEmployeeId(employeeId);
    }

    // Mark as paid
    public Payroll markAsPaid(Long id) {
        Payroll payroll = payrollRepo.findById(id).orElseThrow();
        payroll.setStatus("PAID");
        return payrollRepo.save(payroll);
    }
}
