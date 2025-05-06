const getSmokeZoneData = async () => {
  const res = await fetch(""); //공공 데이터 가져오기...
  //데이터를 특수한 형태로 정제
  const data = await res.json();
  return data;
};

export default async function MapConatiner({}) {}
