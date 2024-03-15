import selenium
import time
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

options = webdriver.ChromeOptions()
options.add_argument('--headless')  # Head-less 설정
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')
driver = webdriver.Chrome(options=options)

url = "https://www.oliveyoung.co.kr/store/display/getMCategoryList.do?dispCatNo=100000100010013&fltDispCatNo=&prdSort=01&pageIdx=1&rowsPerPage=1000&searchTypeSort=btn_thumb&plusButtonFlag=N&isLoginCnt=16&aShowCnt=1&bShowCnt=1&cShowCnt=1&trackingCd=Cat100000100010013_Small&amplitudePageGubun=&t_page=&t_click=&midCategory=%EC%8A%A4%ED%82%A8%2F%ED%86%A0%EB%84%88&smallCategory=%EC%A0%84%EC%B2%B4&checkBrnds=&lastChkBrnd="
driver.get(url)

cosmeticsList = []

# 행의 개수를 먼저 세어준다.
ul = driver.find_elements(By.CLASS_NAME, "cate_prd_list")
ulLen = len(ul)
driver.get(url)
idx = 1
for i in range(ulLen):
    # 한 행에 네개의 화장품
    if i!=0 and i % 10 == 0:
        df = pd.DataFrame(cosmeticsList)
        df.to_csv(f'Dataset/cosmetics_스킨토너_{idx}.csv', sep=';', index=False)
        print("화장품 정보 저장완료")
        idx+=1
        cosmeticsList = []
    for j in range(1, 5):
        time.sleep(1)
        ul = driver.find_elements(By.CLASS_NAME, "cate_prd_list")
        rows = ul[i].find_elements(By.XPATH, f"li[{j}]/div/a")
        # 각 화장품에 대해
        for row in rows:
            cosmeticsImgList = []
            reviews = []
            link = row.get_attribute("href")
            # 상세 페이지로 접근
            row.click()
            time.sleep(1)
            cosmetics = {}
            # 화장품 고유번호
            goodsNo = driver.find_element(By.XPATH, '//*[@id="artcGoodsNo"]').get_attribute('value')
            cosmetics["goodsNo"] = goodsNo
            print(goodsNo)
            # 이름, 브랜드, 이미지, 가격, 별점
            cosmetics["name"] = driver.find_element(By.CLASS_NAME, "prd_name").text
            print(cosmetics["name"])
            cosmetics["cat1"] = driver.find_element(By.XPATH, '//*[@id="midCatNm"]').text
            cosmetics["cat2"] = driver.find_element(By.XPATH, '//*[@id="smlCatNm"]').text
            cosmetics["cat3"] = driver.find_element(By.XPATH, '//*[@id="dtlCatNm"]').text
            cosmetics["brand"] = driver.find_element(By.XPATH, '//*[@id="moveBrandShop"]').text
            cosmetics["imgUrl"] = driver.find_element(By.XPATH, '//*[@id="mainImg"]').get_attribute("src")
            cosmetics["price"] = driver.find_element(By.XPATH, '//*[@class="price-2"]/strong').text
            cosmetics["rating"] = driver.find_element(By.XPATH, '//*[@id="repReview"]/b').text
            cosmetics["ratingCnt"] = driver.find_element(By.XPATH, '//*[@id="repReview"]/em').text[1:-2].replace(",","")
            print(cosmetics["ratingCnt"])
            # 상세 정보 페이지 열고 크롤링
            artcInfoBtn = driver.find_element(By.XPATH, '//*[@id="buyInfo"]/a')
            driver.execute_script('document.querySelector("#buyInfo > a").click();')
            wait = WebDriverWait(driver, 10)
            # 용량, 주요사항, 사용기한, 사용 방법, 성분
            element_to_wait = wait.until(EC.visibility_of_element_located((By.XPATH, '//*[@id="artcInfo"]/dl[2]/dd')))
            cosmetics["capacity"] = driver.find_element(By.XPATH, '//*[@id="artcInfo"]/dl[2]/dd').text
            cosmetics["mainPoint"] = driver.find_element(By.XPATH, '//*[@id="artcInfo"]/dl[3]/dd').text
            cosmetics["useDate"] = driver.find_element(By.XPATH, '//*[@id="artcInfo"]/dl[4]/dd').text
            cosmetics["howUse"] = driver.find_element(By.XPATH, '//*[@id="artcInfo"]/dl[5]/dd').text
            cosmetics["material"] = driver.find_element(By.XPATH, '//*[@id="artcInfo"]/dl[8]/dd').text
            cosmeticsList.append(cosmetics)

            # 상품 상세 정보 이미지 크롤링
            contentsImg = driver.find_elements(By.CLASS_NAME, 'contEditor')[0]
            contentsImg = contentsImg.find_elements(By.CSS_SELECTOR, 'img')

            if len(contentsImg) == 0:
                contentsImg = driver.find_elements(By.TAG_NAME, "picture")[0]
                contentsImg = contentsImg.find_elements(By.CSS_SELECTOR, 'img')
            seq = 1
            for img in contentsImg:
                contents = {}
                contents["goodsNo"] = goodsNo
                contents["seq"] = seq
                seq += 1
                contents["img_url"] = img.get_attribute("src")
                cosmeticsImgList.append(contents)

            driver.execute_script('document.querySelector("#reviewInfo > a").click();')
            wait = WebDriverWait(driver, 10)
            # 용량, 주요사항, 사용기한, 사용 방법, 성분
            element_to_wait = wait.until(EC.visibility_of_element_located((By.XPATH, '//*[@id="gdasList"]')))
            for current_page in range(1, 11):
                # 리뷰의 인덱스는 한 페이지 내에서 1~10까지 존재
                for k in range(1, 11):  # 한 페이지 내 10개 리뷰 크롤링
                    try:
                        review = {}
                        review["goodsNo"] = goodsNo
                        review["date"] = driver.find_element(By.CSS_SELECTOR,
                                                             f'#gdasList > li:nth-child({k}) > div.review_cont > div.score_area > span.date').text
                        review["rate"] = driver.find_element(By.CSS_SELECTOR,
                                                             f'#gdasList > li:nth-child({k}) > div.review_cont > div.score_area > span.review_point > span').text
                        review["skin_type"] = driver.find_element(By.CSS_SELECTOR,
                                                                  f'#gdasList > li:nth-child({k}) > div.review_cont > div.poll_sample > dl:nth-child(1) > dd > span').text
                        review["keyword1"] = driver.find_element(By.CSS_SELECTOR,
                                                                 f'#gdasList > li:nth-child({k}) > div.review_cont > div.poll_sample > dl:nth-child(1) > dd > span').text
                        review["keyword2"] = driver.find_element(By.CSS_SELECTOR,
                                                                 f'#gdasList > li:nth-child({k}) > div.review_cont > div.poll_sample > dl:nth-child(2) > dd > span').text
                        review["keyword3"] = driver.find_element(By.CSS_SELECTOR,
                                                                 f'#gdasList > li:nth-child({k}) > div.review_cont > div.poll_sample > dl:nth-child(3) > dd > span').text
                        review["content"] = driver.find_element(By.CSS_SELECTOR,
                                                                f'#gdasList > li:nth-child({k}) > div.review_cont > div.txt_inner').text
                        reviews.append(review)
                    except:
                        pass
                try:
                    if current_page % 10 != 0:  # 현재 페이지가 10의 배수가 아닐 때
                        if current_page // 10 < 1:  # 페이지 수가 한 자리수 일 때
                            # 리뷰 10개 긁으면 next 버튼 클릭
                            page_button = driver.find_element(By.CSS_SELECTOR,
                                                              f'#gdasContentsArea > div > div.pageing > a:nth-child({current_page % 10 + 1})')
                            page_button.click()
                            time.sleep(1)
                        else:  # 페이지 수가 두자리 수 이상일 때
                            # 리뷰 10개 긁으면 next 버튼 클릭
                            page_button = driver.find_element(By.CSS_SELECTOR,
                                                              f'#gdasContentsArea > div > div.pageing > a:nth-child({current_page % 10 + 2})')
                            page_button.click()
                            time.sleep(1)
                    else:
                        next_button = driver.find_element(By.CSS_SELECTOR,
                                                          '#gdasContentsArea > div > div.pageing > a.next')
                        next_button.click()  # 현재 페이지가 10의 배수일 때 페이지 넘김 버튼 클릭
                        time.sleep(1)
                except:
                    pass
                print(f'{current_page}페이지 크롤링 완료')
            df = pd.DataFrame(reviews)
            df.to_csv(f'Dataset/reviews/reviews_스킨토너_{goodsNo}.csv', sep=';', index=False)
            print("리뷰 정보 저장완료")
            df = pd.DataFrame(cosmeticsImgList)
            df.to_csv(f'Dataset/images/이미지_스킨토너_{goodsNo}.csv', sep=';', index=False)
            print("상세 정보 저장 완료")
            driver.back()