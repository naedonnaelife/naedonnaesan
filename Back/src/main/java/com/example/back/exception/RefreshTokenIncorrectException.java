package com.example.back.exception;

public class RefreshTokenIncorrectException extends RuntimeException {
    public RefreshTokenIncorrectException(String message) {
        super(message);
    }
}
