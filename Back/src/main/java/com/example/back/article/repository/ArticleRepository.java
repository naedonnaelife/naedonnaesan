package com.example.back.article.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back.article.entity.Article;

public interface ArticleRepository extends JpaRepository<Article, Long> {

}
