package com.example.back.dashboard.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.ToString;

@Document(collection = "news")
@Getter
@ToString
public class Article {
	@Id
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
