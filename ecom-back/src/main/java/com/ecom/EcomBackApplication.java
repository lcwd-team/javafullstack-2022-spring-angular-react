package com.ecom;

import com.ecom.models.Role;
import com.ecom.repositries.RoleRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class EcomBackApplication implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    public static void main(String[] args) {
        SpringApplication.run(EcomBackApplication.class, args);
    }

    @Bean
    public ModelMapper mapper() {
        return new ModelMapper();
    }

    @Override
    public void run(String... args) throws Exception {


        try {
            Role role1 = new Role();
            role1.setId(5245);
            role1.setName("ROLE_ADMIN");

            Role role2 = new Role();
            role2.setId(7412);
            role2.setName("ROLE_NORMAL");

            Role role3 = new Role();
            role3.setId(9632);
            role3.setName("ROLE_STAFF");

            List<Role> roles = new ArrayList<>();
            roles.add(role1);
            roles.add(role2);
            roles.add(role3);
            roleRepository.saveAll(roles);

        } catch (Exception e) {
            System.out.println("User already there !!");
            e.printStackTrace();
        }

    }
}
