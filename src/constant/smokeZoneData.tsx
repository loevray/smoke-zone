/* 
  흡연구역 데이터 정제하여 정적데이터로 활용
*/

interface I_SmokeZoneData {
  latitude: number;
  longitude: number;
  address: string; //경기도 의정부시 ~~
}

const smokeZoneDummyData: I_SmokeZoneData[] = [
  {
    latitude: 37.57056298981,
    longitude: 126.97779632169,
    address: "서울특별시 종로구 종로 1 (종로1가)",
  },
  {
    latitude: 37.574912399424,
    longitude: 126.9789650731,
    address: "서울특별시 종로구 종로1길 50 (중학동)",
  },
  {
    latitude: 37.501328668708,
    longitude: 127.03953821497,
    address: "서울특별시 강남구 테헤란로 212 (역삼동)",
  },
  {
    latitude: 37.4811802,
    longitude: 126.9503221,
    address: "서울특별시 관악구 남부순환로 1802 (봉천동, 관악캠퍼스타워)",
  },
  {
    latitude: 37.480976,
    longitude: 126.9521426,
    address: "서울특별시 관악구 남부순환로 1820 (봉천동, 에그엘로우)",
  },
  {
    latitude: 37.6546316,
    longitude: 127.062605,
    address: "서울특별시 노원구 노해로 492-2 (상계동, 가로판매대)",
  },
  {
    latitude: 37.6138821,
    longitude: 127.0776975,
    address: "서울특별시 중랑구 동일로 932 (묵동, 묵동자이아파트)",
  },
  {
    latitude: 37.4810982,
    longitude: 126.9509341,
    address: "서울특별시 관악구 남부순환로 1808 (봉천동, 관악센츄리타워)",
  },
  {
    latitude: 37.481559958259,
    longitude: 126.95219601817,
    address: "서울특별시 관악구 남부순환로 1817 (봉천동, Q타워)",
  },
  {
    latitude: 37.5665,
    longitude: 126.978,
    address: "서울특별시 중구 세종대로 110 (서울시청)",
  },
];

export default smokeZoneDummyData;
