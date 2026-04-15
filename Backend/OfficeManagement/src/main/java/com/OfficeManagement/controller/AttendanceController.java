package com.OfficeManagement.controller;

import com.OfficeManagement.model.Attendance;
import com.OfficeManagement.service.AttendanceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/attendance")
public class AttendanceController {

    private final AttendanceService service;

    public AttendanceController(AttendanceService service) {
        this.service = service;
    }

    // ✅ Manual Attendance Entry
    @PostMapping("/{employeeId}")
    public Attendance addAttendance(@PathVariable Long employeeId,
                                    @RequestBody Attendance attendance) {
        return service.addAttendance(employeeId, attendance);
    }

    // Get employee attendance
    @GetMapping("/employee/{employeeId}")
    public List<Attendance> getByEmployee(@PathVariable Long employeeId) {
        return service.getByEmployee(employeeId);
    }

    // Get all
    @GetMapping
    public List<Attendance> getAll() {
        return service.getAll();
    }
}