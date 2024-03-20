package com.example.back.article.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.back.article.entity.Article;
import com.example.back.article.service.ArticleService;
import com.example.back.common.HttpStatusEnum;
import com.example.back.common.Message;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/dashboard/news")

public class ArticleController {

	private final ArticleService articleService;

	@GetMapping("/{keyword}")  // 제목 기준 검색
	public ResponseEntity<Message> getArticle(@PathVariable(value = "keyword") String keyword) {
		List<Article> articles = articleService.getArticleList(keyword);
		Message message =
			articles.isEmpty() ?
				new Message(HttpStatusEnum.NOT_FOUND, "키워드에 해당되는 기사 없음", articles) :
				new Message(HttpStatusEnum.OK, "키워드에 해당되는 기사 조회 완료", articles);
		return new ResponseEntity<>(message, articles.isEmpty() ? HttpStatus.NOT_FOUND : HttpStatus.OK);
	}
}
