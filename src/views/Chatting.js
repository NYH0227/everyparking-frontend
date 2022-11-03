import React from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";

const Chatting = () => {

  return (
    <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Chat</strong>
            </CCardHeader>
            <CCardBody>
              Comeing Soon
            </CCardBody>
          </CCard>
        </CCol>
    </CRow>
  );
}

export default Chatting;
