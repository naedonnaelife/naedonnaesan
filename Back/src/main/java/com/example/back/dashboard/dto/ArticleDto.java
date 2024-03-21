package com.example.back.dashboard.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ArticleDto {
	private Long articleId;
	private String content;
	private String imageUrl;
	private String title;
}