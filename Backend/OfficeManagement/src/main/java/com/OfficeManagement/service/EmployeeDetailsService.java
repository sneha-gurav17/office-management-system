package com.OfficeManagement.service;

import com.OfficeManagement.model.Employee;
import com.OfficeManagement.model.EmployeeDetails;
import com.OfficeManagement.repository.EmployeeDetailsRepository;
import com.OfficeManagement.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmployeeDetailsService {

    private final EmployeeDetailsRepository detailsRepo;
    private final EmployeeRepository empRepo;

    public EmployeeDetailsService(EmployeeDetailsRepository detailsRepo, EmployeeRepository empRepo) {
        this.detailsRepo = detailsRepo;
        this.empRepo = empRepo;
    }
    private String maskAadhaar(String aadhaar) {
        if (aadhaar == null || aadhaar.length() < 4) return aadhaar;

        String last4 = aadhaar.substring(aadhaar.length() - 4);
        return "XXXXXXXX" + last4;
    }

    // Add or update details
    public EmployeeDetails saveDetails(Long employeeId, EmployeeDetails details) {

        Employee emp = empRepo.findById(employeeId).orElseThrow();

        Optional<EmployeeDetails> existing = detailsRepo.findByEmployeeId(employeeId);

        if (existing.isPresent()) {
            throw new RuntimeException("Details already exist for this employee");
        }

        EmployeeDetails data = new EmployeeDetails();

        // Contact Number
        data.setContactNumber(details.getContactNumber());
        data.setBloodGroup(details.getBloodGroup());

        // Address details
        data.setAddress(details.getAddress());
        data.setCity(details.getCity());
        data.setState(details.getState());
        data.setPincode(details.getPincode());

        // Personal details
        data.setAadhaarNo(details.getAadhaarNo());
        data.setPanNo(details.getPanNo());

        // Bank details
        data.setBankName(details.getBankName());
        data.setBankAccountNo(details.getBankAccountNo());
        data.setIfsc(details.getIfsc());
        data.setBankAddress(details.getBankAddress());

        data.setEmployee(emp);

        return detailsRepo.save(data);
    }

    // Get details
    public EmployeeDetails getDetails(Long employeeId) {

        EmployeeDetails details = detailsRepo.findByEmployeeId(employeeId).orElseThrow();

        // Mask Aadhaar
        details.setAadhaarNo(maskAadhaar(details.getAadhaarNo()));

        return details;
    }
}