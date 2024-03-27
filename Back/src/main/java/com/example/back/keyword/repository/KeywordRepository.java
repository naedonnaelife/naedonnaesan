package com.example.back.keyword.repository;

import com.example.back.keyword.document.Keyword;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface KeywordRepository extends MongoRepository<Keyword, String> {

    Keyword findByDate(String date);
}
