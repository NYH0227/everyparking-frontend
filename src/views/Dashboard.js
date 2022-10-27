import React, { useEffect, useState } from "react";

import {
  CCard, CCardBody, CCardHeader, CCol,
  CProgress, CRow, CTable, CTableBody, CTableDataCell,
  CTableHead, CTableHeaderCell, CTableRow
} from "@coreui/react";

import ParkingService from "../service/ParkingService";
import DashMyInfo from "../components/DashMyInfo";
import DashMyUsing from "../components/DashMyUsing";
import DashUserUsing from "../components/DashUserUsing";


const Dashboard = () => {

  const [myCars, setMyCars] = useState([]);
  const [myPlaces, setMyPlaces] = useState([])
  const [userData,setUserData] = useState([]);

  const [myUsing,setMyUsing] = useState([]);
  const [userUsing,setUserUsing] = useState([])


  useEffect(() => {
    ParkingService.userData()
      .then((res) => {
        console.log("Data",res.data.data);
        setMyCars(res.data.data.cars === undefined || null ? [] : res.data.data.cars);
        setMyPlaces(res.data.data.places === undefined || null ? [] : res.data.data.places);
        setUserData(res.data.data  === undefined || null ? [] : res.data.data);
        setMyUsing(res.data.data.myUsing === undefined || null ? [] : res.data.data.myUsing);
        setUserUsing(res.data.data.userUsing === undefined || null ? [] : res.data.data.userUsing);

      })
      .catch((err) => console.log(err))
  }, []);


  return (
    <>
      <DashMyInfo myCars={myCars} email={userData.email} nickName={userData.nickname}
                  city={userData.city} tel={userData.tel} point={userData.point} introduce={userData.introduce} />
      <DashMyUsing myUsing={myUsing} />
      <DashUserUsing userUsing={userUsing} places={myPlaces}/>


      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>이용 내역</strong>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">날짜</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">로그</CTableHeaderCell>
                    <CTableHeaderCell>금액</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody style={{ overflow: "scroll" }}>
                  <CTableRow v-for="item in tableItems" key={1}>
                    <CTableDataCell className="text-center">
                      2022년 10월 16일 16시
                    </CTableDataCell>
                    <CTableDataCell>
                      나의 ( 장제로 161 ) 주소의 주차장을 <br/>
                      ( 테스트 ) 사용자가 ( 10월 16일 16시 ~ 17일 18시 )까지 이용하였습니다.
                    </CTableDataCell>
                    <CTableDataCell>
                      + 210000원
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}

export default Dashboard
