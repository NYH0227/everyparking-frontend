import React from "react";
import {
  CCard, CCardBody, CCardHeader, CCol,
  CProgress, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow
} from "@coreui/react";
import { MDBBadge } from "mdb-react-ui-kit";




const DashUserUsing = (x) => {

  const timeFormat = (time) => {
    return time[2] + "일 " +time[3]+"시"
  }

  const phoneFormat = (value) => {
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
                {x.places.map((item, idx) => (
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

                    {item.placeStatus === "inUse" ?
                      <CTableDataCell>
                        <div>아무개</div>
                        <div className="small text-medium-emphasis">
                          <strong>010-2222-3333</strong>
                        </div>
                        <div className="small text-medium-emphasis">
                          아우디(12나1234)
                        </div>
                      </CTableDataCell>
                      : <CTableDataCell></CTableDataCell>
                    }


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
  );
}

export default DashUserUsing;