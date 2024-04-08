package com.example.back.exception;

/**
 * 이미지 업로드 크기가 1MB 보다 클때
 */
public class ImageUploadException extends RuntimeException{
    public ImageUploadException(String message, Throwable cause) {
        super(message, cause);
    }
}
