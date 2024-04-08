package com.example.back.dashboard.controller;

import java.time.LocalDate;
import java.util.List;

import com.example.back.dashboard.dto.ArticlePageDto;
import com.example.back.dashboard.dto.AvgInfraDto;
import com.example.back.subway.dto.SubwayDto;

import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.back.dashboard.dto.ArticleDto;
import com.example.back.dashboard.service.DashboardService;
import com.example.back.common.HttpStatusEnum;
import com.example.back.common.Message;
import com.example.back.infracount.dto.InfraTypeCountDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/dashboard")

public class DashboardController {

	private final DashboardService dashboardService;

	@GetMapping("/news/keyword")  // 제목 기준 검색
	public ResponseEntity<Message> getArticleList(@RequestParam("searchWord") String searchWord, @PageableDefault(size = 10)
	Pageable pageable) {
		ArticlePageDto articlePageDto = dashboardService.getArticleList(searchWord, pageable);
		Message message =
			articlePageDto.getArticleDtoList().isEmpty() ?
				new Message(HttpStatusEnum.NOT_FOUND, "키워드에 해당되는 기사 없음", null) :
				new Message(HttpStatusEnum.OK, "키워드에 해당되는 기사 조회 완료", articlePageDto);
		return new ResponseEntity<>(message, articlePageDto.getArticleDtoList().isEmpty() ? HttpStatus.NOT_FOUND : HttpStatus.OK);
	}

	@GetMapping("/news/articleid/{id}")
	public ResponseEntity<Message> getArticle(@PathVariable(value = "id") String id) {
		// System.out.println(LocalDate.now());
		ArticleDto article = dashboardService.getArticle(id);
		Message message =
			article != null ?
				new Message(HttpStatusEnum.OK, "기사 조회 완료", article) :
				new Message(HttpStatusEnum.NOT_FOUND, "기사 조회 실패", null);
		return new ResponseEntity<>(message, article != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
	}

	@GetMapping("/infra/{dongname}")
	public ResponseEntity<Message> getInfraTypeCounts(@PathVariable(value = "dongname") String dongName) {
		List<InfraTypeCountDto> infraTypeCount = dashboardService.getInfraTypeCounts(dongName);
		Message message =
			infraTypeCount.isEmpty() ?
				new Message(HttpStatusEnum.NOT_FOUND, "동네에 따른 인프라 수치 조회 실패", null) :
				new Message(HttpStatusEnum.OK, "동네에 따른 인프라 수치 조회 성공", infraTypeCount);
		return new ResponseEntity<>(message, infraTypeCount.isEmpty() ? HttpStatus.NOT_FOUND : HttpStatus.OK);
	}

	@GetMapping("/infra/avg")
	public ResponseEntity<Message> getInfraAvg() {

		AvgInfraDto totalInfraTypeInfo = dashboardService.getTotalInfraTypeInfo();
		Message message = new Message(HttpStatusEnum.OK, "서울시 평균 점수, 카운트 조회 완료", totalInfraTypeInfo);
		return new ResponseEntity<>(message, HttpStatus.OK);
	}

	@GetMapping("/subway/{dongname}")
	public ResponseEntity<Message> getSubway(@PathVariable(name = "dongname") String dongName){
		List<SubwayDto> subwayList = dashboardService.getSubway(dongName);
		Message message = new Message(HttpStatusEnum.OK, dongName + "에 대한 지하철역 조회 완료", subwayList);
		return new ResponseEntity<>(message, HttpStatus.OK);
	}
}
