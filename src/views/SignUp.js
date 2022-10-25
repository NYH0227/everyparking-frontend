import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import ParkingService, { swalIcon } from "../service/ParkingService";
import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel, CFormSelect,
  CRow
} from "@coreui/react";

function SignUp() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [tel,setTel] = useState("")
    const [nickname,setNickname] = useState("")
    const [city,setCity] = useState("")
    const [cities,setCities] = useState([])


    useEffect(() => {
        ParkingService.getCities()
            .then((res) => setCities(res.data))
            .catch((err) => console.log(err))
    },[])

    const handleSignUpOnclick = () => {
        ParkingService.postSignUp(city,email,nickname,password,tel)
            .then((res) => {

                Swal.fire(res.data.message)
                setEmail("")
                setPassword("")
                setTel("")
                setNickname("")
                setCity("")

            }).catch((err) => {
                console.log(err)
                Swal.fire({
                    icon: swalIcon.ERROR,
                    title: '회원가입 실패',
                    text: '회원가입 도중 오류가 발생하였습니다',
                    footer: err.message
                })
            })
    }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>회원가입</strong>
          </CCardHeader>
          <CCardBody>
            <CForm validated={true}>
              <div className="mb-3">
                <CFormLabel htmlFor="validationTextarea" className="form-label">
                  이메일
                </CFormLabel>
                <CFormInput type="email" value={email} onChange={(e) => setEmail(e.target.value)}></CFormInput>
                <CFormFeedback invalid>이메일을 입력해주세요</CFormFeedback>
              </div>


              <div className="mb-3">
                <CFormLabel htmlFor="validationTextarea" className="form-label">
                  비밀번호
                </CFormLabel>
                <CFormInput type="password" minLength={8} maxLength={16} value={password}
                            onChange={(e) => setPassword(e.target.value)}></CFormInput>
                <CFormFeedback invalid>비밀번호를 입력해주세요</CFormFeedback>
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="validationTextarea" className="form-label">
                  닉네임
                </CFormLabel>
                <CFormInput type="text" value={nickname} onChange={(e) => setNickname(e.target.value)}></CFormInput>
                <CFormFeedback invalid>닉네임을 입력해주세요</CFormFeedback>
              </div>


              <div className="mb-3">
                <CFormLabel htmlFor="validationTextarea" className="form-label">
                  전화번호
                </CFormLabel>
                <CFormInput type="text" value={tel} onChange={(e) => setTel(e.target.value)}></CFormInput>
                <CFormFeedback invalid>전화번호를 입력해주세요</CFormFeedback>
              </div>


              <div className="mb-3">
                <CFormLabel htmlFor="validationTextarea" className="form-label">
                  지역
                </CFormLabel>
                <CFormSelect onChange={(e) => setCity(e.target.value)} required aria-label="select example">
                  <option>지역을 선택해주세요</option>

                  {cities.map((x, index) =>
                    <option value={x} key={index}>{x}</option>
                  )}

                </CFormSelect>
                <CFormFeedback invalid>Example invalid select feedback</CFormFeedback>
              </div>
              <div className="mb-3">
                <CButton color="primary" onClick={handleSignUpOnclick}>
                  회원가입
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default SignUp;