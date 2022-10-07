import React, { useEffect, useState } from "react";
import ParkingService from "../service/ParkingService";
import { MDBAccordion, MDBAccordionItem, MDBBtn, MDBRipple } from "mdb-react-ui-kit";
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
      .then(() => {
        if(myPlaces.length == 0){
          Swal.fire("등록된 장소가 없습니다.")
        }
      })
      .catch((err) => console.log(err));



  }, []);


  return (
    <div>
      <MDBAccordion alwaysOpen initialActive={1}>
        <MDBAccordionItem collapseId={1}  headerTitle="장소 선택" ß>

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

        </MDBAccordionItem>

        <MDBAccordionItem collapseId={3} headerTitle="가격">

        </MDBAccordionItem>
      </MDBAccordion>

    </div>
  );
};

export default Borrow;
