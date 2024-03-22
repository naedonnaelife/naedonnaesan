package com.example.back.zzim.service;

import com.example.back.auth.oauth.PrincipalDetails;
import com.example.back.dong.entity.Dong;
import com.example.back.dong.repository.DongRepository;
import com.example.back.exception.AlreadyZzimedException;
import com.example.back.exception.DongNotFoundException;
import com.example.back.exception.ZzimNotFoundException;
import com.example.back.user.entity.User;
import com.example.back.zzim.entity.Zzim;
import com.example.back.zzim.repository.ZzimRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ZzimService {

    private final ZzimRepository zzimRepository;
    private final DongRepository dongRepository;

    public Long saveZzim(Long dongId) {
        // 동(Dong) 조회
        Dong dong = dongRepository.findById(dongId)
                .orElseThrow(() -> new DongNotFoundException(dongId));
        User user = getUser();

        // 사용자와 동에 해당하는 찜(Zzim) 조회
        Optional<Zzim> existingZzim = zzimRepository.findByUserAndDong(user, dong);

        // 이미 존재하는 경우 처리. 근데 뭘 하는게 좋을지 모르겠음
        if (existingZzim.isPresent()) {
//            return existingZzim.get().getZzimId();
            throw new AlreadyZzimedException(existingZzim.get().getZzimId());
        }

        // 존재하지 않는 경우, 새 찜(Zzim) 생성 및 저장
        Zzim newZzim = new Zzim(dong, user);
        Zzim savedZzim = zzimRepository.save(newZzim);

        // 새로 저장된 찜(Zzim)의 ID 반환
        return savedZzim.getZzimId();
    }

    public Long deleteZzim(Long dongId){

        Dong dong = dongRepository.findById(dongId).orElseThrow(() -> new DongNotFoundException(dongId));
        User user = getUser();

        Zzim zzim = zzimRepository.findByUserAndDong(user, dong).orElseThrow(() -> new ZzimNotFoundException(user.getUserId()));
        zzimRepository.delete(zzim);

        return zzim.getZzimId();
    }

    private User getUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        return principalDetails.getUser();
    }

}
