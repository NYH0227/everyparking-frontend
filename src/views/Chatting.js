import React from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
} from "mdb-react-ui-kit";

const Chatting = () => {

  return (
    <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Chat</strong>
            </CCardHeader>
            <CCardBody>
              Comeing Soon


              {/*<MDBContainer fluid className="py-5">*/}
              {/*  <MDBRow>*/}
              {/*    <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0" >*/}
              {/*      <MDBCard >*/}
              {/*        <MDBCardBody>*/}
              {/*          <MDBTypography listUnStyled className="mb-0" >*/}
              {/*            <li*/}
              {/*              className="p-2 border-bottom"*/}
              {/*              style={{ backgroundColor: "#eee" }}*/}
              {/*            >*/}
              {/*              <a href="#!" className="d-flex justify-content-between">*/}
              {/*                <div className="d-flex flex-row">*/}
              {/*                  <img*/}
              {/*                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp"*/}
              {/*                    alt="avatar"*/}
              {/*                    className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"*/}
              {/*                    width="60"*/}
              {/*                  />*/}
              {/*                  <div className="pt-1">*/}
              {/*                    <p className="fw-bold mb-0">John Doe</p>*/}
              {/*                    <p className="small text-muted">*/}
              {/*                      Hello, Are you there?*/}
              {/*                    </p>*/}
              {/*                  </div>*/}
              {/*                </div>*/}
              {/*                <div className="pt-1">*/}
              {/*                  <p className="small text-muted mb-1">Just now</p>*/}
              {/*                  <span className="badge bg-danger float-end">1</span>*/}
              {/*                </div>*/}
              {/*              </a>*/}
              {/*            </li>*/}
              {/*            <li className="p-2 border-bottom">*/}
              {/*              <a href="#!" className="d-flex justify-content-between">*/}
              {/*                <div className="d-flex flex-row">*/}
              {/*                  <img*/}
              {/*                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-1.webp"*/}
              {/*                    alt="avatar"*/}
              {/*                    className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"*/}
              {/*                    width="60"*/}
              {/*                  />*/}
              {/*                  <div className="pt-1">*/}
              {/*                    <p className="fw-bold mb-0">Danny Smith</p>*/}
              {/*                    <p className="small text-muted">*/}
              {/*                      Lorem ipsum dolor sit.*/}
              {/*                    </p>*/}
              {/*                  </div>*/}
              {/*                </div>*/}
              {/*                <div className="pt-1">*/}
              {/*                  <p className="small text-muted mb-1">5 mins ago</p>*/}
              {/*                </div>*/}
              {/*              </a>*/}
              {/*            </li>*/}
              {/*            <li className="p-2 border-bottom">*/}
              {/*              <a href="#!" className="d-flex justify-content-between">*/}
              {/*                <div className="d-flex flex-row">*/}
              {/*                  <img*/}
              {/*                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-2.webp"*/}
              {/*                    alt="avatar"*/}
              {/*                    className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"*/}
              {/*                    width="60"*/}
              {/*                  />*/}
              {/*                  <div className="pt-1">*/}
              {/*                    <p className="fw-bold mb-0">Alex Steward</p>*/}
              {/*                    <p className="small text-muted">*/}
              {/*                      Lorem ipsum dolor sit.*/}
              {/*                    </p>*/}
              {/*                  </div>*/}
              {/*                </div>*/}
              {/*                <div className="pt-1">*/}
              {/*                  <p className="small text-muted mb-1">Yesterday</p>*/}
              {/*                </div>*/}
              {/*              </a>*/}
              {/*            </li>*/}
              {/*          </MDBTypography>*/}
              {/*        </MDBCardBody>*/}
              {/*      </MDBCard>*/}
              {/*    </MDBCol>*/}

              {/*    <MDBCol md="6" lg="7" xl="8">*/}
              {/*      <MDBTypography listUnStyled>*/}
              {/*        <li className="d-flex justify-content-between mb-4">*/}
              {/*          <img*/}
              {/*            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"*/}
              {/*            alt="avatar"*/}
              {/*            className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"*/}
              {/*            width="60"*/}
              {/*          />*/}
              {/*          <MDBCard>*/}
              {/*            <MDBCardHeader className="d-flex justify-content-between p-3">*/}
              {/*              <p className="fw-bold mb-0">Brad Pitt</p>*/}
              {/*              <p className="text-muted small mb-0">*/}
              {/*                <MDBIcon far icon="clock" /> 12 mins ago*/}
              {/*              </p>*/}
              {/*            </MDBCardHeader>*/}
              {/*            <MDBCardBody>*/}
              {/*              <p className="mb-0">*/}
              {/*                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed*/}
              {/*                do eiusmod tempor incididunt ut labore et dolore magna*/}
              {/*                aliqua.*/}
              {/*              </p>*/}
              {/*            </MDBCardBody>*/}
              {/*          </MDBCard>*/}
              {/*        </li>*/}
              {/*        <li className="d-flex justify-content-between mb-4">*/}
              {/*          <MDBCard className="w-100">*/}
              {/*            <MDBCardHeader className="d-flex justify-content-between p-3">*/}
              {/*              <p className="fw-bold mb-0">Lara Croft</p>*/}
              {/*              <p className="text-muted small mb-0">*/}
              {/*                <MDBIcon far icon="clock" /> 13 mins ago*/}
              {/*              </p>*/}
              {/*            </MDBCardHeader>*/}
              {/*            <MDBCardBody>*/}
              {/*              <p className="mb-0">*/}
              {/*                Sed ut perspiciatis unde omnis iste natus error sit*/}
              {/*                voluptatem accusantium doloremque laudantium.*/}
              {/*              </p>*/}
              {/*            </MDBCardBody>*/}
              {/*          </MDBCard>*/}
              {/*          <img*/}
              {/*            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"*/}
              {/*            alt="avatar"*/}
              {/*            className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"*/}
              {/*            width="60"*/}
              {/*          />*/}
              {/*        </li>*/}
              {/*        <li className="d-flex justify-content-between mb-4">*/}
              {/*          <img*/}
              {/*            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"*/}
              {/*            alt="avatar"*/}
              {/*            className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"*/}
              {/*            width="60"*/}
              {/*          />*/}
              {/*          <MDBCard>*/}
              {/*            <MDBCardHeader className="d-flex justify-content-between p-3">*/}
              {/*              <p className="fw-bold mb-0">Brad Pitt</p>*/}
              {/*              <p className="text-muted small mb-0">*/}
              {/*                <MDBIcon far icon="clock" /> 10 mins ago*/}
              {/*              </p>*/}
              {/*            </MDBCardHeader>*/}
              {/*            <MDBCardBody>*/}
              {/*              <p className="mb-0">*/}
              {/*                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed*/}
              {/*                do eiusmod tempor incididunt ut labore et dolore magna*/}
              {/*                aliqua.*/}
              {/*              </p>*/}
              {/*            </MDBCardBody>*/}
              {/*          </MDBCard>*/}
              {/*        </li>*/}
              {/*        <li className="bg-white mb-3">*/}
              {/*          <MDBTextArea label="Message" id="textAreaExample" rows={4} />*/}
              {/*        </li>*/}
              {/*        <MDBBtn color="info" rounded className="float-end">*/}
              {/*          Send*/}
              {/*        </MDBBtn>*/}
              {/*      </MDBTypography>*/}
              {/*    </MDBCol>*/}
              {/*  </MDBRow>*/}
              {/*</MDBContainer>*/}




            </CCardBody>
          </CCard>
        </CCol>
    </CRow>
  );
}

export default Chatting;
