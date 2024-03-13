package com.example.back.zzim.service;

import com.example.back.auth.oauth.PrincipalDetails;
import com.example.back.dong.entity.Dong;
import com.example.back.dong.repository.DongRepository;
import com.example.back.exception.DongNotFoundException;
import com.example.back.user.entity.User;
import com.example.back.zzim.entity.Zzim;
import com.example.back.zzim.repository.ZzimRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ZzimService {

    private final ZzimRepository zzimRepository;
    private final DongRepository dongRepository;

    public Long saveZzim(Long dongId){

        Dong dong = dongRepository.findById(dongId).orElseThrow(() -> new DongNotFoundException(dongId));
        User user = getUser();

        Zzim zzim = new Zzim(dong, user);

        Zzim saved = zzimRepository.save(zzim);

        return saved.getZzimId();

    }

    public Long deleteZzim(Long dongId){

        Dong dong = dongRepository.findById(dongId).orElseThrow(() -> new DongNotFoundException(dongId));
        User user = getUser();

        Zzim zzim = new Zzim(dong, user);

        zzimRepository.delete(zzim);

        return zzim.getZzimId();
    }

    private User getUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        return principalDetails.getUser();
    }

}
