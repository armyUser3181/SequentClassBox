# SequentClassBox

## 개요

작성중

event 로직을 관리하는 클래스입니다.

event 로직에는 전통적인 dom의 작동 event는 물론

이벤트 - 조건 - 작동의 시퀀스와

이벤트 - 이벤트 - 이벤트의 이벤트 체인과

이벤트 -> 이벤트 제거후 작동의 일회용 이벤트와

이벤트 -> 호출의 호출용 이벤트 전부를 포함합니다

추가 계획으로는 일련의 이벤트 루프를 직접 관리하는 관리자를 추가할 계획입니다

## 개선안

EventAction
  lambda callback
  lambda caller
  lambda trigger
  bool isBind
  fn bind
  fn unbind
  HTMLElement target
  string tag

EventElement
  list<EventAction> list
  string type
  

EventClass
  map<Event> map


SequentClass
  EventClass


