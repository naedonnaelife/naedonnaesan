package com.example.back.auth;

import com.example.back.user.dto.Coordinate;
import com.example.back.user.entity.Gender;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class FormDto {
    private int age;
    private String address;
    private Gender gender;
    private String name;
    private Coordinate coordinate;
}
