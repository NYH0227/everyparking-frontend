import React, { useEffect, useState } from "react";

import {
  CCard, CCardBody, CCardHeader, CCol,
  CProgress, CRow, CTable, CTableBody, CTableDataCell,
  CTableHead, CTableHeaderCell, CTableRow
} from "@coreui/react";

import ParkingService from "../service/ParkingService";
import Common from "../common/Common"
import DashMyInfo from "../components/DashMyInfo";
import DashMyUsing from "../components/DashMyUsing";
import DashUserUsing from "../components/DashUserUsing";


const Dashboard = () => {

  const [myCars, setMyCars] = useState([]);
  const [myPlaces, setMyPlaces] = useState([])
  const [userData,setUserData] = useState([]);

  const [myUsing,setMyUsing] = useState([]);
  const [userUsing,setUserUsing] = useState([]);
  const [myLog, setMyLog] = useState([]);


  useEffect(() => {
    ParkingService.userData()
      .then((res) => {
        console.log("Data",res.data.data);
        setMyCars(res.data.data.cars === undefined || null ? [] : res.data.data.cars);
        setMyPlaces(res.data.data.places === undefined || null ? [] : res.data.data.places);
        setUserData(res.data.data  === undefined || null ? [] : res.data.data);
        setMyUsing(res.data.data.myUsing === undefined || null ? [] : res.data.data.myUsing);
        setUserUsing(res.data.data.userUsing === undefined || null ? [] : res.data.data.userUsing);
        setMyLog(res.data.data.used === undefined || null ? [] : res.data.data.used);
      })
      .catch((err) => console.log(err))
  }, []);


  return (
    <>
      <DashMyInfo myCars={myCars} email={userData.email} nickName={userData.nickname}
                  city={userData.city} tel={userData.tel} point={userData.point} introduce={userData.introduce} />
      <DashMyUsing myUsing={myUsing} />
      <DashUserUsing userUsing={userUsing} places={myPlaces} />


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
                    <CTableHeaderCell className="text-center">내역</CTableHeaderCell>
                    <CTableHeaderCell>금액</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody style={{overflow: "scroll" }}>
                  {myLog.map((item, idx) => (
                    <CTableRow v-for="item in tableItems" key={idx}>
                      <CTableDataCell className="text-center">
                        {Common.setMoment(item.createAt).subtract(1, "M").format("YYYY년 MM월 DD일 HH시")}
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong>{item.renterName}</strong>님이 <strong>{item.borrowerName}</strong>님의 {item.addr.split(":")[0]} 주차장을 <br />
                        ( <small>{Common.timeView(item.startAt, item.endAt)}</small> ) 까지 이용하셨습니다.
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.borrowerName === userData.nickname ? "+" : "-"}
                        {Common.moneyFormat(Common.diffTime(item.startAt, item.endAt) * item.cost)}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
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
