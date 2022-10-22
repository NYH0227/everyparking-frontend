import React, { useEffect, useState } from "react";import ParkingService from "../service/ParkingService";import { MDBAccordion, MDBAccordionItem,  } from "mdb-react-ui-kit";import {  CButton, CFormInput,CDropdownItem,CDropdown,CDropdownToggle,CDropdownMenu,CDropdownDivider,  CInputGroup, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow,  CNavLink,CForm,CNavItem,CNavbarNav,CNavbarBrand,CNavbar,CContainer,CNavbarToggler,CCollapse} from "@coreui/react";import DatePicker from "react-datepicker";import Swal from "sweetalert2";import CIcon from "@coreui/icons-react";import { cilSearch } from "@coreui/icons";const { kakao } = window;const Borrow = () => {  const [myCars, setMyCars] = useState([    {carModel: "아우디", carNumber : "12가1234", carSize: "소형"},    {carModel: "아우님", carNumber : "12너1234", carSize: "중형"}  ]);  const [carId, setCarId] = useState("")  const [carNumber, setCarNumber] = useState("")  const [carModel,setCarModel] = useState("")  const [startTime, setStartTime] = useState(new Date())  const [endTime, setEndTime] = useState(new Date())  const [myMapX, setMyMapX] = useState()  const [myMapY, setMyMapY] = useState()  const [mapAddr,setMapAddr] = useState("")  const [input, setInput] = useState()  const [text, setText] = useState()  const [positions, setPositions] = useState([])  const [visible, setVisible] = useState(false)  useEffect(()=>{    ParkingService.getMyCar()      .then((res) => {        setMyCars(res.data.data);        console.log(res.data)      })      .catch((err) => {console.log(err)})  },[])  useEffect(() => {    const mapContainer = document.getElementById("selectMap");    const mapOption = {        center: new kakao.maps.LatLng(37.48097868949205, 126.7506671431559),        level: 4      };    let marker = new kakao.maps.Marker()    const map = new kakao.maps.Map(mapContainer, mapOption);    const infowindow = new kakao.maps.InfoWindow({zIndex:1, removable: true} );    var zoomControl = new kakao.maps.ZoomControl();    map.addControl(zoomControl, kakao.maps.ControlPosition);    var geocoder = new kakao.maps.services.Geocoder();    geocoder.addressSearch(input, function(result, status) {      if (status === kakao.maps.services.Status.OK) {        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);        setMyMapY(result[0].y)        setMyMapX(result[0].x)        setMapAddr(result[0].address.address_name);        var callback = function(result, status) {          if (status === kakao.maps.services.Status.OK) {            console.log("검색결과 : ", result[0].address.address_name);            setText(result[0].address.address_name)          }        };        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);        var marker = new kakao.maps.Marker({          map: map,          position: coords,        });        var infowindow = new kakao.maps.InfoWindow({          map: map,          position : coords,          content : '<div style="padding:5px;">검색 위치</div>',        });        infowindow.open(map, marker);        map.setCenter(coords, marker);      }      map.relayout()    });    for (var i = 0; i < positions.length; i ++) {      displayMarker(positions[i])    }    function displayMarker(place) {      const marker = new kakao.maps.Marker({        map: map,        position: new kakao.maps.LatLng(place.mapY, place.mapX),      });      kakao.maps.event.addListener(marker, 'click', function() {        infowindow.setContent(          '<div style="font-size:12px;">이름 : ' + place.placeName +          '<br>주소 : '+ place.placeAddr +          '<br>비용 : '+ place.cost +          '</div>' +          '<a href="#" style="font-size:12px;">대여하기</a>'        );        infowindow.open(map, marker);      });    }    kakao.maps.event.addListener(map, 'gotoMap', function(mapX,mapY) {      map.panTo(new kakao.maps.LatLng(mapY, mapX));    });  }, [input,positions]);  const gotoMap = (mapX, mapY) => {    var mapContainer = document.getElementById("selectMap"),      mapOption = {        center: new kakao.maps.LatLng(mapY, mapX),        level: 4      };    var map = new kakao.maps.Map(mapContainer, mapOption);    map.setCenter(new kakao.maps.LatLng(mapY, mapX));  }  const handleSearchOnClick = () => {    ParkingService.getBorrowData(carNumber,myMapX,myMapY,startTime.toISOString(),endTime.toISOString())      .then((res) => {        console.log(":",res);        setPositions(res.data.data === null || undefined ? [] : res.data.data)        //Swal.fire(res.data.message, "", "success");      })      .catch((err) => {        console.log("err", err.response.data);        Swal.fire(err.response.data.errorList[0].message, "", "error");      });  }  const timeformat = (time) => {    return time[1] +"월 " +time[2] + "일 " +time[3]+"시"  }  const handleBorrowOnClick = (rentId,startTime,endTime,carNumber)  => {    ParkingService.postBorrow(rentId, startTime, endTime, carNumber)      .then((res) => {        console.log(res);        handleSearchOnClick();        Swal.fire(res.data.message, "", "success");      })      .catch((err) => {        console.log(err.response.data);        Swal.fire(err.response.data.message, "", "error");      });  }  return (    <div>      <MDBAccordion flush initialActive={0}>        <MDBAccordionItem collapseId={1} headerTitle="조건 선택">          <CNavbar expand="lg" colorScheme="light" className="bg-light" style={{ width: "100%"}}>            <CContainer fluid>              <CNavbarBrand><strong>조건 선택</strong></CNavbarBrand>              <CCollapse className="navbar-collapse" visible={visible}>                <CNavbarNav>                  <CNavItem>                    <CDropdown>                      <CDropdownToggle color="info">{carModel==="" ? "선택해주세요" : carModel}</CDropdownToggle>                      <CDropdownMenu>                        <CDropdownItem disabled >사용할 차를 선택해주세요</CDropdownItem>                        <CDropdownDivider/>                        {myCars.map((item, idx) =>                          <CDropdownItem key={idx} onClick={() => {                            setCarModel(item.carModel)                            setCarNumber(item.carNumber)                          }}>                            {item.carModel+"("+item.carSize+") "+item.carNumber}                          </CDropdownItem>                        )}                      </CDropdownMenu>                    </CDropdown>                  </CNavItem>                  <CNavItem>                    <DatePicker                      color="info"                      selected={startTime}                      onChange={(date) => setStartTime(date)}                      showTimeSelect                      timeFormat="p"                      timeIntervals={60}                      dateFormat="MM월 dd일 h aa"                    />                  </CNavItem>                  ㅡ                  <CNavItem>                    <DatePicker                      color="info"                      selected={endTime}                      onChange={(date) => setEndTime(date)}                      showTimeSelect                      timeFormat="p"                      timeIntervals={60}                      dateFormat="MM월 dd일 h aa"                    />                  </CNavItem>                </CNavbarNav>                <CForm className="d-flex" style={{float: "left",position: 'absolute', right: 0,marginRight: "30px"}}>                  <CFormInput type="search" className="me-2" placeholder="주소를 검색해주세요" value={text} onChange={(e) => setText(e.target.value)}/>                  <CButton color="success" variant="outline" onClick={() => setInput(text)}>Search</CButton>                </CForm>              </CCollapse>            </CContainer>          </CNavbar>          <div className="col-md-8 mb-4" id="selectMap" style={{            width: "100%",            height: "300px"          }}></div>          <CButton onClick={handleSearchOnClick}>검색 시작</CButton>        </MDBAccordionItem>        <MDBAccordionItem collapseId={2} headerTitle="검색 결과">          <CTable align="middle" className="mb-0 border" hover responsive style={{ overflow: "scroll" }}>            <CTableHead color="light">              <CTableRow>                <CTableHeaderCell></CTableHeaderCell>                <CTableHeaderCell className="col-3">주소</CTableHeaderCell>                <CTableHeaderCell className="col-2">상세주소</CTableHeaderCell>                <CTableHeaderCell className="col-2">시작시간</CTableHeaderCell>                <CTableHeaderCell className="col-2">가격</CTableHeaderCell>                <CTableHeaderCell className="col-1">거리</CTableHeaderCell>                <CTableHeaderCell className="col-2">이용하기</CTableHeaderCell>              </CTableRow>            </CTableHead>            <CTableBody>              {positions && positions.map((x, index) => (                <CTableRow key={index} style={{ width: "10rem" }}>                  <CTableDataCell>                    <CButton color="light" onClick={() => {                      gotoMap(x.mapX, x.mapY);                      console.log(x.placeName);                    }}><CIcon icon={cilSearch} /></CButton>                  </CTableDataCell>                  <CTableDataCell style={{ fontSize: "0.8rem" }}>                    {x.placeAddr.split(":")[0]}                  </CTableDataCell>                  <CTableDataCell>                    {x.placeAddr.split(":")[1]}                  </CTableDataCell>                  <CTableDataCell style={{ fontSize: "0.8rem" }}>                    {timeformat(x.startTime)}                  </CTableDataCell>                  <CTableDataCell style={{ fontSize: "0.8rem" }}>                    {x.cost}원                  </CTableDataCell>                  <CTableDataCell>                    {Math.floor(x.dist * 1000)}m                  </CTableDataCell>                  <CTableDataCell>                    <CButton color="success" onClick={() => {                      handleBorrowOnClick(x.rentId, startTime, endTime, carNumber);                    }}>선택</CButton>                  </CTableDataCell>                </CTableRow>              ))}            </CTableBody>          </CTable>        </MDBAccordionItem>      </MDBAccordion>    </div>  );}export default Borrow;