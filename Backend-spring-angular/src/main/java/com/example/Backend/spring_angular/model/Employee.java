package com.example.Backend.spring_angular.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "employees")
@Getter  // Lombok generates all getters
@Setter  // Lombok generates all setters
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String lastname;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String gender;

    @Column(nullable = false)
    private String role = "employee";

    @Column(nullable = false)
    private String job;

    @Column
    private String leave_type;

    @Column
    private Date leave_start;

    @Column
    private Date leave_end;

    @Column
    private String leave_decision;
}
