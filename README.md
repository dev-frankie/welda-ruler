# 실행방법 (node v20.19.0)

- npm install
- npm run build
- npm run start

# 프로젝트 구조도

```
app/
├─ components/
│ ├─ atoms/ # 가장 작은 UI 단위
│ ├─ molecules/ # 여러 Atom의 결합
│ ├─ organisms/ # Molecule + Atom 결합, 더 복합적 UI
│ ├─ templates/ # 각 페이지당 1:1 매핑 되는 UI
│ └─ pages/
├─ config/ # 상수 값들의 모음
├─ hooks/ # 커스텀 훅
├─ utils/ # 범용 유틸 함수
└─ types/ # 타입 정의
```
