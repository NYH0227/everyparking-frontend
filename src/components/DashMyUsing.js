import React from "react";
import {
  CCard, CCardBody, CCardHeader, CCol,
  CProgress, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow
} from "@coreui/react";
import moment from "moment";
import Common from "../common/Common"

const DashMyUsing = (x) => {


  const leftTimeView = (borrowStartAt, borrowEndAt, rentStartAt, rentEndAt) => {
    const now = moment(new Date).add(2, "M")
    const borrowStart = Common.setMoment(borrowStartAt)

    if(now.isBefore(borrowStart)){
      return (
        <CTableDataCell>
          <div className="clearfix">
            <strong>{borrowStart.diff(now, "hour")}시간 후 시작</strong>
          </div>
        </CTableDataCell>
      );
    }

    return (
      <CTableDataCell>
        <div className="clearfix">
          <div className="float-start">
            <strong className="text-medium-emphasis">
              {Common.timeRange(borrowStartAt,borrowEndAt)}
            </strong>
          </div>
          <div className="float-end">
            <strong>
              {Common.timePer(rentStartAt,rentEndAt)}%
            </strong>
          </div>
        </div>
        <CProgress thin color="success" value={Common.timePer(rentStartAt,rentEndAt)} />
      </CTableDataCell>
    )
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
                  <CTableHeaderCell>남은시간</CTableHeaderCell>
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

                    {leftTimeView(item.borrowStartAt,item.borrowEndAt,item.rentStartAt,item.rentEndAt)}

                    <CTableDataCell className="text-center">
                      {item.allCost}원
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.renterName}</div>
                      <div className="small text-medium-emphasis">
                        {Common.phoneFormat(item.renterTel)}
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