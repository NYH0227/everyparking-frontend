import React, { useEffect, useState } from "react";import ParkingService from "../service/ParkingService";import { MDBAccordion, MDBAccordionItem, MDBTable, MDBTableBody, MDBTableHead,  } from "mdb-react-ui-kit";import {  CButton,  CFormInput,  CInputGroup, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow} from "@coreui/react";import DatePicker from "react-datepicker";import Swal from "sweetalert2";import CIcon from "@coreui/icons-react";import { cilSearch } from "@coreui/icons";const { kakao } = window;const Borrow = () => {  const [myCars, setMyCars] = useState([]);  const [carId, setCarId] = useState("")  const [carNumber, setCarNumber] = useState()  const [startTime, setStartTime] = useState(new Date())  const [endTime, setEndTime] = useState(new Date())  const [myMapX, setMyMapX] = useState()  const [myMapY, setMyMapY] = useState()  const [input, setInput] = useState()  const [text, setText] = useState()  const [positions, setPositions] = useState([])  useEffect(()=>{    ParkingService.getMyCar()      .then((res) => {        setMyCars(res.data.data);        console.log(res.data)      })      .catch((err) => {console.log(err)})  },[])  useEffect(() => {    const mapContainer = document.getElementById("selectMap");    const mapOption = {        center: new kakao.maps.LatLng(37.48097868949205, 126.7506671431559),        level: 4      };    let marker = new kakao.maps.Marker()    const map = new kakao.maps.Map(mapContainer, mapOption);    const infowindow = new kakao.maps.InfoWindow({zIndex:1, removable: true} );    var zoomControl = new kakao.maps.ZoomControl();    map.addControl(zoomControl, kakao.maps.ControlPosition);    var geocoder = new kakao.maps.services.Geocoder();    geocoder.addressSearch(input, function(result, status) {      if (status === kakao.maps.services.Status.OK) {        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);        setMyMapY(result[0].y)        setMyMapX(result[0].x)        var callback = function(result, status) {          if (status === kakao.maps.services.Status.OK) {            console.log("검색결과 : ", result[0].address.address_name);          }        };        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);        var marker = new kakao.maps.Marker({          map: map,          position: coords,        });        var infowindow = new kakao.maps.InfoWindow({          map: map,          position : coords,          content : '<div style="padding:5px;">검색 위치</div>',        });        infowindow.open(map, marker);        map.setCenter(coords, marker);      }      map.relayout()    });    for (var i = 0; i < positions.length; i ++) {      displayMarker(positions[i])    }    function displayMarker(place) {      const marker = new kakao.maps.Marker({        map: map,        position: new kakao.maps.LatLng(place.mapY, place.mapX),      });      kakao.maps.event.addListener(marker, 'click', function() {        infowindow.setContent(          '<div style="font-size:12px;">이름 : ' + place.placeName +          '<br>주소 : '+ place.placeAddr +          '<br>비용 : '+ place.cost +          '</div>' +          '<a href="#" style="font-size:12px;">대여하기</a>'        );        infowindow.open(map, marker);      });    }    kakao.maps.event.addListener(map, 'gotoMap', function(mapX,mapY) {      map.panTo(new kakao.maps.LatLng(mapY, mapX));    });  }, [input,positions]);  const gotoMap = (mapX, mapY) => {    var mapContainer = document.getElementById("selectMap"),      mapOption = {        center: new kakao.maps.LatLng(mapY, mapX),        level: 4      };    var map = new kakao.maps.Map(mapContainer, mapOption);    map.setCenter(new kakao.maps.LatLng(mapY, mapX));  }  const handleSearchOnClick = () => {    ParkingService.getBorrowData(carNumber,myMapX,myMapY,startTime.toISOString(),endTime.toISOString())      .then((res) => {        console.log(":",res);        setPositions(res.data.data === null || undefined ? [] : res.data.data)        //Swal.fire(res.data.message, "", "success");      })      .catch((err) => {        console.log("err", err.response.data);        Swal.fire(err.response.data.errorList[0].message, "", "error");      });  }  const timeformat = (time) => {    return time[1] +"월 " +time[2] + "일 " +time[3]+"시"  }  const handleBorrowOnClick = (rentId,startTime,endTime,carNumber)  => {    ParkingService.postBorrow(rentId, startTime, endTime, carNumber)      .then((res) => console.log(res))      .catch((err) => console.log(err.response.data));  }  return (    <div>      <MDBAccordion flush initialActive={0}>        <MDBAccordionItem collapseId={1} headerTitle="조건 선택">          <MDBTable align="middle">            <MDBTableHead>              <tr>                <th scope="col">내 차 모델</th>                <th scope="col">차 번호</th>                <th scope="col">차 종</th>                <th scope="col">Actions</th>              </tr>            </MDBTableHead>            <MDBTableBody>              {myCars &&                myCars.map((item, idx) =>                  <tr key={item.idx} id={item.idx}>                    <td>                      <p className="fw-normal mb-1">{item.carModel}</p>                    </td>                    <td>                      <p id="carN" className="fw-normal mb-1">{item.carNumber}</p>                    </td>                    <td>                      <p className="fw-normal mb-1">{item.carSize}</p>                    </td>                    <td>                      {carId === idx.toString() ?                        <CButton color="info" value={idx} onClick={(e) => setCarId(e.target.value)}>선택중</CButton>                        :                        <CButton color="success" value={idx}                                 onClick={(e) => {                                   setCarId(e.target.value);                                   setCarNumber(item.carNumber);                                 }}>선택</CButton>                      }                    </td>                  </tr>)}            </MDBTableBody>          </MDBTable>          <div className="mb-8">            <tr>              <th scope="col">시작시간</th>              <th scope="col">종료시간</th>            </tr>            <tr>              <td>                <DatePicker                  selected={startTime}                  onChange={(date) => setStartTime(date)}                  showTimeSelect                  timeFormat="p"                  timeIntervals={60}                  dateFormat="MM월 dd일 h aa"                />              </td>              <td>                <DatePicker                  selected={endTime}                  onChange={(date) => setEndTime(date)}                  showTimeSelect                  timeFormat="p"                  timeIntervals={60}                  dateFormat="MM월 dd일 h aa"                />              </td>            </tr>          </div>          <CInputGroup className="mb-5">            <CButton type="button" color="dark" onClick={() => setInput(text)}                     variant="outline" id="button-addon1">주소검색</CButton>            <CFormInput placeholder="무네미로 448번길" value={text} aria-label="Example text with button addon"                        aria-describedby="button-addon1" onChange={(e) => setText(e.target.value)} />          </CInputGroup>          <CButton onClick={handleSearchOnClick}>검색</CButton>        </MDBAccordionItem>        <MDBAccordionItem collapseId={2} headerTitle="검색 결과">          <div className="col-md-8" id="selectMap" style={{            width: "100%",            height: "300px"          }}></div>          <CTable align="middle" className="mb-0 border" hover responsive style={{ overflow: "scroll" }}>            <CTableHead color="light">              <CTableRow>                <CTableHeaderCell></CTableHeaderCell>                <CTableHeaderCell className="col-3">주소</CTableHeaderCell>                <CTableHeaderCell className="col-2">상세주소</CTableHeaderCell>                <CTableHeaderCell className="col-2">시작시간</CTableHeaderCell>                <CTableHeaderCell className="col-2">가격</CTableHeaderCell>                <CTableHeaderCell className="col-1">거리</CTableHeaderCell>                <CTableHeaderCell className="col-2">이용하기</CTableHeaderCell>              </CTableRow>            </CTableHead>            <CTableBody>              {positions && positions.map((x, index) => (                <CTableRow key={index} style={{ width: "10rem" }}>                  <CTableDataCell>                    <CButton color="light" onClick={() => {                      gotoMap(x.mapX, x.mapY);                      console.log(x.placeName);                    }}><CIcon icon={cilSearch} /></CButton>                  </CTableDataCell>                  <CTableDataCell style={{ fontSize: "0.8rem" }}>                    {x.placeAddr.split(":")[0]}                  </CTableDataCell>                  <CTableDataCell>                    {x.placeAddr.split(":")[1]}                  </CTableDataCell>                  <CTableDataCell style={{ fontSize: "0.8rem" }}>                    {timeformat(x.startTime)}                  </CTableDataCell>                  <CTableDataCell style={{ fontSize: "0.8rem" }}>                    {x.cost}원                  </CTableDataCell>                  <CTableDataCell>                    {Math.floor(x.dist * 1000)}m                  </CTableDataCell>                  <CTableDataCell>                    <CButton color="success" onClick={() => {                      handleBorrowOnClick(x.rentId, startTime, endTime, carNumber);                    }}>선택</CButton>                  </CTableDataCell>                </CTableRow>              ))}            </CTableBody>          </CTable>        </MDBAccordionItem>      </MDBAccordion>    </div>  );}export default Borrow;