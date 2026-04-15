package com.OfficeManagement.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate date;
    private LocalTime checkIn;
    private LocalTime checkOut;
    private double totalHours;

    private String status; // PRESENT / ABSENT / HALF_DAY

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;
}