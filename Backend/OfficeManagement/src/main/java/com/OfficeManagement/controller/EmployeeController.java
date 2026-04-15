package com.OfficeManagement.controller;

import com.OfficeManagement.model.Employee;
import com.OfficeManagement.model.EmployeeFullResponse;
import com.OfficeManagement.service.EmployeeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/employees")
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(EmployeeService service) {
        this.service = service;
    }
    @GetMapping("/search")
    public List<Employee> search(@RequestParam String name) {
        return service.searchByName(name);
    }
    // Add Employee
    @PostMapping
    public Employee add(@RequestBody Employee emp) {
        return service.addEmployee(emp);
    }

    // Get All Employees
    @GetMapping
    public List<Employee> getAll() {
        return service.getAll();
    }

    // Update Employee
    @PutMapping("/{id}")
    public Employee update(@PathVariable Long id, @RequestBody Employee emp) {
        return service.update(id, emp);
    }

    // Delete Employee
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Deleted Successfully";
    }

    // ✅ FULL DETAILS API
    @GetMapping("/full/{id}")
    public EmployeeFullResponse getFull(@PathVariable Long id) {
        return service.getFullDetails(id);
    }
}