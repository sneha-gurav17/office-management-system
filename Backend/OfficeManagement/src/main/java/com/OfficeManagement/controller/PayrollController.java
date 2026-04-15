package com.OfficeManagement.controller;

import com.OfficeManagement.model.Payroll;
import com.OfficeManagement.service.PayrollService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/payroll")
public class PayrollController {

    private final PayrollService service;

    public PayrollController(PayrollService service) {
        this.service = service;
    }

    // Generate payroll
    @PostMapping("/generate/{employeeId}")
    public Payroll generate(@PathVariable Long employeeId,
                              @RequestBody Payroll payroll) {
        return service.generatePayroll(employeeId, payroll);
    }

    // Get payroll by employee
    @GetMapping("/employee/{employeeId}")
    public List<Payroll> getPayroll(@PathVariable Long employeeId) {
        return service.getPayrollByEmployee(employeeId);
    }

    // Mark salary as paid
    @PatchMapping("/{id}/paid")
    public Payroll markPaid(@PathVariable Long id) {
        return service.markAsPaid(id);
    }
}
