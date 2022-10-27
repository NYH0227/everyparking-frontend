import React, { useEffect, useState } from "react";
import ParkingService, { swalIcon } from "../service/ParkingService";
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody, MDBAccordion, MDBAccordionItem } from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CButton, CFormInput, CFormLabel } from "@coreui/react";
import moment from "moment";


const Rent = () => {

  const [myPlaces, setMyPlaces] = useState([]);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [cost, setCost] = useState(1000);
  const [message, setMessage] = useState("");
  const [placeId, setPlaceId] = useState(0);
  const [placeSize, setPlaceSize] = useState("");
  const [rendering,setRendering] = useState(true)

  useEffect(() => {
    getMyPlacessFuc();
  }, [rendering]);

  const getMyPlacessFuc = () => {
    ParkingService.getMyPlaces()
      .then((res) => {
        setMyPlaces(res.data.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSelectPlace = () => {
    if (myPlaces.length === 0) {
      Swal.fire("등록된 장소가 없습니다.");
    }
  };

  const StartTimepicker = () => {
    return (
      <DatePicker
        selected={startTime}
        onChange={(date) => setStartTime(date)}
        showTimeSelect
        timeFormat="p"
        timeIntervals={60}
        dateFormat="MM월 dd일 h시 aa"
      />
    );
  };

  const EndTimepicker = () => {
    return (
      <DatePicker
        selected={endTime}
        onChange={(date) => setEndTime(date)}
        showTimeSelect
        timeFormat="p"
        timeIntervals={60}
        dateFormat="MM월 dd일 h시 aa"
      />
    );
  };

  const handleDataOnClick = () => {
    ParkingService.postRentPlaceData(moment(startTime).add(12, "hours"), moment(endTime).add(12, "hours"), cost, message, placeId)
      .then((res) => {
        console.log(res);
        getMyPlacessFuc();
        Swal.fire(res.data.message, "", swalIcon.SUCCESS);

        setMessage("");
        setCost(1000);
        setPlaceId(0);
        setPlaceSize("");
      })
      .catch((err) => {
        console.log("err", err.response);
        console.log("err2", err.response.data);

        if(err.response.data.errorList !== undefined || null){
          Swal.fire(err.response.data.errorList[0].message, "", swalIcon.ERROR);
        }else{
          Swal.fire(err.response.data.message, "", swalIcon.ERROR);
        }
      });
  };

  const handleCancleOnclick = (placeId) => {
    ParkingService.cancelPlace(placeId)
      .then((res) => {
        console.log(res);
        setRendering(!rendering);
        Swal.fire(res.data.message, "", swalIcon.SUCCESS);
      })
      .catch((e) => {console.log(e)})
  }

  return (
    <div>
      <MDBAccordion initialActive={0}>
        <MDBAccordionItem collapseId={1} onClick={handleSelectPlace} headerTitle="장소선택">
          <MDBTable align="middle">
            <MDBTableHead>
              <tr>
                <th scope="col">장소</th>
                <th scope="col">상태</th>
                <th scope="col">Actions</th>
              </tr>
            </MDBTableHead>

            <MDBTableBody>
              {myPlaces &&
                myPlaces.map((item) =>
                  <tr key={item.id} id={item.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={item.imgUrl}
                          alt=""
                          style={{ width: "100px", height: "100px" }}
                          className="rounded-circle"
                        />
                        <div className="ms-3">
                          <p className="fw-bold mb-1">{item.name}</p>
                          <p className="text-muted mb-0">{item.addr.split(":").map(x => x + " ")}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      {item.placeStatus === "waiting" ? <MDBBadge color="success" pill>등록가능</MDBBadge> : ""}
                      {item.placeStatus === "pending" ? <MDBBadge color="warning" pill>등록중</MDBBadge> : ""}
                      {item.placeStatus === "inUse" ? <MDBBadge color="danger" pill>이용중</MDBBadge> : ""}
                    </td>

                    <td>
                      {item.placeStatus === "waiting" && item.id.toString() === placeId ?
                        <CButton color="info" value={item.id} onClick={(e) => setPlaceId(e.target.value)}>선택중</CButton> : ""}
                      {item.placeStatus === "waiting" && item.id.toString() !== placeId ?
                        <CButton color="success" value={item.id} disabled={item.borrow}
                                 onClick={(e) => {
                                   setPlaceSize(item.placeSize);
                                   setPlaceId(e.target.value);
                                 }}>선택</CButton> : ""}

                      {item.placeStatus === "pending" ? <CButton color="danger" onClick={() => handleCancleOnclick(item.id)}>취소하기</CButton> : ""}
                      {item.placeStatus === "inUse" ? <CButton color="danger" disabled={true} onClick={() => handleCancleOnclick(item.id)}>취소하기</CButton> : ""}

                    </td>
                  </tr>)}
            </MDBTableBody>
          </MDBTable>
        </MDBAccordionItem>

        <MDBAccordionItem collapseId={2} onClick={handleSelectPlace} headerTitle="시간">
          <MDBTable align="middle">
            <MDBTableHead>
              <tr>
                <th scope="col">시작시간</th>
                <th scope="col">종료시간</th>
                <th scope="col">시간당 비용</th>
                <th scope="col">주차장 크기</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <tr>
                <td>
                  <StartTimepicker />
                </td>
                <td>
                  <EndTimepicker />
                </td>
                <td>
                  <CFormInput type="text" placeholder="1000" value={cost} onChange={(e) => {
                    setCost(e.target.value);
                  }} />
                </td>
                <td>
                  <CFormInput type="text" placeholder="" value={placeSize} disabled onChange={(e) => {
                    setPlaceSize(e.target.value);
                  }} />
                </td>
              </tr>
            </MDBTableBody>
          </MDBTable>
        </MDBAccordionItem>

        <MDBAccordionItem collapseId={3} headerTitle="등록하기">
          <div className="mb-3">
            <CFormLabel htmlFor="validationTextarea" className="form-label">주의사항</CFormLabel>
            <CFormInput placeholder="상대방에게 보낼 메세지를 남겨주세요." type="text" value={message}
                        onChange={(e) => setMessage(e.target.value)}></CFormInput>
          </div>

          <CButton color="success" onClick={handleDataOnClick}>등록하기</CButton>
        </MDBAccordionItem>
      </MDBAccordion>

    </div>
  );
};

export default Rent;