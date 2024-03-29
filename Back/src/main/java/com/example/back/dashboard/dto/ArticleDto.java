package com.example.back.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ArticleDto {
	private String id;
	private String company;
	private String title;
	private String link;
	private String published;
	private String category;
	private String category_str;
	private String reporter;
	private String article;
}