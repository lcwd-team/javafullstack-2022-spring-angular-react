package com.ecom.services;

import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

public interface FileUpload {

    //create a file on server at given
    String uploadFile(String path, MultipartFile file) throws IOException;

    //get the resource
    InputStream getResource(String path) throws FileNotFoundException;

    //delete file
    void deleteFile(String path);


}
