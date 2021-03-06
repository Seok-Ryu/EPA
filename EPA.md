# EPA (Event Portal Application)



### 이벤트 정의 ###

1. 경품응모

    Asset/상품 구매/시청 시 응모되는 형태. (수동/자동 응모)

2. 목표달성

    운영자가 지정한 일정 목표치 달성 시 응모되는 형태 (수동 응모)

    Ex) 스탬프, N+1, 합산 페이백

3. 타임세일

    일정시간 동안 특정 대상 할인 진행

===
### 이벤트 포털 메인 ###

당첨 결과가 발표된 이벤트가 있을 경우, 결과 확인 전 진입 시 마다  _당첨 알림 팝업_

1.	메인 이벤트 배너

    메인 이벤트 배너 노출. 일정 시간 별도 입력이 없을 경우, 우측의 이벤트 배너 리스트의 배너가 순차적으로 노출

2.	이벤트 아이콘 / 인디케이터

    이벤트 참여 상태에 따라 아이콘 노출

    오른쪽 인디케이터 항시 노출

3.	이벤트 배너 리스트

    메인 이벤트 배너 포함 전체 이벤트 중 핵심이 되는 주요 이벤트 배너 선택적 노출 가능.

    노출범위보다 리스트가 많을 경우 일부 배너만 노출, 나머지 순차 노출

===
### 이벤트 포털 메뉴 ###

1.	이벤트 포털 메뉴

    1-1. 이벤트 카테고리

        추천 / 할인 이벤트 / 가입 이벤트 / MY 이벤트

    1-2. 날짜 및 시간/참여이벤트 표시

        현재 날짜 및 시간 / 참여 이벤트 개수 표시(참여 이벤트 중 진행중인 이벤트)

    1-3. 이벤트 배너 리스트

        선택된 메뉴에 해당하는 이벤트 배너

    1-4. 이벤트 아이콘 영역

        이벤트 참여 상태 별 아이콘 표시

    1-5. 인디케이터

        메인 이벤트 페이지로 이동한다는 인디케이터 항시 표시


2.	MY 이벤트

    2-1. CASE #1

        이벤트 포털 메인 페이지와 동일한 UI

        사용자가 참여한 이벤트 상태에 따라 아이콘 표시

    2-2. CASE #2

        이벤트 타이틀, 응모날짜, 추첨 일, 상태의 목록형 UI

        당첨>미 당첨>응모완료>N/N 상태 순 정렬
===
### 이벤트 참여 페이지 ###

1.	이벤트 공통

    1-1. _대상목록 보기_

        해당 이벤트의 모든 대상인 Asset과 상품노출

        (카테고리 대상일 경우, 카테고리 내 Asset/상품 목록 노출)

        최소 2개 ~ 최대 5개 까지 노출. 5개 이상인 경우 이벤트 상세 페이지 진입 시점을 기준으로 구매/시청 Asset/상품 제외 랜덤 5개 대상 추출하여 노출

    1-2. _참여내역 보기_

        해당 이벤트의 대상 VOD 구매/시청 내역 목록에 노출

    1-3. _당첨자 목록_

        해당 이벤트의 모든 당첨자 정보 및 당첨 상품 내역

    1-4. 참여 가능한 이벤트 알림

    1-5. 이벤트 진행 종료 페이지

        이벤트 응모 미/완료

        선착순 지급/진행중지

    1-6.개인정보 수집 동의

       _휴대폰 번호 입력 팝업_

        번호 입력 후, 참여하기 -> 대상목록보기

2.	 _경품 응모 이벤트_

    2-1. 이벤트 참여 페이지 (공통)

       자동응모와 수동응모로 진행 가능

        - 대상 보기

          단일 어셋/상품에 설정된 이벤트일 경우노출. 대상 상세정보 화면 노출

        - 대상목록 보기

          2개 이상의 어셋/상품 설정된 이벤트일 경우 노출.

    2-2. 자동 응모 (대상 구매/시청 후)

       대상 구매 또는 시청 시 자동으로 이벤트 참여 인정

        - 참여내역 보기

        - 당첨자 목록

    2-3. 수동 응모 (대상 구매/시청 후)

       대상 구매 또는 시청 후 개인 정보 수집 동의한 경우 이벤트 참여 인정

       참여의사를 밝힌 경우에만 이벤트 참여 인정

        - 결과 확인 하기

           개인정보 수집 설정된 경우, 개인정보 수집 동의 플로우 진행 (<->)

        - 당첨자 목록

    2-4.	당첨결과

        개인정보 수집 설정

           - 참여내역 보기

           - 당첨자 목록

        개인정보 수집 비 설정

           - 경품 받기

             개인정보 수집이 필요한 혜택에 당첨된 상세페이지에서 노출

             개인정보 수집 종의 진행. 진행 완료 시 경품 바로 지급

           - 참여내역 보기

           - 당첨자 목록

3.	목표달성형 이벤트 (합산 페이백, N+1, 스탬프)

    참여하지 않은 이벤트의 진행기간이 종료된 경우, 이벤트종료 알림 문구 표시하며 ‘닫기’버튼 외 모든 버튼 비활성화

   3-1.	적립 하기

        휴대폰 번호 입력 팝업 노출 후, 입력 완료한 경우에만 이벤트 참여 진행.

   3-2.	참여내역 보기

   3-3.	대상목록 보기

   3-4.	당첨자 목록

===
#### 이벤트 포털 팝업 ###

> 1. 당첨 알림 팝업

>   당첨된 모든 이벤트 결과 확인 시, 팝업 노출 종료. 확인하기 선택 시, 참여이벤트메뉴로 이동

> 2. 대상목록 보기

>   2개 이상의 어셋/상품 설정된 이벤트일 경우 노출. 목록 내 대상 선택 시 대상 상세화면으로 이동

> 3. 참여내역 보기


>   해당 이벤트의 대상 VOD구매/시청 내역 목록 노출. 동일대상 여러 번일 경우 모두 노출

> 4. 당첨자 목록

>   N명의 당첨자가 확정된 경우 버튼 노출. 모든 참여자 경품 지급일 경우 버튼 비 노출

> 5. 참여 가능한 이벤트 알림

>   구매/시청한 VOD에 ‘참여가능’상태 이벤트가 2개 이상 설정된 경우, VOD종료 팝업 내 이벤트 배너를 통해 상세 페이지에 진입한 경우 해당 팝업 최초 노출.

> 6. 휴대폰 번호 입력 팝업

>   수동응모 이벤트 참여 전, 참여자 휴대폰 번호 수집. 참여하기 선택 시 휴대폰번호 입력 팝업

> 7. 경품 응모 이벤트

>   대상보기 : 단일 Asset/상품에 설정된 이벤트일 경우, 표시되며 선택 시 상세정보 노출.

>   대상목록 : 2개 이상의 Asset/상품에 설정된 이벤트일 경우, 대상목록보기 팝업 노출.