package com.example.back.zzim.dto;

import com.example.back.dong.entity.Dong;
import com.example.back.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
public class ZzimDto {
    private Long dongId;
    private String dongName;
//    private User user;
    private String guName;
}
