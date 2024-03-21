package com.example.back.dashboard.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back.dashboard.entity.Article;


public interface ArticleRepository extends JpaRepository<Article, Long> {
	public List<Article> findByTitleContaining(String keyword);
	public Article findByArticleId(long articleId);
}
