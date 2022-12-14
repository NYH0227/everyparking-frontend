import React, { useEffect, useState } from "react";
import {
  CButton, CCard, CCardBody, CCardHeader, CCol, CDropdown, CDropdownItem, CDropdownMenu,
  CDropdownToggle, CFormInput, CFormSelect, CModal, CModalBody, CModalFooter, CModalHeader,
  CModalTitle, CRow
} from "@coreui/react";
import { MDBContainer, MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";
import CIcon from "@coreui/icons-react";
import { cilCarAlt, cilLocationPin, cilMoney, cilScreenSmartphone, cilUser } from "@coreui/icons";
import ParkingService from "../service/ParkingService";
import Common from "../common/Common"



const DashMyInfo = (x) => {

  const [inputPhone,setInputPhone] = useState("")
  const [inputIntroduce,setInputIntroduce] = useState("")

  const [selectCity,setSelectCity] = useState("")
  const [showTel,setShowTel] = useState("")
  const [showIntro,setShowIntro] = useState("")


  const [updateTel, setUpdateTel] = useState(false)
  const [updateIntroduce, setUpdateIntroduce] = useState(false)
  const [updateCity, setUpdateCity] = useState(false)

  const [cities,setCities] = useState([])
  const [myPoint,setMyPoint] = useState(0)

  useEffect(() => {
    setShowTel(x.tel);
    setSelectCity(x.city);
    setShowIntro(x.introduce);
    setInputIntroduce(x.introduce);
    setInputPhone(x.tel)
  }, [x]);

  const handleUpdateOnClick = (tel,intro,city) => {
    if(tel === undefined || "") tel = x.tel
    if(intro === undefined || "") intro = x.introduce
    if(city === undefined || "") city = x.city

    ParkingService.editUserData(tel,intro,city)
      .then(res => {
        console.log(res);
        setShowTel(tel);
        setSelectCity(city);
        setShowIntro(intro);
      })
      .catch((err) => console.log(err));
  }

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
            <strong>????????????</strong>
          </CCardHeader>
          <CCardBody>
            <MDBContainer>
              <MDBListGroup style={{ width: "100%" }}>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{x.nickName}</strong>???, ???????????????.
                    <div className="small text-medium-emphasis">
                      {x.email}
                    </div>
                  </div>
                </MDBListGroupItem>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center small">
                  <div>
                    <CIcon icon={cilScreenSmartphone} /><strong> ????????????</strong> {phoneNumber(showTel)}
                  </div>
                  <CButton color="success" variant="outline" shape="rounded-pill" size="sm"
                           onClick={() => setUpdateTel(!updateTel)}>??????</CButton>
                  <CModal alignment="center" visible={updateTel} onClose={() => setUpdateTel(false)}>
                    <CModalHeader onClose={() => setUpdateTel(false)}>
                      <CModalTitle>???????????? ?????? ??????</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CFormInput type="text" value={inputPhone} onChange={(e) => setInputPhone(e.target.value)}></CFormInput>
                    </CModalBody>
                    <CModalFooter>
                      <CButton color="secondary" onClick={() => setUpdateTel(false)}>Close</CButton>
                      <CButton color="primary" onClick={() => {
                        setUpdateTel(false);
                        handleUpdateOnClick(inputPhone,inputIntroduce,selectCity);
                      }}>Save</CButton>

                    </CModalFooter>
                  </CModal>
                </MDBListGroupItem>

                <MDBListGroupItem className="d-flex justify-content-between align-items-center small">
                  <div>
                    <CIcon icon={cilLocationPin} /><strong> ?????? </strong> {selectCity}
                  </div>
                  <CButton color="success" variant="outline" shape="rounded-pill" size="sm"
                           onClick={() => {
                             setUpdateCity(!updateCity);
                             if (cities.length === 0) {
                               ParkingService.getCities()
                                 .then((res) => setCities(res.data === undefined || null ? [] : res.data))
                                 .catch((err) => console.log(err));
                             }
                           }}>??????</CButton>
                  <CModal alignment="center" visible={updateCity} onClose={() => setUpdateCity(false)}>
                    <CModalHeader onClose={() => setUpdateCity(false)}>
                      <CModalTitle>?????? ??????</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CFormSelect onChange={(e) => {
                        setSelectCity(e.target.value);
                        setUpdateCity(false);
                        handleUpdateOnClick(inputPhone,inputIntroduce,e.target.value);
                      }} required aria-label="select example">

                        <option>????????? ??????????????????</option>
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
                    <CIcon icon={cilMoney} /><strong> ????????? </strong> {myPoint === 0 ? x.point : Common.moneyFormat(myPoint)}???
                  </div>
                  <CButton color="success" variant="outline" shape="rounded-pill" size="sm"
                           onClick={() => getPoint()}>??????</CButton>
                </MDBListGroupItem>


                <MDBListGroupItem className="d-flex justify-content-between align-items-center small">
                  <div>
                    <CIcon icon={cilUser} /><strong> ???????????? </strong> {showIntro}
                  </div>
                  <CButton color="success" variant="outline" shape="rounded-pill" size="sm"
                           onClick={() => setUpdateIntroduce(!updateIntroduce)}>??????</CButton>
                  <CModal alignment="center" visible={updateIntroduce} onClose={() => setUpdateIntroduce(false)}>
                    <CModalHeader onClose={() => setUpdateIntroduce(false)}>
                      <CModalTitle>???????????? ??????</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CFormInput type="text" value={inputIntroduce}
                                  onChange={(e) => setInputIntroduce(e.target.value)}></CFormInput>
                    </CModalBody>
                    <CModalFooter>
                      <CButton color="secondary" onClick={() => setUpdateIntroduce(false)}>Close</CButton>
                      <CButton color="primary" onClick={() => {
                        setUpdateIntroduce(false);
                        handleUpdateOnClick(inputPhone,inputIntroduce,selectCity);
                      }}>Save</CButton>
                    </CModalFooter>
                  </CModal>
                </MDBListGroupItem>

                <MDBListGroupItem className="d-flex justify-content-between align-items-center small">
                  <div>
                    <CIcon icon={cilCarAlt} /><strong> ????????? </strong> ????????? ????????? {x.myCars.length}???
                  </div>
                  <CDropdown>
                    <CDropdownToggle color="success" variant="outline" size="sm">??????</CDropdownToggle>
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