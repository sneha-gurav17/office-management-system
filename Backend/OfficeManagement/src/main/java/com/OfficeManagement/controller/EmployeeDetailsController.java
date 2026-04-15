package com.OfficeManagement.controller;

import com.OfficeManagement.model.EmployeeDetails;
import com.OfficeManagement.service.EmployeeDetailsService;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/employee-details")
public class EmployeeDetailsController {

    private final EmployeeDetailsService service;

    public EmployeeDetailsController(EmployeeDetailsService service) {
        this.service = service;
    }

    // Add / Update
    @PostMapping("/{employeeId}")
    public EmployeeDetails save(@PathVariable Long employeeId,
                                @RequestBody EmployeeDetails details) {
        return service.saveDetails(employeeId, details);
    }

    // Get details
    @GetMapping("/{employeeId}")
    public EmployeeDetails get(@PathVariable Long employeeId) {
        return service.getDetails(employeeId);
    }
}
