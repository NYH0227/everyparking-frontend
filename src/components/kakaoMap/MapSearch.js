// import React, {useEffect, useState} from 'react';
// import { CButton, CFormFeedback, CFormInput, CInputGroup } from "@coreui/react";
// import PropTypes from "prop-types";
// import { AppSidebarNav } from "../AppSidebarNav";
// const { kakao } = window;
//
// //const MapSearch = ({setX_pos,setY_pos}) => {
// const MapSearch = (props) => {
//
//     const [text,setText] = useState()
//     const [input,setInput] = useState()
//
//
//     useEffect(() => {
//         var mapContainer = document.getElementById('myMap'),
//           mapOption = {
//               center: new kakao.maps.LatLng(37.4788363460667, 126.753432165028),
//               level: 4 // 지도의 확대 레벨
//           };
//         var map = new kakao.maps.Map(mapContainer, mapOption);
//
//         var geocoder = new kakao.maps.services.Geocoder();
//         geocoder.addressSearch( input , function (result, status) {
//
//             console.log(result[0].x, result[0].y)
//
//             setX(result[0].x)
//             setY(result[0].y)
//
//             if (status === kakao.maps.services.Status.OK) {
//                 var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
//
//
//                 var marker = new kakao.maps.Marker({
//                     map: map,
//                     position: coords
//                 });
//
//                 // 인포윈도우
//                 // var infowindow = new kakao.maps.InfoWindow({
//                 //     content: '<div style="width:150px;text-align:center;padding:6px 0;">'+input+'</div>'
//                 // });
//                 // infowindow.open(map, marker);
//
//                 map.setCenter(coords);
//             }
//         });
//     }, [input]);
//
//     return (
//         <>
//             {/*<div id='myMap' style={{*/}
//                 width: '100%',
//                 height: '300px',
//                 margin: 'auto'
//             }}></div>
//             <br/>
//             <CInputGroup className="mb-3">
//                 <CButton type="button" color="dark" onClick={() => setInput(text)} variant="outline" id="button-addon1">주소검색</CButton>
//                 <CFormInput placeholder="무네미로 448번길" value={text} onChange={(e) => setText(e.target.value)} aria-label="Example text with button addon" aria-describedby="button-addon1"/>
//             </CInputGroup>
//             <br/>
//         </>
//     );
// }
//
// export default MapSearch;
