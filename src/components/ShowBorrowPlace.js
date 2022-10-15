import React from 'react';
import { MDBCol } from "mdb-react-ui-kit";
import { CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilSearch } from "@coreui/icons";

function ShowBorrowPlace(positions) {
  return (
    <div data-mdb-perfect-scrollbar style={{ height: "400px", overflow: "scroll" }}>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="text-center">

            </CTableHeaderCell>
            <CTableHeaderCell>장소</CTableHeaderCell>
            <CTableHeaderCell className="text-center">주소</CTableHeaderCell>
            <CTableHeaderCell>시간</CTableHeaderCell>
            <CTableHeaderCell>거리</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {positions.map((x, index) => (
            <CTableRow key={index} style={{ width: "10rem" }}>
              <CTableDataCell>
                <CButton color="light" onClick={() => {
                  console.log(x.placeName);
                }}><CIcon icon={cilSearch} /></CButton>

              </CTableDataCell>
              <CTableDataCell className="text-center" style={{ fontSize: "11px" }}>
                {x.name}
              </CTableDataCell>
              <CTableDataCell className="text-center" style={{ fontSize: "8px" }}>
                {x.addr}
              </CTableDataCell>
              <CTableDataCell style={{ fontSize: "8px" }}>
                {x.start} ~ {x.end}
              </CTableDataCell>
              <CTableDataCell className="text-center">
                {x.distance}m
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  );
}

export default ShowBorrowPlace;