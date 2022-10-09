import React, { useEffect, useState } from "react";
import ParkingService from "../service/ParkingService";
import { MDBAccordion, MDBAccordionItem, MDBBtn, MDBRipple } from "mdb-react-ui-kit";
import { MDBBadge,MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Swal from "sweetalert2";

import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText
} from "mdb-react-ui-kit";

const Borrow = () => {

  const [myPlaces, setMyPlaces] = useState([]);

  useEffect(() => {
    ParkingService.getMyPlaces()
      .then((res) => {
        setMyPlaces(res.data.data);
      })
      .catch((err) => console.log(err));

  }, []);

  const handleSelectPlace = () => {
    if(myPlaces.length === 0){
      Swal.fire("등록된 장소가 없습니다.")
    }
  }

  return (
    <div>
      <MDBAccordion alwaysOpen initialActive={1}>


        <MDBAccordionItem collapseId={1} onClick={handleSelectPlace} headerTitle="장소 선택" ß>
          <div style={{ display: "inline-flex", width:"100%" }}>
            {myPlaces.map((item, idx) =>
              <div key={idx} style={{width:"30%"}}>
              <MDBCard style={{ height:"100%" }}>
                <MDBRipple rippleColor="light" rippleTag="div" className="bg-image">
                  <MDBCardImage style={{ margin: "0 auto" }} src={item.imgUrl} fluid alt="사진 없음." />
                  <a>
                    <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}></div>
                  </a>
                </MDBRipple>
                <MDBCardBody>
                  <MDBCardTitle>{item.name}</MDBCardTitle>
                  <MDBCardText>
                    {item.addr}
                  </MDBCardText>

                  <MDBBtn href="#">Button</MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </div>)}
          </div>


        </MDBAccordionItem>


        <MDBAccordionItem collapseId={2} headerTitle="시간">
          <MDBTable align='middle'>
            <MDBTableHead>
              <tr>
                <th scope='col'>장소</th>
                <th scope='col'>주의사항</th>
                <th scope='col'>상태</th>
                <th scope='col'>가격</th>
                <th scope='col'>Actions</th>
              </tr>
            </MDBTableHead>

            <MDBTableBody>
              {myPlaces &&
                myPlaces.map((item, idx) =>
              <tr key={idx}>
                <td>
                  <div className='d-flex align-items-center'>
                    <img
                        src={item.imgUrl}
                        alt=''
                        style={{ width: '45px', height: '45px' }}
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
                  <MDBBadge color='success' pill>
                    Active
                  </MDBBadge>
                </td>
                <td>
                  비용
                </td>
                <td>
                  <MDBBtn color='primary' rounded size='sm'>
                    대여하기
                  </MDBBtn>
                </td>
              </tr>)}

            </MDBTableBody>
          </MDBTable>
        </MDBAccordionItem>


        <MDBAccordionItem collapseId={3} headerTitle="가격">


        </MDBAccordionItem>
      </MDBAccordion>

    </div>
  );
};

export default Borrow;
