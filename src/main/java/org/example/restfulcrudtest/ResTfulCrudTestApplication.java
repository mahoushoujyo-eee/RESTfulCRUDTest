package org.example.restfulcrudtest;

import org.apache.ibatis.annotations.Mapper;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan
@SpringBootApplication
public class ResTfulCrudTestApplication
{

	public static void main(String[] args)
	{
		SpringApplication.run(ResTfulCrudTestApplication.class, args);
	}

}
