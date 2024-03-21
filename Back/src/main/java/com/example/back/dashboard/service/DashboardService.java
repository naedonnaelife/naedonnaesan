package com.example.back.dashboard.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.back.dashboard.dto.ArticleDto;
import com.example.back.dashboard.entity.Article;
import com.example.back.dashboard.repository.ArticleRepository;
import com.example.back.exception.ArticleNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardService {
	private final ArticleRepository articleRepository;

	public List<ArticleDto> getArticleList(String keyword) {
		List<Article> articleList = articleRepository.findByTitleContaining(keyword);

		return articleList.stream().map(
			article -> {
				ArticleDto dto = new ArticleDto();
				dto.setArticleId(article.getArticleId());
				dto.setContent(article.getContent());
				dto.setImageUrl(article.getImageUrl());
				dto.setTitle(article.getTitle());
				return dto;
			}).collect(Collectors.toList());
	}

	public ArticleDto getArticle(long articleId) {
		Article article = articleRepository.findByArticleId(articleId)
			.orElseThrow(() -> new ArticleNotFoundException(articleId));
		System.out.println(article);
		ArticleDto dto = new ArticleDto();
		dto.setArticleId(article.getArticleId());
		dto.setContent(article.getContent());
		dto.setImageUrl(article.getImageUrl());
		dto.setTitle(article.getTitle());
		return dto;
	}
}