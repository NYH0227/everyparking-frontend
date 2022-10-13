import React, { useEffect, useState } from "react";
import ParkingService from "../service/ParkingService";
import { MDBAccordion, MDBAccordionItem } from "mdb-react-ui-kit";
import { MDBBadge,MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CButton, CFormInput, CFormLabel, CFormSelect } from "@coreui/react";


const Rent = () => {

  const [myPlaces, setMyPlaces] = useState([]);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [cost, setCost] = useState();
  const [message, setMessage] = useState();
  const [placeId, setPlaceId] = useState();
  const [placeSize, setPlaceSize] = useState("")


  useEffect(() => {
    getMyPlacessFuc()
  }, []);

  const getMyPlacessFuc = () => {
    ParkingService.getMyPlaces()
      .then((res) => {
        setMyPlaces(res.data.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

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
        locale="pt-BR"
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
        locale="pt-BR"
        showTimeSelect
        timeFormat="p"
        timeIntervals={60}
        dateFormat="MM월 dd일 h시 aa"
      />
    );
  };

  const handleDataOnClick = () => {

    ParkingService.postRentPlaceData(startTime.toISOString(), endTime.toISOString(), cost, message, placeId)
      .then((res) => {
        console.log(res);
        getMyPlacessFuc()
        Swal.fire(res.data.message, "", "success");

        setMessage("");
        setCost("");
        setPlaceId("");
        setPlaceSize("");

      })

      .catch((err) => {
        console.log("err",err.response.data.errorList)
        Swal.fire(err.response.data.errorList[0].message, "", "error");
      });


  };

  return (
    <div>
      <MDBAccordion initialActive={0}>
        <MDBAccordionItem collapseId={1} onClick={handleSelectPlace} headerTitle="장소선택">
          <MDBTable align="middle">
            <MDBTableHead>
              <tr>
                <th scope="col">장소</th>
                <th scope="col">세부주소</th>
                <th scope="col">상태</th>
                <th scope="col">Actions</th>
              </tr>
            </MDBTableHead>

            <MDBTableBody>
              {myPlaces &&
                myPlaces.map((item, idx) =>
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
                          <p className="text-muted mb-0">{item.addr}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">{item.message}</p>
                    </td>
                    <td>
                      {item.borrow ? <MDBBadge color="danger" pill>
                        대여중
                      </MDBBadge> : <MDBBadge color="info" pill>
                        대여가능
                      </MDBBadge>}
                    </td>
                    <td>
                      {item.id == placeId ?
                        <CButton color="info" value={item.id} onClick={(e) => setPlaceId(e.target.value)}>선택중</CButton>
                        :
                        <CButton color="success" value={item.id} disabled={item.borrow}
                                 onClick={(e) => {
                                   setPlaceSize(item.placeSize)
                                   setPlaceId(e.target.value);
                                 }}>선택</CButton>
                      }
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
                <th scope="col">비용</th>
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
                  <CFormInput type="text" placeholder="0" value={cost} onChange={(e) => {
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