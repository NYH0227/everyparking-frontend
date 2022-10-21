import React, { useEffect, useState } from "react";

import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,

  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcMastercard,
  cifUs,
  cilPeople,
  cilEnvelopeClosed,cilLocationPin,
  cilUser,
  cilScreenSmartphone,
  cilMoney,
} from '@coreui/icons'
import {
  MDBBadge,
  MDBContainer,
  MDBListGroup,
  MDBListGroupItem,
  MDBTable,
  MDBTableBody,
  MDBTableHead
} from "mdb-react-ui-kit";
import ParkingService from "../service/ParkingService";


const Dashboard = () => {

  const [myPlaces, setMyPlaces] = useState([]);
  const [myCars, setMyCars] = useState([]);
  const [userData,setUserData] = useState([]);

  const [borrowData,setBorrowData] = useState([]);


  const handleBorrowCancleOnClick = (borrowId) => {
    ParkingService.cancelBorrow(borrowId)
  }
  const tableExample = [
    {
      avatar: { status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    }
  ]

  useEffect(() => {
    ParkingService.userData()
      .then((res) => {
        console.log("userData",res.data);
        setMyCars(res.data.cars === undefined || null ? [] : res.data.cars);
        setMyPlaces(res.data.places === undefined || null ? [] : res.data.places);
        setUserData(res.data.data  === undefined || null ? [] : res.data.data);
        setBorrowData(res.data.myBorrows === undefined || null ? [] : res.data.myBorrows);
      })
      .catch((err) => console.log(err))
  }, []);

  const getPoint = () => {
    ParkingService.getPoint()
      .then((res) => console.log(res))
      .catch((err) => console.log(err))

  }


  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              기본정보
            </CCardHeader>
            <CCardBody>
              <MDBContainer>
                <MDBListGroup style={{ width: "100%" }}>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{userData.nickname}</strong>님, 환영합니다.
                      <div className="small text-medium-emphasis">
                        {userData.email}
                      </div>
                    </div>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center small">
                    <div>
                      <CIcon icon={cilScreenSmartphone} /><strong> 휴대전화</strong> +82 {userData.tel}
                    </div>
                    <MDBBadge color="primary">수정</MDBBadge>

                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center small">
                    <div>
                      <CIcon icon={cilEnvelopeClosed} /><strong> 이메일 </strong> {userData.email}
                    </div>
                    <MDBBadge color="primary">수정</MDBBadge>
                  </MDBListGroupItem>

                  <MDBListGroupItem className="d-flex justify-content-between align-items-center small">
                    <div>
                      <CIcon icon={cilLocationPin} /><strong> 지역 </strong> {userData.city}
                    </div>
                    <MDBBadge color="primary">수정</MDBBadge>
                  </MDBListGroupItem>

                  <MDBListGroupItem className="d-flex justify-content-between align-items-center small">
                    <div>
                      <CIcon icon={cilMoney} /><strong> 소지금 </strong> {userData.point}원
                    </div>
                    <MDBBadge color="primary">수정</MDBBadge>
                  </MDBListGroupItem>

                  <MDBListGroupItem className="d-flex justify-content-between align-items-center small">
                    <div>
                      <CIcon icon={cilUser} /><strong> 자기소개 </strong> {userData.introduce}
                    </div>
                    <MDBBadge color="primary">수정</MDBBadge>
                  </MDBListGroupItem>

                </MDBListGroup>
              </MDBContainer>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

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
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>장소</CTableHeaderCell>
                    <CTableHeaderCell>이용시간</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">가격</CTableHeaderCell>
                    <CTableHeaderCell>Activity</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {borrowData.map((item,idx) => (
                    <CTableRow v-for="item in tableItems" key={idx}>
                      <CTableDataCell className="text-center">

                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.rent.renterName}</div>
                        <div className="small text-medium-emphasis">
                          <span>{item.user.new ? "New" : "Recurring"}</span> | Registered:{" "}
                          {item.rent.message}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="clearfix">
                          <div className="float-start">
                            <strong>{item.usage.value}%</strong>
                          </div>
                          <div className="float-end">
                            <small className="text-medium-emphasis">{item.usage.period}</small>
                          </div>
                        </div>
                        <CProgress thin color={item.usage.color} value={item.usage.value} />
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        0원
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton color="success" onClick={() => handleBorrowCancleOnClick(item.borrowId)}>사용
                          종료</CButton>
                      </CTableDataCell>
                    </CTableRow>

                  ))}
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.user.name}</div>
                        <div className="small text-medium-emphasis">
                          <span>{item.user.new ? "New" : "Recurring"}</span> | Registered:{" "}
                          {item.user.registered}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="clearfix">
                          <div className="float-start">
                            <strong>{item.usage.value}%</strong>
                          </div>
                          <div className="float-end">
                            <small className="text-medium-emphasis">{item.usage.period}</small>
                          </div>
                        </div>
                        <CProgress thin color={item.usage.color} value={item.usage.value} />
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        0원
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton color="success" onClick={() => handleBorrowCancleOnClick(item.borrowId)}>사용
                          종료</CButton>
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
              <strong>등록한 장소</strong>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>장소</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">차</CTableHeaderCell>
                    <CTableHeaderCell>이용시간</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">가격</CTableHeaderCell>
                    <CTableHeaderCell>Activity</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell>

                      <CTableDataCell>
                        <div>{item.user.name}</div>
                        <div className="small text-medium-emphasis">
                          <span>{item.user.new ? "New" : "Recurring"}</span> | Registered:{" "}
                          {item.user.registered}
                        </div>
                      </CTableDataCell>

                      <CTableDataCell className="text-center">

                      </CTableDataCell>

                      <CTableDataCell>
                        <div className="clearfix">
                          <div className="float-start">
                            <strong>{item.usage.value}%</strong>
                          </div>
                          <div className="float-end">
                            <small className="text-medium-emphasis">{item.usage.period}</small>
                          </div>
                        </div>
                        <CProgress thin color={item.usage.color} value={item.usage.value} />
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        0원
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton color="success" onClick={() => handleBorrowCancleOnClick(item.borrowId)}>사용
                          종료</CButton>
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
              <strong>Thing of possession</strong>
            </CCardHeader>
            <CCardBody>
              <MDBTable align="middle" className="mb-5">
                <MDBTableHead>
                  <tr>
                    <th scope="col">내 장소</th>
                    <th scope="col">상태</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {myPlaces &&
                    myPlaces.map((item) =>
                      <tr key={item.id} id={item.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={item.imgUrl}
                              alt=""
                              style={{ width: "100px", height: "100px" }}
                              className="rounded-circle"
                            />
                            <div className="ms-3">
                              <p className="fw-bold mb-1">{item.name}</p>
                              <p className="text-muted mb-0">{item.addr.split(":").map(x => x + " ")}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          {item.placeStatus === "waiting" ? <MDBBadge color="success" pill>등록가능</MDBBadge> : ""}
                          {item.placeStatus === "pending" ? <MDBBadge color="warning" pill>등록중</MDBBadge> : ""}
                          {item.placeStatus === "inUse" ? <MDBBadge color="danger" pill>이용중</MDBBadge> : ""}
                        </td>
                      </tr>
                    )}
                </MDBTableBody>
                <br />

                <MDBTableHead>
                  <tr>
                    <th scope="col">내 자동차</th>
                    <th scope="col">차 번호</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {myCars &&
                    myCars.map((item, idx) =>
                      <tr key={item.idx} id={item.idx}>
                        <td>
                          <p className="fw-normal mb-1">{item.carModel}</p>
                        </td>
                        <td>
                          <p id="carN" className="fw-normal mb-1">{item.carNumber}</p>
                        </td>
                      </tr>)}
                </MDBTableBody>
              </MDBTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <button onClick={getPoint}>돈복사</button>
    </>
  );
}

export default Dashboard
