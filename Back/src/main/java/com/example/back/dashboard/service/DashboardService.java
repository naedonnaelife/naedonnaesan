package com.example.back.dashboard.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.Tuple;

import org.springframework.stereotype.Service;

import com.example.back.dashboard.dto.ArticleDto;
import com.example.back.dashboard.entity.Article;
import com.example.back.dashboard.repository.ArticleRepository;
import com.example.back.infracount.dto.InfraTypeCountDto;
import com.example.back.infracount.repository.InfraCountRepository;

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
		if (article != null) {
			dto = new ArticleDto();
			dto.setArticleId(article.getArticleId());
			dto.setContent(article.getContent());
			dto.setImageUrl(article.getImageUrl());
			dto.setTitle(article.getTitle());
		}
		return dto;
	}

	public List<InfraTypeCountDto> getInfraTypeCounts(Long dongId) {

		List<Tuple> infraCountList = infraCountRepository.findInfraCountByDongId(dongId);

		return infraCountList.stream().map(infraCount -> new InfraTypeCountDto(
			infraCount.get("dongName", String.class),
			infraCount.get("infraTypeName", String.class),
			infraCount.get("totalCount", Long.class)))
			.collect(Collectors.toList());
	}
}