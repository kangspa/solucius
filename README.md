### Docker

- https://www.docker.com/get-started/

### Local DB

Local DB 구성

- Back-End > solucius > src > main > resources > application.properties 파일에서 username이랑 password 본인 로컬 계정으로 수정
- 주로 사용하는 데이터베이스 클라이언트에서 mysql db로 solucius 이름의 데이터베이스 생성
- Back-End > solucius > src > main > resources > templates > init.sql 파일 실행
- jpa 설정 때문에 스네이크 표기법으로 변경했어요.

### web 환경

db설정 끝나면 git clone 받은 폴더 위치에서 아래 docker 명령어 먼저 실행해주세요.

** 백엔드 **
- Back-End > solucius 위치로 이동한 후에
1. gradle wrapper
2. ./gradlew clean build

** 도커 **
1. Docker image build : docker-compose build
2. Docker Container 가동 : docker-compose up
3. Docker Container 중지 : docker-compose down

- front 접속 주소 http://localhost:3000

- 현재 front 소스코드는 라이브로 반영되게 설정했는데 back은 아직이라 수정 코드 반영하시려면 
1. (3)번 실행하고
2. terminer에서 Back-End > solucius 이 위치로 이동한 후에 ./gradlew clean build 명령어 실행하고 
3. (1), (2) 차례대로 실행해주세요

