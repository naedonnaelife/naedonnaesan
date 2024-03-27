package com.example.back.dashboard.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.back.dashboard.document.Article;


public interface ArticleRepository extends MongoRepository<Article, String> {
	public List<Article> findByTitleContaining(String keyword);
	public Optional<Article> findById(String id);
}
