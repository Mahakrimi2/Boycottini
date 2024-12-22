package com.BoycottApp.BoycottApp.controllers;

import com.BoycottApp.BoycottApp.Services.ImageCategoryService;
import com.BoycottApp.BoycottApp.Services.ImageProductService;
import com.BoycottApp.BoycottApp.entities.ImageCategory;
import com.BoycottApp.BoycottApp.entities.ImageProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/imageProduct")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ImageProductController {

    @Autowired
    ImageProductService imageProductService;

    @PostMapping("/upload/{idProduct}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> uploadImage(@RequestParam("imageFile") MultipartFile file, @PathVariable Long idProduct) throws IOException {
        return imageProductService.uploadImage(file,idProduct);

    }

    @GetMapping("/get/{idProduct}")
    public ResponseEntity<ImageProduct> getImageByUseId(@PathVariable Long idProduct){
        return imageProductService.getImageByProductyId(idProduct);
    }

    @PutMapping("/update/{idProduct}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> updateImage(@RequestParam("imageFile")MultipartFile file,@PathVariable Long idProduct) throws IOException {
        return imageProductService.updateImage(file,idProduct);
    }

    @DeleteMapping("/delete/{idProduct}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteImage(@PathVariable Long idProduct){
        return imageProductService.deleteImage(idProduct);
    }
}
