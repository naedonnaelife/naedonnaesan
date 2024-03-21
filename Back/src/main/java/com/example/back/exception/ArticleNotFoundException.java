package com.example.back.exception;

import lombok.Getter;

@Getter
public class ArticleNotFoundException extends RuntimeException{
	private final Object article;

	public ArticleNotFoundException(Object article) {
		super("해당하는 기사가 없습니다.");
		this.article = article;
	}
}
