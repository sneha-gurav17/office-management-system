package com.OfficeManagement.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String contactNumber;

    private String BloodGroup;
    private String address;
    private String city;
    private String state;
    private String pincode;

    @Column(unique = true)
    private String aadhaarNo;
    @Column(unique = true)
    private String panNo;
    @Column(unique = true)
    private String bankAccountNo;
    private String ifsc;
    private String bankAddress;
    private String bankName;

    @OneToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;
}
