import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow, CListGroupItem, CListGroup } from "@coreui/react";
import ParkingService from "../service/ParkingService";

const Borrow = () => {

  const [places,setPlaces] = useState([])

  // useEffect(()=>{
  //   ParkingService.getPlaces()
  //     .then((res) => {
  //       console.log(res)
  //       //setPlaces(res.data)
  //     })
  //     .catch((err) => console.log(err))
  // },[])



  return (
    <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>React Select</strong> <small>Default</small>
            </CCardHeader>
            <CCardBody>
              <CListGroup>
                <CListGroupItem>Cras justo odio</CListGroupItem>
                <CListGroupItem>Dapibus ac facilisis in</CListGroupItem>
                <CListGroupItem>Morbi leo risus</CListGroupItem>
                <CListGroupItem>Porta ac consectetur ac</CListGroupItem>
                <CListGroupItem>Vestibulum at eros</CListGroupItem>
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>

    </CRow>
  );
}

export default Borrow
