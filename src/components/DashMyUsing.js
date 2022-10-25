import React from "react";
import {
  CCard, CCardBody, CCardHeader, CCol,
  CProgress, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow
} from "@coreui/react";




const DashMyUsing = (x) => {

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
                {x.myUsing.map((item, idx) => (
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
                          <small
                            className="text-medium-emphasis">{timeFormat(item.startAt)} ~ {timeFormat(item.endAt)}</small>
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
                        {phoneFormat(item.renterTel)}
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
  );
}

export default DashMyUsing;