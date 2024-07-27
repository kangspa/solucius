package com.solucius.solucius.aws;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.solucius.solucius.model.Img;

@Service
public class S3Service {
    @Autowired
    private AmazonS3 s3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.s3.url}")
    private String url;

    public Img upload(MultipartFile file) {

        Img res = new Img();
        String dataTime = new SimpleDateFormat("yyyyMMddHHmmss", Locale.KOREA).format(System.currentTimeMillis());
        String fileName = dataTime + "_"  + file.getOriginalFilename();
        
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(MediaType.IMAGE_PNG_VALUE);
        metadata.setContentLength(file.getSize());

        try {
            s3Client.putObject(new PutObjectRequest(bucket, fileName, file.getInputStream(), metadata));
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        res.setImgUrl(url + fileName);
        res.setImgName(fileName);
        res.setImgSize(file.getSize());
        res.setContentType(file.getContentType());

        return res;
    }
}
