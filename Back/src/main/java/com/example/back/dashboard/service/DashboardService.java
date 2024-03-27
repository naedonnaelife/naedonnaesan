package com.example.back.dashboard.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.Tuple;

import com.example.back.dashboard.dto.AvgInfraDto;
import com.example.back.infracount.dto.InfraTypeAvgCountDto;
import com.example.back.infrascore.dto.InfraAvgScoreDto;
import com.example.back.infrascore.repository.InfraScoreRepository;
import com.example.back.subway.dto.SubwayDto;
import com.example.back.subway.entity.Subway;
import com.example.back.subway.repository.SubwayRepository;
import org.springframework.stereotype.Service;

import com.example.back.dashboard.dto.ArticleDto;
import com.example.back.dashboard.document.Article;
import com.example.back.dashboard.repository.ArticleRepository;
import com.example.back.infracount.dto.InfraTypeCountDto;
import com.example.back.infracount.repository.InfraCountRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardService {
	private final ArticleRepository articleRepository;
	private final InfraCountRepository infraCountRepository;
	private final InfraScoreRepository infraScoreRepository;
	private final SubwayRepository subwayRepository;

	public List<ArticleDto> getArticleList(String keyword) {
		List<Article> articleList = articleRepository.findByTitleContaining(keyword);

		return articleList.stream().map(
			article -> {
				ArticleDto dto = new ArticleDto();
				setDto(article, dto);
				return dto;
			}).collect(Collectors.toList());
	}

	public ArticleDto getArticle(String id) {
		Article article = articleRepository.findById(id).orElseThrow();
		System.out.println(article);  // 디버깅 코드
		ArticleDto dto = null;
		if (article != null) {
			dto = new ArticleDto();
			setDto(article, dto);
		}
		return dto;
	}

	private void setDto(Article article, ArticleDto dto) {
		dto.setId(article.getId());
		dto.setCompany(article.getCompany());
		dto.setTitle(article.getTitle());
		dto.setLink(article.getLink());
		dto.setPublished(article.getPublished());
		dto.setCategory(article.getCategory());
		dto.setCategory_str(article.getCategory_str());
		dto.setReporter(article.getReporter());
		dto.setArticle(article.getArticle());
	}

	// 이건 조우재꺼
	public List<InfraTypeCountDto> getInfraTypeCounts(Long dongId) {

		List<Tuple> infraCountList = infraCountRepository.findInfraCountByDongId(dongId);

		return infraCountList.stream().map(infraCount -> new InfraTypeCountDto(
			infraCount.get("dongName", String.class),
			infraCount.get("infraTypeName", String.class),
			infraCount.get("infraTypeScore", Integer.class),
			infraCount.get("totalCount", Long.class)))
			.collect(Collectors.toList());
	}

	//이건 태호꺼

	public AvgInfraDto getTotalInfraTypeInfo(){
		List<Tuple> averageScoreByInfraType = infraScoreRepository.findAverageScoreByInfraType();


		// 일단 인프라 스코어 먼저 가져오기
		List<InfraAvgScoreDto> infraScoreAvg = averageScoreByInfraType.stream()
				.map(result -> new InfraAvgScoreDto(
						result.get("infraTypeName", String.class),
						result.get("avg", Double.class)
				))
				.collect(Collectors.toList());


		// 인프라 갯수 가져오기
		List<Object[]> results = infraCountRepository.findTotalInfraCountByType();
		List<InfraTypeAvgCountDto> averageCounts = new ArrayList<>();


		for (Object[] result : results) {
			String infraTypeName = (String) result[0];
			long totalCount = (long) result[1];
			double averageCount = (double) totalCount / 465; // 법정동 총 개수로 나누어 평균 계산

			averageCounts.add(new InfraTypeAvgCountDto(infraTypeName, averageCount));
		}

		AvgInfraDto avgInfraDto = new AvgInfraDto(infraScoreAvg, averageCounts);
		return avgInfraDto;

	}

	public List<SubwayDto> getSubway(String name){
		List<Subway> subwayList = subwayRepository.findByDongName(name);

		List<SubwayDto> collect = subwayList.stream()
				.map(subway -> new SubwayDto(subway.getLine(), subway.getSubwayName(), subway.getDongName(), subway.getAddress()))
				.collect(Collectors.toList());
		return collect;
	}

}