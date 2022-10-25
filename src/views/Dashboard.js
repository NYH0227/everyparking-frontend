import React, { useEffect, useState } from "react";

import {
  CAvatar, CButton, CCard, CCardBody, CCardHeader,
  CCol,
  CProgress, CRow, CTable, CTableBody, CTableDataCell,
  CTableHead, CTableHeaderCell, CTableRow
} from "@coreui/react";
import ParkingService from "../service/ParkingService";
import DashMyInfo from "../components/DashMyInfo";
import { MDBBadge } from "mdb-react-ui-kit";


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

  const timeformat = (time) => {
    return time[2] + "일 " +time[3]+"시"
  }

  return (
    <>
      <DashMyInfo myCars={myCars} email={userData.email} nickName={userData.nickname}
                  city={userData.city} tel={userData.tel} point={userData.point} introduce={userData.introduce}
      />

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>내가 빌린 주차장</strong>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">이미지</CTableHeaderCell>
                    <CTableHeaderCell>장소</CTableHeaderCell>
                    <CTableHeaderCell>이용 시간</CTableHeaderCell>
                    <CTableHeaderCell>비용</CTableHeaderCell>
                    <CTableHeaderCell>등록자 정보</CTableHeaderCell>
                    <CTableHeaderCell>메세지</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {myUsing.map((item, idx) => (
                    <CTableRow v-for="item in tableItems" key={idx}>
                      <CTableDataCell className="text-center">
                        <img
                          src={item.placeImg}
                          alt=""
                          style={{ width: "50px", height: "50px" }}
                          className="rounded-circle"
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.placeAddr.split(":")[0]}</div>
                        <div className="small text-medium-emphasis">
                          {item.placeAddr.split(":")[1]}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="clearfix">
                          <div className="float-start">
                            <strong>50%</strong>
                          </div>
                          <div className="float-end">
                            <small className="text-medium-emphasis">{timeformat(item.startAt)} ~ {timeformat(item.endAt)}</small>
                          </div>
                        </div>
                        <CProgress thin color="success" value="50" />
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        {item.cost}원
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.renterName}</div>
                        <div className="small text-medium-emphasis">
                          {item.renterTel}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-medium-emphasis">
                          {item.message}
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>



      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>내가 빌려준 주차장</strong>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">이미지</CTableHeaderCell>
                    <CTableHeaderCell>별칭</CTableHeaderCell>
                    <CTableHeaderCell>장소</CTableHeaderCell>
                    <CTableHeaderCell>등록 시간</CTableHeaderCell>
                    <CTableHeaderCell>수익</CTableHeaderCell>
                    <CTableHeaderCell>이용자 정보</CTableHeaderCell>
                    <CTableHeaderCell>상태</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {myPlaces.map((item, idx) => (
                    <CTableRow v-for="item in tableItems" key={idx}>
                      <CTableDataCell className="text-center">
                        <img
                          src={item.imgUrl}
                          alt=""
                          style={{ width: "50px", height: "50px" }}
                          className="rounded-circle"
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.name}
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.addr.split(":")[0]}</div>
                        <div className="small text-medium-emphasis">
                          {item.addr.split(":")[1]}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="clearfix">
                          <div className="float-start">
                            <strong>50%</strong>
                          </div>
                          <div className="float-end">
                            <small className="text-medium-emphasis">{item.startTime} ~ 5일 6시</small>
                          </div>
                        </div>
                        <CProgress thin color="success" value="50" />
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        1000원
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>아무개</div>
                        <div className="small text-medium-emphasis">
                          <strong>010-2222-3333</strong>
                        </div>
                        <div className="small text-medium-emphasis">
                          아우디(12나1234)
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.placeStatus === "waiting" ? <MDBBadge color="success" pill>등록가능</MDBBadge> : ""}
                        {item.placeStatus === "pending" ? <MDBBadge color="warning" pill>등록중</MDBBadge> : ""}
                        {item.placeStatus === "inUse" ? <MDBBadge color="danger" pill>이용중</MDBBadge> : ""}
                      </CTableDataCell>
                    </CTableRow>
                  ))}

                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>



      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>이용 내역</strong>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">이미지</CTableHeaderCell>
                    <CTableHeaderCell>장소</CTableHeaderCell>
                    <CTableHeaderCell>등록 시간</CTableHeaderCell>
                    <CTableHeaderCell>비용</CTableHeaderCell>
                    <CTableHeaderCell>상대방</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody style={{ overflow: "scroll" }}>
                    <CTableRow v-for="item in tableItems" key={1}>
                      <CTableDataCell>
                        5
                      </CTableDataCell>
                      <CTableDataCell>
                        4
                      </CTableDataCell>
                      <CTableDataCell>
                        3
                      </CTableDataCell>
                      <CTableDataCell>
                        2
                      </CTableDataCell>
                      <CTableDataCell>
                        1
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
