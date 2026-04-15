package com.OfficeManagement.model;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Payroll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double salary;
    private double bonus;
    private double deductions;
    private double netSalary;

    private String month;
    private int year;

    private String status; // PAID / PENDING

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;
}
