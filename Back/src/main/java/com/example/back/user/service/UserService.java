package com.example.back.user.service;

import com.example.back.auth.FormDto;
import com.example.back.auth.oauth.PrincipalDetails;
import com.example.back.user.entity.Gender;
import com.example.back.user.entity.User;
import com.example.back.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;


    //
    public Long saveUserInfo(FormDto formDto){

        String address = formDto.getAddress();
        String name = formDto.getName();
        int age = formDto.getAge();
        Gender gender = formDto.getGender();

        User user = getUser();
        user.setAge(age);
        user.setBAddress(address);
        user.setGender(gender);
        user.setName(name);

        userRepository.save(user);

        return user.getUserId();

    }

    private User getUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        return principalDetails.getUser();
    }
}
