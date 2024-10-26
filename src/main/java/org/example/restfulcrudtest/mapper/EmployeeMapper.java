package org.example.restfulcrudtest.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.example.restfulcrudtest.bean.Employee;

import java.math.BigDecimal;
import java.util.List;

@Mapper
public interface EmployeeMapper
{
    Employee getEmpById(Integer id);
    Employee getEmpByName(String name);
    List<Employee> getAllEmployees();

    void insertEmp(Employee employee);

    void updateEmp(Employee employee);

    void deleteEmpById(Integer id);

    Integer getLatestId();

    List<Employee> queryByNameApproximately(String name);

    List<Employee> queryByHigherSalary(BigDecimal salary);
    List<Employee> queryByLowerSalary(BigDecimal salary);
    List<Employee> queryBySalary(BigDecimal salary);
    List<Employee> queryByHigherAndEqualSalary(BigDecimal salary);
    List<Employee> queryByLowerAndEqualSalary(BigDecimal salary);

    List<Employee> queryByHigherSalaryAndName(BigDecimal salary, String name);
    List<Employee> queryByLowerSalaryAndName(BigDecimal salary, String name);
    List<Employee> queryBySalaryAndName(BigDecimal salary, String name);
    List<Employee> queryByHigherAndEqualSalaryAndName(BigDecimal salary, String name);
    List<Employee> queryByLowerAndEqualSalaryAndName(BigDecimal salary, String name);
}
