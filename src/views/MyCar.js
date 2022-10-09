import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react'
import ParkingService from "../service/ParkingService";
import Swal from "sweetalert2";

const MyCar = () => {

  const [size,setSize] = useState([])
  const [carNum,setCarNum] = useState()
  const [carModel,setCarModel] = useState()
  const [carSize,setCarSize] = useState()

  useEffect(()=>{
    ParkingService.getCarType()
      .then((res) => setSize(res.data))
      .catch((err) => console.log(err))
  },[])

  const handleAddCar = () => {
    ParkingService.postAddCar(carNum,carModel,carSize)
      .then((res) => {
        Swal.fire(res.data.message,"","success")
        setCarNum("")
        setCarModel("")
      })
      .catch((err) => console.log(err.response))
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>내 차 등록</strong>
          </CCardHeader>
          <CCardBody>
            <CForm validated={true}>
              <div className="mb-3">
                <CFormLabel htmlFor="validationTextarea" className="form-label">
                  차 번호
                </CFormLabel>
                <CFormInput type="text" value={carNum} onChange={(e) => setCarNum(e.target.value)}></CFormInput>
                <CFormFeedback invalid>차 번호를 입력해주세요</CFormFeedback>
              </div>


              <div className="mb-3">
                <CFormLabel htmlFor="validationTextarea" className="form-label">
                  차 모델
                </CFormLabel>
                <CFormInput type="text" value={carModel} onChange={(e) => setCarModel(e.target.value)}></CFormInput>
                <CFormFeedback invalid>차 모델을 입력해주세요</CFormFeedback>
              </div>


              <div className="mb-3">
                <CFormLabel htmlFor="validationTextarea" className="form-label">
                  차 사이즈
                </CFormLabel>
                <CFormSelect onChange={(e) => setCarSize(e.target.value)} required aria-label="select example">
                  <option>차 사이즈을 선택해주세요</option>

                  {size.map((x, index) =>
                    <option value={x} key={index}>{x}</option>
                  )}

                </CFormSelect>
                <CFormFeedback invalid>Example invalid select feedback</CFormFeedback>
              </div>

              <div className="mb-3">
                <CButton color="primary" onClick={handleAddCar}>
                  차 등록하기
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default MyCar;
