import React from "react";
import {
  CCard, CCardBody, CCardHeader, CCol,
  CProgress, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow
} from "@coreui/react";
import moment from "moment";




const DashMyUsing = (x) => {


  const RT = (time) => {
    return moment(time).subtract(1, "months").subtract(12, "hours")
  }
  const phoneFormat = (value) => {
    if(value) {
      value = value.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1-$2-$3");
    }
    return value
  }

  const diffTime = (startAt,endAt) => {

    const start = RT(startAt)
    const end = RT(endAt)

    console.log("start",start.toISOString())
    console.log("start2",start)
    console.log("end",end.toISOString())
    console.log("end2",end)
    console.log("result",Number(end.diff(start, "hours")))

    return 10;

    // return Number(end.diff(start, "hours"));
  }

  const leftTimeView = (startAt,endAt) => {
    const now = moment()
    const start = RT(startAt)
    const end = RT(endAt)

    if(now.isBefore(start)){
      return (
        <CTableDataCell>
          <div className="clearfix">
            <strong>{start.diff(now, "hour")}시간 후 시작</strong>
          </div>
        </CTableDataCell>
      );
    }

    return (
      <CTableDataCell>
        <div className="clearfix">
          <div className="float-start">
            <strong className="text-medium-emphasis">
              {start.format("DD일 HH시")} ~ {end.format("DD일 HH시")}
              {/*{leftTime(end.diff(now, "hour"))}시간 남음*/}
            </strong>
          </div>
          <div className="float-end">
            <strong>50%</strong>
          </div>
        </div>
        <CProgress thin color="success" value="50" />
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

                    {leftTimeView(item.startAt,item.endAt)}

                    <CTableDataCell className="text-center">
                      {diffTime(item.startAt,item.endAt)* item.cost}원
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