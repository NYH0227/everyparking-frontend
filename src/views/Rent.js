import React, { forwardRef, useEffect, useState } from "react";
import ParkingService from "../service/ParkingService";
import { MDBAccordion, MDBAccordionItem, MDBBtn, MDBRipple } from "mdb-react-ui-kit";
import { MDBBadge,MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CButton, CFormInput } from "@coreui/react";
import { getElement } from "@coreui/coreui/js/src/util";


const Rent = () => {


  // 빌려져있으면 disable 기능
  // 선택 눌럿으면 그거만 ifo
  // required
  // 선택 누르면 다음 아코디언으로 넘어가기

  //const [startDate, setStartDate] = useState(new Date());


  const [myPlaces, setMyPlaces] = useState([]);
  const [startTime,setStartTime] = useState(new Date())
  const [endTime,setEndTime] = useState(new Date())
  const [cost,setCost] = useState()
  const [message,setMessage] = useState()
  const [placeId, setPlaceId] = useState()


  useEffect(() => {
    ParkingService.getMyPlaces()
      .then((res) => {
        setMyPlaces(res.data.data);
        console.log(res.data)
      })
      .catch((err) => console.log(err));

  }, []);

  const handleSelectPlace = () => {
    if(myPlaces.length === 0){
      Swal.fire("등록된 장소가 없습니다.")
    }
  }

  const StartTimepicker = () => {
    return (
      <DatePicker
        selected={startTime}
        onChange={(date) =>
          setStartTime(date)
        }
        locale="pt-BR"
        showTimeSelect
        timeFormat="p"
        timeIntervals={60}
        dateFormat="MM월 dd일 h:mm aa"
      />
    );
  }

  const EndTimepicker = () => {
    return (
      <DatePicker
        selected={endTime}
        onChange={
          (date) =>
            setEndTime(date)
        }
        locale="pt-BR"
        showTimeSelect
        timeFormat="p"
        timeIntervals={60}
        dateFormat="MM월 dd일 h:mm aa"
      />
    );
  }

  const handleDataOnClick = () => {
    console.log(startTime,startTime,cost,message,placeId)

    ParkingService.postRentPlaceData(startTime,endTime,cost,message,placeId)
      .then((res) => {
        console.log(res)
        Swal.fire(res.data.message,"","success")
        setMessage("")

      })
      .catch((err) => console.log(err))
    console.log("시작시간 ",startTime)
  }


  return (
    <div>
      <MDBAccordion alwaysOpen initialActive={0}>
        <MDBAccordionItem collapseId={1} onClick = {handleSelectPlace} headerTitle="장소선택">
          <MDBTable align='middle'>
            <MDBTableHead>
              <tr>
                <th scope='col'>장소</th>
                <th scope='col'>세부주소</th>
                <th scope='col'>상태</th>
                <th scope='col'>Actions</th>
              </tr>
            </MDBTableHead>

            <MDBTableBody>

              {myPlaces &&
                myPlaces.map((item, idx) =>
              <tr key={item.id} id={item.id}>
                <td>
                  <div className='d-flex align-items-center'>
                    <img
                        src={item.imgUrl}
                        alt=''
                        style={{ width: '100px', height: '100px' }}
                        className='rounded-circle'
                    />
                    <div className='ms-3'>
                      <p className='fw-bold mb-1'>{item.name}</p>
                      <p className='text-muted mb-0'>{item.addr}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className='fw-normal mb-1'>{item.message}</p>
                </td>
                <td>
                  {item.isBorrow ? <MDBBadge color='danger' pill>
                    대여중
                  </MDBBadge> : <MDBBadge color='info' pill>
                    대여가능
                  </MDBBadge>}
                </td>
                <td>
                  <CButton color="success" value={item.id} onClick={(e) => setPlaceId(e.target.value)}>선택</CButton>
                </td>
              </tr>)}
            </MDBTableBody>
          </MDBTable>
        </MDBAccordionItem>

        <MDBAccordionItem collapseId={2} headerTitle="시간">
          <MDBTable align='middle'>
          <MDBTableHead>
            <tr>
              <th scope='col'>시작시간</th>
              <th scope='col'>종료시간</th>
              <th scope='col'>가격</th>
              <th scope='col'>주의사항</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            <tr>
              <td>
              <StartTimepicker/>
              </td>
              <td>
                <EndTimepicker/>
              </td>
              <td>
                <CFormInput type="text" placeholder="0" value={cost} onChange={(e) => {setCost(e.target.value)}}/>
              </td>
              <td>
                <CFormInput type="text" value={message} onChange={(e) => {setMessage(e.target.value)}}/>
              </td>
            </tr>
          </MDBTableBody>
          </MDBTable>
        </MDBAccordionItem>
      </MDBAccordion>

      <CButton color="success" onClick={handleDataOnClick}>전송</CButton>
    </div>
  );
};

export default Rent;
