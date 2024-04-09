package com.example.back.keyword.service;

import com.example.back.keyword.document.Keyword;
import com.example.back.keyword.dto.KeywordDto;
import com.example.back.keyword.repository.KeywordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KeywordService {
    private final KeywordRepository keywordRepository;

    public KeywordDto getKeyword(String date){
        Keyword keyword = keywordRepository.findByDate(date);
        return new KeywordDto(keyword.getId(), keyword.getDate(), keyword.getKeywords());
    }
}
