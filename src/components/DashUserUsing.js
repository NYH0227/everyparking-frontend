import React  from "react";
import {
  CCard, CCardBody, CCardHeader, CCol,
  CProgress, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow
} from "@coreui/react";
import { MDBBadge } from "mdb-react-ui-kit";
import Common from "../common/Common"



const DashUserUsing = (x) => {

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
                  <CTableHeaderCell>이용자 정보</CTableHeaderCell>
                  <CTableHeaderCell>상태</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {x.userUsing.map((item, idx) => (
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
                      {item.placeName}
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.placeAddr.split(":")[0]}</div>
                      <div className="small text-medium-emphasis">
                        {item.placeAddr.split(":")[1]}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="clearfix">
                        <div className="float-end">
                          <strong>{Common.timePer(item.startAt,item.endAt)>=100 ? "예약중": Common.timePer(item.startAt,item.endAt)+"%"}</strong>
                        </div>
                        <div className="float-start">
                          <small className="text-medium-emphasis">
                            {Common.timeRangeM(item.startAt, item.endAt)}
                          </small>
                        </div>
                      </div>
                      <CProgress thin color="success" value={Common.timePer(item.startAt,item.endAt)>=100 ? "0": Common.timePer(item.startAt,item.endAt)} />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.borrowerName}</div>
                      <div className="small text-medium-emphasis">
                        <strong>{Common.phoneFormat(item.borrowerTel)}</strong>
                      </div>
                      <div className="small text-medium-emphasis">
                        {item.carModel + "(" + item.carNumber + ")"}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <MDBBadge color="danger" pill>이용중</MDBBadge>
                    </CTableDataCell>
                  </CTableRow>
                ))}


                {x.places.map((item, idx) => {
                  if (item.placeStatus === "inUse") {
                    return "";
                  }
                  return (
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
                      <CTableDataCell> </CTableDataCell>
                      <CTableDataCell> </CTableDataCell>
                      <CTableDataCell>
                        {item.placeStatus === "waiting" ? <MDBBadge color="success" pill>등록가능</MDBBadge> : ""}
                        {item.placeStatus === "pending" ? <MDBBadge color="warning" pill>등록중</MDBBadge> : ""}
                      </CTableDataCell>
                    </CTableRow>
                  );
                })}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default DashUserUsing;