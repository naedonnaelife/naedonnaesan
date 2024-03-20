package com.example.back.article.controller;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.example.back.article.entity.Article;
import com.example.back.article.repository.ArticleRepository;
import com.example.back.article.service.ArticleService;

@SpringBootTest
@Transactional
@Rollback
public class ArticleServiceTest {

	@Autowired
	private ArticleRepository articleRepository;

	@Autowired
	private ArticleService articleService;

	// 테스트 이전에 데이터 추가
	@BeforeEach
	public void setup() {
		Article article1 = new Article("Content 1", "image1.jpg", "Title 1");
		Article article2 = new Article("Content 2", "image2.jpg", "Title 2");

		articleRepository.save(article1);
		articleRepository.save(article2);
	}

	// 테스트 이후에 데이터 삭제
	@AfterEach
	public void teardown() {
		articleRepository.deleteAll();
	}

	@Test
	public void testGetArticleListWithData() {
		String keyword = "Title";
		List<Article> articles = articleService.getArticleList(keyword);
		assertEquals(2, articles.size());
	}

	@Test
	public void testGetArticleListWithoutData() {
		String keyword = "NonExistentTitle";
		List<Article> articles = articleService.getArticleList(keyword);
		assertTrue(articles.isEmpty());
	}
}