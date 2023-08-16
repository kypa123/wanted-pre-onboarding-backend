# wanted-pre-onboarding-backend


## 과제 제출 필수 사항

1. 성명
   - 주지호
  
2. 애플리케이션의 실행 방법
   - docker compose up 커맨드 입력
     
3. 데이터베이스 테이블 구조
![스크린샷 2023-08-16 오후 10 59 44](https://github.com/kypa123/wanted-pre-onboarding-backend/assets/86966661/47bba999-085f-46bd-a817-1c1bdb704cc5)


4. 시현 영상<br>오라클 클라우드에 배포된 서비스로 영상을 촬영했습니다.<br>

https://github.com/kypa123/wanted-pre-onboarding-backend/assets/86966661/cfb8135e-6516-4c14-9566-fc6cc587a2a7


5. 구현 방법 및 이유에 대한 설명
  - model, service, controller, router 총 4개의 계층으로 나누어 request를 처리하였습니다.
  - sequelize 라이브러리를 사용하여 orm으로 데이터를 관리하였고, 각 모델간 의존관계에 on delete cascade constraint를 부과하여 일괄삭제가 가능하도록 하였습니다.
  - 과제 요구사항인 이메일조건, 비밀번호 조건은 express middleware로 validate-userinfo.ts 모듈로 체크하였습니다.
  - 로그인 여부는 is-logged-in.ts 모듈로 express middleware로 체크하였습니다.

6. API 명세
https://documenter.getpostman.com/view/20682424/2s9Y5Qzkeq



## 추가 구현 및 부가설명

1. Oracle cloud에 서비스를 배포하였습니다. 구조는 다음과 같습니다.

![wanted infra](https://github.com/kypa123/wanted-pre-onboarding-backend/assets/86966661/ab0fd246-0611-43e0-a784-1e0b7517f72a)
<br>주소 - 192.9.184.82
  
2. docker compose로 서비스를 구성했습니다. docker compose up으로 서비스를 실행 시, 기본적으로 더미데이터 20개를 각 테이블에 insert하도록 설정되어 있습니다.
3. 통합테스트를 진행했습니다. 테스트 데이터베이스와 연결하여 각 라우팅을 테스트하였습니다.
   - 테스트 커맨드 - npm test
