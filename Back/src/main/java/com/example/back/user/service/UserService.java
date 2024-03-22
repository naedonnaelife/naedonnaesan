package com.example.back.user.service;

import com.example.back.auth.FormDto;
import com.example.back.auth.oauth.PrincipalDetails;
import com.example.back.exception.UserNotFoundException;
import com.example.back.user.dto.UserSimpleDto;
import com.example.back.user.entity.Gender;
import com.example.back.user.entity.User;
import com.example.back.user.repository.UserRepository;
import com.example.back.zzim.dto.ZzimDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

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

//        userRepository.save(user);

        return user.getUserId();

    }

    public List<ZzimDto> getZzimListByUser() {
        User user = getUser();

        // 진짜 유저 찾기
        System.out.println("리스트 호출!!!!!!!!");

        List<ZzimDto> zzimList = user.getZzimList().stream()
                .map(zzim -> new ZzimDto(zzim.getDong().getDongId(), zzim.getDong().getDongName()))
                .collect(Collectors.toList());

        return zzimList;
    }


    private User getUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        UserSimpleDto userDto = principalDetails.getUser();
        Long userId = userDto.getUserId();

        User user = userRepository.findById(userDto.getUserId()).orElseThrow(() -> new UserNotFoundException(userId));

        return user;
    }
}
