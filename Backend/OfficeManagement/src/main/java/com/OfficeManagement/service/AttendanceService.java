package com.OfficeManagement.service;

import com.OfficeManagement.model.Attendance;
import com.OfficeManagement.model.Employee;
import com.OfficeManagement.repository.AttendanceRepository;
import com.OfficeManagement.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepo;
    private final EmployeeRepository empRepo;

    public AttendanceService(AttendanceRepository attendanceRepo, EmployeeRepository empRepo) {
        this.attendanceRepo = attendanceRepo;
        this.empRepo = empRepo;
    }

    // ✅ Manual Entry (FULL ATTENDANCE)
    public Attendance addAttendance(Long employeeId, Attendance attendance) {

        Employee emp = empRepo.findById(employeeId).orElseThrow();

        attendance.setEmployee(emp);

        // calculate hours
        if (attendance.getCheckIn() != null && attendance.getCheckOut() != null) {
            double hours = Duration.between(
                    attendance.getCheckIn(),
                    attendance.getCheckOut()
            ).toMinutes() / 60.0;

            attendance.setTotalHours(hours);

            if (hours < 4) {
                attendance.setStatus("HALF_DAY");
            } else {
                attendance.setStatus("PRESENT");
            }
        }

        return attendanceRepo.save(attendance);
    }

    // Get by employee
    public List<Attendance> getByEmployee(Long employeeId) {
        return attendanceRepo.findByEmployeeId(employeeId);
    }

    // Get all
    public List<Attendance> getAll() {
        return attendanceRepo.findAll();
    }
}