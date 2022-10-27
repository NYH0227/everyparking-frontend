import React, { useEffect, useState } from "react";

import {
  CAvatar, CButton, CCard, CCardBody, CCardHeader,
  CCol,
  CProgress, CRow, CTable, CTableBody, CTableDataCell,
  CTableHead, CTableHeaderCell, CTableRow
} from "@coreui/react";
import ParkingService from "../service/ParkingService";
import DashMyInfo from "../components/DashMyInfo";


const Dashboard = () => {

  const [myPlaces, setMyPlaces] = useState([]);
  const [myCars, setMyCars] = useState([]);
  const [userData, setUserData] = useState([]);
  const [borrowData, setBorrowData] = useState([]);

  const tableExample = [
    { usage: "test" }];

  useEffect(() => {
    ParkingService.userData()
      .then((res) => {
        console.log("userData", res.data.data);
        setMyCars(res.data.data.cars === undefined || null ? [] : res.data.data.cars);
        setMyPlaces(res.data.data.places === undefined || null ? [] : res.data.data.places);
        setUserData(res.data.data === undefined || null ? [] : res.data.data);
        setBorrowData(res.data.data.myBorrows === undefined || null ? [] : res.data.data.myBorrows);

      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <>
      <DashMyInfo myCars={myCars} email={userData.email} nickName={userData.nickname}
                  city={userData.city} tel={userData.tel} point={userData.point} introduce={userData.introduce}
      />

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>대여한 주차장</strong>
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
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <img
                          src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf1bIIPOkf36NbCVsxbANB0d82fqVptx30wA&usqp=CAU"}
                          alt=""
                          style={{ width: "50px", height: "50px" }}
                          className="rounded-circle"
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>무네미로 448번길</div>
                        <div className="small text-medium-emphasis">
                          학교 5기술관 앞 주차장
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="clearfix">
                          <div className="float-start">
                            <strong>{item.usage.value}%</strong>
                          </div>
                          <div className="float-end">
                            <small className="text-medium-emphasis">5일 5시 ~ 5일 6시</small>
                          </div>
                        </div>
                        <CProgress thin color={item.usage.color} value={item.usage.value} />
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        1000원
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>아무개</div>
                        <div className="small text-medium-emphasis">
                          010-2222-3333
                        </div>
                        <div>ss</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-medium-emphasis">
                          어린이 보호구역 입니다.
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
              <strong>내 장소</strong>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">이미지</CTableHeaderCell>
                    <CTableHeaderCell>장소</CTableHeaderCell>
                    <CTableHeaderCell>등록 시간</CTableHeaderCell>
                    <CTableHeaderCell>수익</CTableHeaderCell>
                    <CTableHeaderCell>이용자 정보</CTableHeaderCell>
                    <CTableHeaderCell>상태</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <img
                          src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf1bIIPOkf36NbCVsxbANB0d82fqVptx30wA&usqp=CAU"}
                          alt=""
                          style={{ width: "50px", height: "50px" }}
                          className="rounded-circle"
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>무네미로 448번길</div>
                        <div className="small text-medium-emphasis">
                          학교 5기술관 앞 주차장
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="clearfix">
                          <div className="float-start">
                            <strong>50%</strong>
                          </div>
                          <div className="float-end">
                            <small className="text-medium-emphasis">5일 5시 ~ 5일 6시</small>
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
                        사용중
                      </CTableDataCell>
                    </CTableRow>
                  ))}

                  <CTableRow v-for="item in tableItems" key="2">
                    <CTableDataCell className="text-center">
                      <img
                        src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf1bIIPOkf36NbCVsxbANB0d82fqVptx30wA&usqp=CAU"}
                        alt=""
                        style={{ width: "50px", height: "50px" }}
                        className="rounded-circle"
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>무네미로 448번길</div>
                      <div className="small text-medium-emphasis">
                        학교 5기술관 앞 주차장
                      </div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="clearfix">
                        <div className="float-start">
                          <strong>0%</strong>
                        </div>
                        <div className="float-end">
                          <small className="text-medium-emphasis">5일 5시 ~ 5일 6시</small>
                        </div>
                      </div>
                      <CProgress thin color="success" value="0" />
                    </CTableDataCell>

                    <CTableDataCell className="text-center">
                      1000원
                    </CTableDataCell>
                    <CTableDataCell>
                      대여자가 없습니다.
                    </CTableDataCell>
                    <CTableDataCell>
                      등록중
                    </CTableDataCell>
                  </CTableRow>

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
                    <CTableHeaderCell className="text-center">s</CTableHeaderCell>
                    <CTableHeaderCell>장소</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">차</CTableHeaderCell>
                    <CTableHeaderCell>이용날짜</CTableHeaderCell>
                    <CTableHeaderCell>가격</CTableHeaderCell>
                    <CTableHeaderCell>ㄴㄴ</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow v-for="item in tableItems" key={1}>
                    <CTableDataCell className="text-center">
                      6
                    </CTableDataCell>
                    <CTableDataCell>
                      5
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      4
                    </CTableDataCell>
                    <CTableDataCell>
                      3
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
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
};

export default Dashboard;
