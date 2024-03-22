package com.example.back.dashboard.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.back.dashboard.dto.ArticleDto;
import com.example.back.dashboard.dto.InfraCountDto;
import com.example.back.dashboard.entity.Article;
import com.example.back.dashboard.entity.InfraCount;
import com.example.back.dashboard.repository.ArticleRepository;
import com.example.back.dashboard.repository.InfraCountRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardService {
	private final ArticleRepository articleRepository;
	private final InfraCountRepository infraCountRepository;

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
		Article article = articleRepository.findByArticleId(articleId);
		System.out.println(article);  // 디버깅 코드
		ArticleDto dto = null;
		if(article != null) {
			dto = new ArticleDto();
			dto.setArticleId(article.getArticleId());
			dto.setContent(article.getContent());
			dto.setImageUrl(article.getImageUrl());
			dto.setTitle(article.getTitle());
		}
		return dto;
	}
	
	public InfraCountDto getInfraCount(long dongId) {
		InfraCount infraCount = infraCountRepository.findByDongId(dongId);
		InfraCountDto dto = null;
		if(infraCount != null) {
			dto = new InfraCountDto();
			dto.setCountId(infraCount.getCountId());
			dto.setCount(infraCount.getCount());
			dto.setDongId(infraCount.getDongId());
			dto.setInfraId(infraCount.getInfraId());
			dto.setTypeId(infraCount.getTypeId());
		}
		return dto;
	}
}