package com.example.Backend.spring_angular.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.Backend.spring_angular.Security.SecParams;
import com.example.Backend.spring_angular.model.Employee;
import com.example.Backend.spring_angular.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:4200") // Allows Angular frontend to access this API
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Get all employees
    @GetMapping("/getall")
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    // Get employee by ID
    @GetMapping("get/{id}")
    public Optional<Employee> getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id);
    }

    // Register a new employee
    @PostMapping("/register")
    public Map<String, String> registerEmployee(@RequestBody Employee employee) {
        Map<String, String> response = new HashMap<>();

        if (employeeService.findByEmail(employee.getEmail()).isPresent()) {
            response.put("message", "Email is already registered");
            return response;
        }

        // Hash the password and save the employee
        employee.setPassword(passwordEncoder.encode(employee.getPassword()));
        employeeService.createEmployee(employee);
        response.put("message", "Registration successful");
        return response;
    }

    // Login employee
    @PostMapping("/login")
    public Map<String, Object> loginEmployee(@RequestBody Map<String, String> loginDetails) {
        Map<String, Object> response = new HashMap<>();
        String email = loginDetails.get("email");
        String password = loginDetails.get("password");

        Optional<Employee> employeeOpt = employeeService.findByEmail(email);

        if (employeeOpt.isEmpty()) {
            response.put("error", "Invalid email or password");
            return response;
        }

        Employee employee = employeeOpt.get();

        // Verify the password
        if (!passwordEncoder.matches(password, employee.getPassword())) {
            response.put("error", "Invalid email or password");
            return response;
        }

        // Generate JWT Token
        String token = JWT.create()
                .withSubject(employee.getEmail())
                .withExpiresAt(new Date(System.currentTimeMillis() + SecParams.EXP_TIME))
//                .withClaim("roles", List.of(employee.getRole()))
//                .withClaim("id", employee.getId())  // Add employee ID
//                .withClaim("email", employee.getEmail())  // Add email
//                .withClaim("name", employee.getName())  // Add name
//                .withClaim("lastname", employee.getLastname())  // Add last name
//                .withClaim("phone", employee.getPhone())  // Add phone
//                .withClaim("gender", employee.getGender())  // Add gender
                .withClaim("role", employee.getRole())  // Add role
//                .withClaim("job", employee.getJob())  // Add job
//                .withClaim("leaveType", employee.getLeave_type())  // Add leave type
//                .withClaim("leaveStart", employee.getLeave_start() != null ? employee.getLeave_start().toString() : null)  // Add leave start date
//                .withClaim("leaveEnd", employee.getLeave_end() != null ? employee.getLeave_end().toString() : null)  // Add leave end date
//                .withClaim("leaveDecision", employee.getLeave_decision())  // Add leave decision
                .sign(Algorithm.HMAC256(SecParams.SECRET));

        response.put("message", "Login successful");
        response.put("token", token);
//        response.put("employee", employee); // Return employee details if needed
        return response;
    }

    // Update an employee
    @PutMapping("update/{id}")
    public Employee updateEmployee(@PathVariable Long id, @RequestBody Employee updatedEmployee) {
        // Hash the password if it's updated
        if (updatedEmployee.getPassword() != null && !updatedEmployee.getPassword().isEmpty()) {
            updatedEmployee.setPassword(passwordEncoder.encode(updatedEmployee.getPassword()));
        }
        return employeeService.updateEmployee(id, updatedEmployee);
    }

    // Delete an employee
    @DeleteMapping("delete/{id}")
    public void deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
    }

    // Get employee by email (for login or other purposes)
    @GetMapping("/email/{email}")
    public Optional<Employee> getEmployeeByEmail(@PathVariable String email) {
        return employeeService.findByEmail(email);
    }
}
