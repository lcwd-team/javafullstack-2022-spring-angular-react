package com.ecom;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class EcomBackApplicationTests {

	
	@Autowired
	private ImageUploder uploder;
	
	@Test
	void contextLoads() {
	}
	
	@Test
	void testUploader() {
		System.out.println(uploder.getImagePath());
		System.out.println(uploder.getTestingVariable());
	}



}
