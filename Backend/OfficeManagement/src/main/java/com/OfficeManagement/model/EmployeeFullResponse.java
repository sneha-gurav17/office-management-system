package com.OfficeManagement.model;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeFullResponse {

    private Employee employee;
    private EmployeeDetails details;
    private List<Payroll> payroll;
    private List<Attendance> attendance;
}
