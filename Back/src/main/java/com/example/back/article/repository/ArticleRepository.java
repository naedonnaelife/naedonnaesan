package com.example.back.article.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back.article.entity.Article;


public interface ArticleRepository extends JpaRepository<Article, Long> {
	public List<Article> findByTitleContaining(String keyword);
}
