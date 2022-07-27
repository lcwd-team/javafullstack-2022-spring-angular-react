package com.ecom;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ImageUploder {

	@Value("${app.profile.path}")
	private String imagePath;
	
	@Value("testingValue")
	private String testingVariable;

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public String getTestingVariable() {
		return testingVariable;
	}

	public void setTestingVariable(String testingVariable) {
		this.testingVariable = testingVariable;
	}
	
	
	
	
	
}
