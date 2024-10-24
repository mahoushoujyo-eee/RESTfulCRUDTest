package org.example.restfulcrudtest.bean;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Data
@Component
public class Employee
{
    private Integer id;
    private String name;
    private Integer age;
    private BigDecimal salary;
}
