package com.example.back.user.service;

import com.example.back.auth.FormDto;
import com.example.back.auth.oauth.PrincipalDetails;
import com.example.back.exception.UserNotFoundException;
import com.example.back.user.dto.UserSimple;
import com.example.back.user.entity.Gender;
import com.example.back.user.entity.User;
import com.example.back.user.repository.UserRepository;
import com.example.back.zzim.dto.ZzimDto;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;

    public Long updateAddr(String address){
        User user = getUser();
        user.updateAddress(address);
        return user.getUserId();
    }

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

        List<ZzimDto> zzimList = user.getZzimList().stream()
                .map(zzim -> new ZzimDto(zzim.getDong().getDongId(), zzim.getDong().getDongName()))
                .collect(Collectors.toList());

        return zzimList;
    }


    public User getUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // authentication에서 PrincipalDetails 꺼내기
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        UserSimple userSimple = principalDetails.getUser();
        Long userId = userSimple.getUserId();
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return user;
    }
}
