package com.example.back.dashboard.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.back.dashboard.document.Article;


public interface ArticleRepository extends MongoRepository<Article, String> {
	Page<Article> findByTitleContaining(String keyword, Pageable page);
	Optional<Article> findById(String id);
}
