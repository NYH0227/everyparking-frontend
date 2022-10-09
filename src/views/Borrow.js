import React, { useEffect, useState } from "react";
import ParkingService from "../service/ParkingService";
import { MDBAccordion, MDBAccordionItem } from "mdb-react-ui-kit";
import { MDBBadge,MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CButton, CFormInput } from "@coreui/react";


const Borrow = () => {

  const [myPlaces, setMyPlaces] = useState([]);
  const [startTime,setStartTime] = useState()
  const [endTime,setEndTime] = useState()
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
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartTime(date)}
        locale="pt-BR"
        showTimeSelect
        timeFormat="p"
        timeIntervals={30}
        dateFormat="MM월 dd일 h:mm aa"
      />
    );
  }

  const EndTimepicker = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker
        selected={startDate}
        onChange={
        (date) => {
          setEndTime(date)
          setStartDate(date)

        }

      }
        locale="pt-BR"
        showTimeSelect
        timeFormat="p"
        timeIntervals={30}
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
        <MDBAccordionItem collapseId={1} headerTitle="장소선택">
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

export default Borrow;
