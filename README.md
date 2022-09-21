# 용도
1. HLS-Stream-Recorder 상태 broadcast (by socket.io)
2. KBS CCTV Url Encryption API 제공
3. HLS-CCTV-MAP App을 위한 Http Server 

# 개발환경
1. git clone
```
git clone https://gitlabsvr.sbs.co.kr/S9A4268/hls-broadcast-server.git
```
2. install dependency module
```
cd hls-broadcast-server
yarn
```
# 개발모드
```bash
export SSL=off
yarn start

```
# 패키징
* node pkg module을 사용한 windows binary build
```
yarn run build
```
* 결과물은 /build directory아래 생성
# 운영구성
1. HLS-Stream-Recorder Main서버에 설치(10.10.204.203)
2. 바탕화면 bcastServer폴더에 bcastServer.exe copy
3. 바탕화면 bcastServer.bat 실행
4. 실행 후 cmd창에서 "log info"라고 입력해서 log level을 낮춤
5. HLS-CCTV-MAP App을 위한 web contents(React Build 결과물)는 d:\www-doc에 배포해서 사용