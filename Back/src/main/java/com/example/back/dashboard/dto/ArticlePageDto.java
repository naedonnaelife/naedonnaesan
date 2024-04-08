package com.example.back.dashboard.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class ArticlePageDto {
	private List<ArticleDto> articleDtoList;
	private boolean isLast;
}
