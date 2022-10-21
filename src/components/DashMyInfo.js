import React, { useEffect, useState } from "react";
import {
  CButton, CCard, CCardBody, CCardHeader, CCol, CDropdown, CDropdownItem, CDropdownMenu,
  CDropdownToggle, CFormInput, CFormSelect, CModal, CModalBody, CModalFooter, CModalHeader,
  CModalTitle, CRow
} from "@coreui/react";
import { MDBContainer, MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";
import CIcon from "@coreui/icons-react";
import { cilCarAlt, cilEnvelopeClosed, cilLocationPin, cilMoney, cilScreenSmartphone, cilUser } from "@coreui/icons";
import ParkingService from "../service/ParkingService";



const DashMyInfo = (x) => {

  const [inputEmail,setInputEmail] = useState("")
  const [inputPhone,setInputPhone] = useState("")
  const [inputIntroduce,setInputIntroduce] = useState("")
  const [updateTel, setUpdateTel] = useState(false)
  const [updateEmail, setUpdateEmail] = useState(false)
  const [updateIntroduce, setUpdateIntroduce] = useState(false)
  const [updateCity, setUpdateCity] = useState(false)

  const [cities,setCities] = useState([])
  const [myPoint,setMyPoint] = useState(0)


  const getPoint = () => {
    ParkingService.getPoint()
      .then((res) => {
        console.log(res);
        setMyPoint(res.data.data.point)
      })
      .catch((err) => console.log(err));
  }

  function phoneNumber(value) {
    if(value) {
      value = value.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1-$2-$3");
      return "+82 " + value.slice(1,value.length);
    }
    return value
  }

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>기본정보</strong>
          </CCardHeader>
          <CCardBody>
            <MDBContainer>
              <MDBListGroup style={{ width: "100%" }}>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{x.nickName}</strong>님, 환영합니다.
                    <div className="small text-medium-emphasis">
                      {x.email}
                    </div>
                  </div>
                </MDBListGroupItem>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center small">
                  <div>
                    <CIcon icon={cilScreenSmartphone} /><strong> 휴대전화</strong> {phoneNumber(x.tel)}
                  </div>

                  <CButton color="success" variant="outline" shape="rounded-pill" size="sm"
                           onClick={() => setUpdateTel(!updateTel)}>수정</CButton>
                  <CModal alignment="center" visible={updateTel} onClose={() => setUpdateTel(false)}>
                    <CModalHeader onClose={() => setUpdateTel(false)}>
                      <CModalTitle>휴대전화 번호 수정</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CFormInput type="text" value={inputPhone} onChange={(e) => setInputPhone(e.target.value)}></CFormInput>
                    </CModalBody>
                    <CModalFooter>
                      <CButton color="secondary" onClick={() => setUpdateTel(false)}>Close</CButton>
                      <CButton color="primary" onClick={() => {
                        setUpdateTel(false);
                        setInputPhone("");
                      }}>Save</CButton>

                    </CModalFooter>
                  </CModal>

                </MDBListGroupItem>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center small">
                  <div>
                    <CIcon icon={cilEnvelopeClosed} /><strong> 이메일 </strong> {x.email}
                  </div>
                  <CButton color="success" variant="outline" shape="rounded-pill" size="sm"
                           onClick={() => setUpdateEmail(!updateEmail)}>수정</CButton>
                  <CModal alignment="center" visible={updateEmail} onClose={() => setUpdateEmail(false)}>
                    <CModalHeader onClose={() => setUpdateEmail(false)}>
                      <CModalTitle>이메일 수정</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CFormInput type="email" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)}></CFormInput>
                    </CModalBody>
                    <CModalFooter>
                      <CButton color="secondary" onClick={() => setUpdateEmail(false)}>Close</CButton>
                      <CButton color="primary" onClick={() => {

                        setUpdateEmail(false);
                        setInputEmail("");
                      }}>Save</CButton>

                    </CModalFooter>
                  </CModal>
                </MDBListGroupItem>

                <MDBListGroupItem className="d-flex justify-content-between align-items-center small">
                  <div>
                    <CIcon icon={cilLocationPin} /><strong> 지역 </strong> {x.city}
                  </div>
                  <CButton color="success" variant="outline" shape="rounded-pill" size="sm"
                           onClick={() => {
                             setUpdateCity(!updateCity);
                             if(cities.length === 0) {
                               ParkingService.getCities()
                                 .then((res) => setCities(res.data === undefined || null ? [] : res.data))
                                 .catch((err) => console.log(err))
                             }
                           }}>수정</CButton>
                  <CModal alignment="center" visible={updateCity} onClose={() => setUpdateCity(false)}>
                    <CModalHeader onClose={() => setUpdateCity(false)}>
                      <CModalTitle>지역 수정</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CFormSelect onChange={(e) => console.log(e.target.value)} required aria-label="select example">
                        <option>지역을 선택해주세요</option>
                        {cities.map((x, index) =>
                          <option value={x} key={index}>{x}</option>
                        )}
                      </CFormSelect>
                    </CModalBody>
                    <CModalFooter>
                      <CButton color="secondary" onClick={() => setUpdateCity(false)}>Close</CButton>
                    </CModalFooter>
                  </CModal>
                </MDBListGroupItem>

                <MDBListGroupItem className="d-flex justify-content-between align-items-center small">
                  <div>
                    <CIcon icon={cilMoney} /><strong> 소지금 </strong> {myPoint === 0 ? x.point : myPoint}원
                  </div>
                  <CButton color="success" variant="outline" shape="rounded-pill" size="sm"
                           onClick={() => getPoint()}>충전</CButton>
                </MDBListGroupItem>

                <MDBListGroupItem className="d-flex justify-content-between align-items-center small">
                  <div>
                    <CIcon icon={cilUser} /><strong> 자기소개 </strong> {x.introduce}
                  </div>
                  <CButton color="success" variant="outline" shape="rounded-pill" size="sm"
                           onClick={() => setUpdateIntroduce(!updateIntroduce)}>수정</CButton>
                  <CModal alignment="center" visible={updateIntroduce} onClose={() => setUpdateIntroduce(false)}>
                    <CModalHeader onClose={() => setUpdateIntroduce(false)}>
                      <CModalTitle>자기소개 수정</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CFormInput type="text" value={inputIntroduce} onChange={(e) => setInputIntroduce(e.target.value)}></CFormInput>
                    </CModalBody>
                    <CModalFooter>
                      <CButton color="secondary" onClick={() => setUpdateIntroduce(false)}>Close</CButton>
                      <CButton color="primary" onClick={() => {

                        setUpdateIntroduce(false);
                        setInputIntroduce("");
                      }}>Save</CButton>

                    </CModalFooter>
                  </CModal>
                </MDBListGroupItem>

                <MDBListGroupItem className="d-flex justify-content-between align-items-center small">
                  <div>
                    <CIcon icon={cilCarAlt} /><strong> 자동차 </strong> 등록된 자동차 {x.myCars.length}대
                  </div>
                  <CDropdown>
                    <CDropdownToggle color="success" variant="outline" size="sm">보기</CDropdownToggle>
                    <CDropdownMenu>
                      {x.myCars.map((item, idx) =>
                        <CDropdownItem key={idx}>
                          {item.carModel + "(" + item.carSize + ") " + item.carNumber}
                        </CDropdownItem>
                      )}
                    </CDropdownMenu>
                  </CDropdown>
                </MDBListGroupItem>
              </MDBListGroup>
            </MDBContainer>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default DashMyInfo;