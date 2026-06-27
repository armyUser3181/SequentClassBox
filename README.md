# Sequent Event System

## 개요

`sequent/` 폴더는 DOM 이벤트를 추상화하고 재사용 가능한 이벤트 플로우를 구성하는 소규모 이벤트 시스템입니다.

주요 목표:
- DOM 요소와 이벤트 로직을 분리
- 이벤트를 단일 액션, 순차 흐름, 조건부 호출 등으로 구성
- 이벤트 등록/해제와 바인딩을 일관된 API로 관리

## 주요 구성

### EventEmitter

- `HTMLElement`와 연결되는 이벤트 관리 객체
- 이벤트 콜백 등록 및 제거
- DOM에 실제 이벤트 리스너 바인딩/해제
- `EventEmitter.form(element)`로 요소당 싱글턴 인스턴스 생성

### EventActionClass

- 하나의 이벤트 액션을 나타내는 클래스
- `callback`: 실제 이벤트 처리 함수
- `caller`: 이벤트 처리 이후 플로우 결정을 위한 함수
- `trigger`: DOM 이벤트가 발생했을 때 호출되는 진입점
- `bind` / `unbind`: 이벤트리스너를 연결하거나 제거

### EventElementClass

- 여러 `EventActionClass`를 모아 하나의 이벤트 시퀀스로 구성
- `push(...)`로 액션 추가
- `setup.classic`, `setup.chain`, `setup.call`, `setup.flow` 등으로 실행 흐름 구성
- 각각의 흐름은 이벤트 실행 방식과 재연결 로직을 달리함

### EventHandler

- 여러 `EventElementClass` 인스턴스를 그룹으로 관리
- 이벤트 요소 생성 및 등록 도우미 제공
- `EventEmitter`와 DOM 요소 연결을 담당

### EventFlowEnum / EventFlowClass

- 플로우 제어 명령어를 숫자 비트마스크로 변환하여 관리
- 지원 커맨드: `next`, `quit`, `try`, `loop`, `continue`, `break`, `unbind`, `null`
- `EventFlowClass`는 등록된 플로우 콜백을 실행하고 결과를 누적

## 실행 예시

`index.js`에서는 다음과 같은 흐름이 있습니다:

1. `createUI()`로 입력창, 모니터, 그라운드 요소 생성
2. `appBInd()`로 요소를 DOM에 배치
3. `screenMaxElementEvent()`로 최대화 동작 등록
4. `keyDown()`으로 키보드 입력 이벤트를 UI에 바인딩

이 예시는 `sequent` 이벤트 시스템을 실제 DOM 동작과 연결하는 방법을 보여줍니다.

## 사용 팁

- `EventEmitter`는 DOM 이벤트를 모아서 관리하는 래퍼입니다.
- `EventActionClass`를 만들 때는 `callback`, `caller`, `tag`, `target`을 명확히 전달하세요.
- `EventElementClass.setup`의 각 모드를 먼저 간단히 테스트한 후 복잡한 플로우를 추가하세요.
- `index.js` 같은 진입점 파일에서는 UI 생성과 이벤트 연결을 분리하면 유지보수가 쉬워집니다.

## 앞으로 추가할 내용

- 각 클래스별 입력값과 출력값 예시
- `EventElementClass.setup` 모드별 동작 예제
- `EventFlowEnum` 값과 `EventFlowClass` 실행 결과 관계 설명
- `EventHandler` 사용 예시
