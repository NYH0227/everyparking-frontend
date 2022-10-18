import ParkingService, { CLIENT_PATH } from "../service/ParkingService";
import {useState} from "react";
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
  CFormLabel,
  CRow
} from "@coreui/react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function SignIn() {

    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const history = useNavigate()

    const handleLoginOnClick = () => {
        ParkingService.postSignIn(email,password)
            .then((res) => {
                console.log(res)
                localStorage.setItem("jwt",res.data.data)

                setEmail("")
                setPassword("")

                Swal.fire(res.data.message,"","success")
                window.location.href = CLIENT_PATH
                history("/Home")
                }
            )
            .catch((err) => Swal.fire(err.response.data.message,"","error"))
    }

    return (
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>로그인</strong>
            </CCardHeader>
            <CCardBody>
              <CForm validated={true}>
                <div className="mb-3">
                  <CFormLabel htmlFor="validationTextarea" className="form-label">
                    이메일
                  </CFormLabel>
                  <CFormInput type="text" value={email} onChange={(e) => setEmail(e.target.value)} ></CFormInput>
                  <CFormFeedback invalid>이메일을 입력해주세요</CFormFeedback>
                </div>


                <div className="mb-3">
                  <CFormLabel htmlFor="validationTextarea" className="form-label">
                    비밀번호
                  </CFormLabel>
                  <CFormInput type="password" value={password} onChange={(e) => setPassword(e.target.value)}></CFormInput>
                  <CFormFeedback invalid>비밀번호를 입력해주세요</CFormFeedback>
                </div>

                <div className="mb-2">
                  <CButton color="primary" onClick={handleLoginOnClick}>
                    로그인
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

    );
}

export default SignIn;