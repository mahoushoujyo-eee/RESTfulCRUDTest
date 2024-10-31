package org.example.restfulcrudtest.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.example.restfulcrudtest.bean.Employee;
import org.example.restfulcrudtest.mapper.EmployeeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class EmployeeService
{
    private final EmployeeMapper employeeMapper;
    private static final Logger Logger = LogManager.getLogger(EmployeeService.class);

    @Autowired
    public EmployeeService(EmployeeMapper employeeMapper)
    {
        this.employeeMapper = employeeMapper;
    }

    public void insertEmployee(Employee employee)
    {
        employeeMapper.insertEmp(employee);
    }

    public List<Employee> initialize()
    {
        return employeeMapper.getAllEmployees();
    }

    public void deleteEmpById(Integer id)
    {
        System.out.println("Delete employee with id: " + id);
        employeeMapper.deleteEmpById(id);
    }

    public List<Employee> queryByNameApproximately(String name)
    {
        List<Employee> result = employeeMapper.queryByNameApproximately(name);
        return result;
    }

    public List<Employee> queryBySalary(String salaryInformation)
    {
        int splitLocation = 0;
        for (int i = 0; i < salaryInformation.length(); i++)
        {
            if (!(salaryInformation.charAt(i) <= '9' && salaryInformation.charAt(i) >= '0'))
            {
                splitLocation++;
            }
            else
                break;
        }
        String operator = salaryInformation.substring(0, splitLocation);
        String salaryString = salaryInformation.substring(splitLocation);
        BigDecimal salary = BigDecimal.valueOf(Double.parseDouble(salaryString));
        if (operator.equals("<"))
            return employeeMapper.queryByLowerSalary(salary);
        else if (operator.equals(">"))
            return employeeMapper.queryByHigherSalary(salary);
        else if (operator.equals("<="))
            return employeeMapper.queryByLowerAndEqualSalary(salary);
        else if (operator.equals(">="))
            return employeeMapper.queryByHigherAndEqualSalary(salary);
        else if (operator.equals("="))
            return employeeMapper.queryBySalary(salary);
        return null;
    }

    public List<Employee> queryByNameAndSalary(String name, String salaryInformation)
    {
        int splitPoint = 0;
        for (int i = 0; i < salaryInformation.length(); i++)
        {
            if (!(salaryInformation.charAt(i) <= '9' && salaryInformation.charAt(i) >= '0'))
            {
                splitPoint = i;
            }
            else
                break;
        }
        String operator = salaryInformation.substring(0, splitPoint);
        String salaryString = salaryInformation.substring(splitPoint);
        BigDecimal salary = BigDecimal.valueOf(Double.parseDouble(salaryString));
        if (operator.equals("<"))
            return employeeMapper.queryByLowerSalaryAndName(salary, name);
        else if (operator.equals(">"))
            return employeeMapper.queryByHigherSalaryAndName(salary, name);
        else if (operator.equals("<="))
            return employeeMapper.queryByLowerAndEqualSalaryAndName(salary, name);
        else if (operator.equals(">="))
            return employeeMapper.queryByHigherAndEqualSalaryAndName(salary, name);
        else if (operator.equals("="))
            return employeeMapper.queryBySalaryAndName(salary, name);
        return null;
    }

    public void updateEmp(Employee employee)
    {
        employeeMapper.updateEmp(employee);
    }
}
