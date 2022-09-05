package com.ecom.controllers;

import java.io.*;
import java.util.List;
import java.util.Map;

import com.ecom.services.FileUpload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;

import com.ecom.config.AppConstants;
import com.ecom.payload.ApiResonse;
import com.ecom.payload.ProductDto;
import com.ecom.payload.ProductResponse;
import com.ecom.services.ProductService;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/")

public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private FileUpload fileUpload;

    @Value("${product.images.path}")
    private String imagePath;


    //upload the file for product image

    @PostMapping("/products/images/{productId}")
    public ResponseEntity<?> uploadImageOfProduct(
            @PathVariable int productId,
            @RequestParam("product_image") MultipartFile file
    ) {

        ProductDto product = this.productService.getProduct(productId);
        String imageName = null;
        try {
            imageName = this.fileUpload.uploadFile(imagePath, file);
            product.setImageName(imageName);
            ProductDto productDto = this.productService.updateProduct(product, productId);
            return new ResponseEntity<>(productDto, HttpStatus.OK);

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(Map.of("message", "File not uploaded on server !!"), HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    //get the image of given product
    @GetMapping("/products/images/{productId}")
    public void downloadImage(@PathVariable int productId, HttpServletResponse response) throws IOException {
        ProductDto product = this.productService.getProduct(productId);
        String imageName = product.getImageName();
        String fullPath = imagePath + File.separator + imageName;
        InputStream resource = this.fileUpload.getResource(fullPath);
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        OutputStream outputStream = response.getOutputStream();
        StreamUtils.copy(resource, outputStream);

    }


    // localhost:8081/products

    // For creating new Product
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/categories/{categoryId}/products")
    public ResponseEntity<ProductDto> createProduct(@RequestBody ProductDto product, @PathVariable int categoryId) {
        ProductDto createdProduct = productService.createProduct(product, categoryId);
        System.out.println("product created");
        return new ResponseEntity<ProductDto>(createdProduct, HttpStatus.CREATED);

    }

    // update
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/products/{productId}")
    public ProductDto updateProduct(@PathVariable("productId") int pid, @RequestBody ProductDto newProduct) {
        ProductDto updatedProduct = productService.updateProduct(newProduct, pid);
        return updatedProduct;

    }

    // delete
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/products/{productId}")
    public ResponseEntity<ApiResonse> deleteProduct(@PathVariable int productId) {
        productService.deleteProduct(productId);
        return new ResponseEntity<ApiResonse>(new ApiResonse("Product Delete successfully !!", false), HttpStatus.OK);
    }

    // get
    @GetMapping("/products/{productId}")
    public ProductDto getProduct(@PathVariable int productId) {
        ProductDto product = productService.getProduct(productId);
        return product;
    }

    // category wise get product
    @GetMapping("/categories/{categoryId}/products")
    public ResponseEntity<ProductResponse> getProductsOfCategory(@PathVariable int categoryId,
                                                                 @RequestParam(value = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER_STRING, required = false) int pageNumber,
                                                                 @RequestParam(value = "pageSize", defaultValue = AppConstants.PAGE_SIZE_STRING, required = false) int pageSize) {
        ProductResponse listOfProducts = productService.getProductsByCategory(categoryId, pageNumber, pageSize);
        return new ResponseEntity<ProductResponse>(listOfProducts, HttpStatus.CREATED);

    }

    /**
     * @param
     * @return List of product
     * @author DurgeshPC
     * @since 1.0
     */
    // getting all products
    @GetMapping("/products")
    public ProductResponse listAllProducts(
            @RequestParam(value = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER_STRING, required = false) int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = AppConstants.PAGE_SIZE_STRING, required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = AppConstants.SORT_BY_STRING, required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = AppConstants.SORT_DIR_STRING, required = false) String sortDir

    ) {
        ProductResponse response = productService.getAllProducts(pageNumber, pageSize, sortBy, sortDir);
        return response;
    }


}
