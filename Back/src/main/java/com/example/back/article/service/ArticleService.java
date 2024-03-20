package com.example.back.article.service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.example.back.article.entity.Article;
import com.example.back.article.repository.ArticleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ArticleService {
	private final ArticleRepository articleRepository;

	public List<Article> getArticleList(String keyword) {
		return articleRepository.findByTitleContaining(keyword);
	}
}