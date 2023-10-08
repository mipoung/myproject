# 연주단

<h3>나의 첫 프로젝트</h3>
<p>연수구의 어린이 보호구역과, 주정차 탄력 구간을 카카오 지도 API를 활용해 표시합니다.
구글의 파이어 베이스를 이용해 로그인/회원가입 기능을 구현하였습니다.
코딩에 대한 아무런 지식도 없을 때 독학으로 만든 프로젝트라 부족한 부분이 매우 많습니다.</p>

<h3>프로젝트를 시작하게 된 계기</h3>
<p>평소 함께 일하시던 주정차 단속 업무를 하시는 분들이 각 지역에 대한 정보를 종이매체(지도, 노트 등등)으로 들고 다녔습니다. <br>
하지만 종이 매체는 외근 시에 펼쳐 보기 힘들고 분실하는 경우도 잦았습니다. <br>
특히 업무를 보시는 분들이 각자 지도, 노트 등에 정보를 업데이트했고 서로 다른 근무 일로 인해 정보가 어긋나거나 누락되는 경우가 많았습니다. <br>
만약 스마트폰으로 지도를 볼 수 있고, 스마트폰 지도에 업무에 필요한 정보들을 기입하여 공유할 수 있다면 어디서든 스마트폰으로 지도를 조회해 업무의 편의성도 올라갈 것이고 정보의 일원화를 이뤄 누락되는 정보도 없을 것이라고 생각해 이 프로젝트를 진행하게 되었습니다. <br>
결론적으로 초보적이고 부족함이 많은 프로젝트이지만, 함께 일하시는 분들이 제가 만든 사이트를 굉장히 만족스럽게 사용해 주셨으며 저 또한 많은 보람을 느낀 프로젝트 입니다.</p>

<hr>
<p><strong>- 로그인 화면</strong></p>
<img width="942" alt="image" src="https://github.com/mipoung/myproject/assets/95519464/ff47ac1a-02f1-459c-9f31-79237c261dbf">
<p>파이어 베이스 Authentication 를 이용해 로그인 기능을 구현하였습니다.</p>

<hr>

<p><strong>- 메인 화면</strong></p>
<img width="1223" alt="image" src="https://github.com/mipoung/myproject/assets/95519464/a2917fe1-1788-4840-85a3-a7f2ba84f380">
<p>로그인 후 메인 화면에서는 간단한 공지사항과 오늘의 근무 일정을 수정하고 조회할 수 있습니다.</p>
<hr>

<p><strong>- 메인 메뉴</strong></p>
<img width="1225" alt="image" src="https://github.com/mipoung/myproject/assets/95519464/243454e2-1ca5-4c84-bfc1-9504fdd7cbde">
메인 메뉴 입니다.
<hr>
<p><strong>- 공지사항 화면</strong></p>
<img width="1169" alt="image" src="https://github.com/mipoung/myproject/assets/95519464/43bdf525-2815-4058-8053-61a0274ba023">
<img width="1085" alt="image" src="https://github.com/mipoung/myproject/assets/95519464/d89d3e26-320d-438c-abdf-4b1bd760ce16">

공지사항, 업데이트 내역, 근무일정 등을 파이어베이스 Cloud Firestore 를 이용해 작성하고 조회할 수 있도록 하였습니다.

<hr>
<h3>핵심 기능(지도)</h3>
<p><strong>- 지도 화면</strong></p>
<img width="1224" alt="image" src="https://github.com/mipoung/myproject/assets/95519464/70283bfa-f81a-479c-bb81-b75a8a5025bd">
카카오 지도 API를 활용해 인천광역시 연수구의 경계를 폴리 라인으로 그렸습니다.
<hr>
<p><strong>- 어린이 보호구역 표시</strong></p>
<img width="1222" alt="image" src="https://github.com/mipoung/myproject/assets/95519464/2470a83b-cdf6-4291-971f-01ba812af5fb">
어린이 버튼을 누르면 어린이 보호구역이 지도상에 노란색 폴리라인으로 표시됩니다.
<hr>
<p><strong>- 주정차 탄력 구간 표시</strong></p>
<img width="1224" alt="image" src="https://github.com/mipoung/myproject/assets/95519464/4c1f3648-75cd-4c6c-b114-5e038073dcf2">
탄력 버튼을 누르면 탄력 주정차 구간에 대한 정보가 지도에 표시됩니다.

구간 정보 -> 파란색 점선 폴리라인으로 표시
탄력 주정차 자세한 정보 -> 주정차 금지 표지판을 클릭하면 표시

<hr>

<p><strong>- 간편한 주소 조회</strong></p>
<img width="1223" alt="image" src="https://github.com/mipoung/myproject/assets/95519464/70f85595-42a9-4471-8c6c-911896f5d173">
지도상의 원하는 부분을 클릭하면 클릭한 부분의 법정동 주소 정보(도로명, 지번주소)를 표시합니다.

<hr>

<p><strong>- 로드뷰</strong></p>
<img width="1226" alt="image" src="https://github.com/mipoung/myproject/assets/95519464/b5c8e4a0-f152-46f6-b1e7-1065cc0d952f">
로드뷰 버튼을 클릭하면 클릭한 부분의 로드뷰를 지도와 함께 볼 수 있습니다.

<hr>

<p><strong>- 지도 키워드 검색</strong></p>
<img width="1225" alt="image" src="https://github.com/mipoung/myproject/assets/95519464/f65b953e-6d0b-4eaa-9462-29ebcb3e05d0">
상단 검색 버튼을 통해 키워드로 장소를 검색할 수 있습니다.

<hr>
<p><strong>- 일정 공유</strong></p>
<img width="1225" alt="image" src="https://github.com/mipoung/myproject/assets/95519464/02ab849a-d7fa-4fca-a4da-d9a15b5e3985">
일정 메뉴에서는 구글 캘린더를 이용해 특정인 혹은 회원들이 일정을 수정하고 조회할 수 있도록 하였습니다.

<hr>


<p><strong>- 모바일 환경에서 사용 가능하도록 반응형 웹 페이지로 제작</strong></p>
<img width="875" alt="image" src="https://github.com/mipoung/myproject/assets/95519464/b41bbd8b-30a6-4885-b6eb-17bf8740e026">

