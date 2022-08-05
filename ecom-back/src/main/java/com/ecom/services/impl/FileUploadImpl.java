package com.ecom.services.impl;

import com.ecom.services.FileUpload;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileUploadImpl implements FileUpload {


    @Override
    public String uploadFile(String path, MultipartFile file) throws IOException {

        //get original name of file
//        abc.png
//        sdgsdfgsadfasdfg.png
        String originalFilename = file.getOriginalFilename();
        //generate new name for product image
        String randomNameId = UUID.randomUUID().toString();
        String randomNameWithExtension = randomNameId.concat(originalFilename.substring(originalFilename.lastIndexOf(".")));
        String fullPath = path + File.separator + randomNameWithExtension;
        File folderFile = new File(path);

        if (!folderFile.exists()) {
            folderFile.mkdirs();
        }
        Files.copy(file.getInputStream(), Paths.get(fullPath));
        return randomNameWithExtension;
    }

    @Override
    public InputStream getResource(String path) throws FileNotFoundException {
        InputStream is=new FileInputStream(path);
        return is;
    }

    @Override
    public void deleteFile(String path) {

    }
}
