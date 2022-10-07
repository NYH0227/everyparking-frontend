import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CRow, CFormTextarea, CInputGroup
} from "@coreui/react";
import ParkingService from "../service/ParkingService";
import Swal from "sweetalert2";
const { kakao } = window;


const MyPlace = () => {

  const [placeName,setPlaceName] = useState()
  const [mapAddr,setMapAddr] = useState()
  const [message,setMessage] = useState()
  const [input, setInput] = useState()

  const [x_pos,setX] = useState(0.0)
  const [y_pos,setY] = useState(0.0)
  const [imgUrl, setImgUrl] = useState("")
  const [text,setText] = useState()


  useEffect(() => {
    var mapContainer = document.getElementById('myMap'),
      mapOption = {
        center: new kakao.maps.LatLng(37.4788363460667, 126.753432165028),
        level: 4 // 지도의 확대 레벨
      };

    var map = new kakao.maps.Map(mapContainer, mapOption);

    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch( input , function (result, status) {

      console.log(result[0].x, result[0].y)

      setX(result[0].x)
      setY(result[0].y)

      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        var callback = function(result, status) {
          if (status === kakao.maps.services.Status.OK) {
            console.log("주소는",result[0].address.address_name);
            setMapAddr(result[0].address.address_name)
          }
        };
        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);

        var marker = new kakao.maps.Marker({
          map: map,
          position: coords
        });

        map.setCenter(coords);

      }
    });
  }, [input]);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  })

   const handleAddPlace = async () => {

    await Toast.fire({
       imageUrl: imgUrl === "" ? "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8NDw0NDQ8NDw0NDw0NDQ0NDQ8NDQ0NFREWFhURFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALEBHAMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAABAAIH/8QAFhABAQEAAAAAAAAAAAAAAAAAAAER/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AOqIoAkgKSApEEkQWJEEigCJAIoAjiwGUUARQM1HAABQANCgEkASIIEAQUAIIIqEEkQRSBFIEUQGFEBiKAIoACgGBoAAVQZRAAFAA0zQSQAggCEgMMBgIgwCooQRSgFIgikCKhAJEAigZRQMo0AA0AAIAAgEKQASQJBAVEoCIIFIwEUQRRBEGAoUQSRAIoECsAIgAGmQCpAMoigBSACSAA0AgcAIpASCCIIEggSIYBMBApEFCkCKQBUoGUQABACilAyGqyAVIoAJUACAVSQApAYQYCIIEggSIQJEIEggSCCSIBJAARQCqVAUJAKDQABAAEUACAQKBIEDDBCCIMAkECRDAMMZagEwRAY0yQKSBJAEEgFSAIIAqEAQpAMogAkAVBoApICgYBIUBostAmmSDSBAwhASEDSCAhACEgQqFBBLQANACimgEEAQIBBIEUAJgQEpAYQdAoECQgaLJAllA0ggKCAgIECAQWigqEgFSAJBAElQQSBIoEgQKSAkIGiyQJZIEskCWToFBAUECQQEIAkhQWhAEkqASAJBARhAEEAUEBIQEggjAgaQQNIEEQgK0ICggOhACEAKCAJVAEkASQBFAgiAMSAVVICQgRSApIFSkChiQEJAoUgVSQIJAEkCCQIJAqEgSgQFBAYokD//2Q==" : imgUrl,
       imageWidth : 400,
       imageHeight : 200,
     })



    ParkingService.postAddPlace(mapAddr,x_pos,y_pos,message,placeName,imgUrl)
      .then((res) => {
        console.log(res.data)
        Swal.fire(res.data.message,"","success")

        setMapAddr("")
        setMessage("")
        placeName("")
      })
      .catch((err) => console.log(err.response))
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>내 주차공간 등록</strong>
          </CCardHeader>
          <CCardBody>
            <>
              <div id="myMap" style={{
                width: "100%",
                height: "300px",
                margin: "auto"
              }}></div>
              <br />
              <CInputGroup className="mb-3">
                <CButton type="button" color="dark" onClick={() => setInput(text)} variant="outline"
                         id="button-addon1">주소검색</CButton>
                <CFormInput placeholder="무네미로 448번길" value={text} onChange={(e) => setText(e.target.value)}
                            aria-label="Example text with button addon" aria-describedby="button-addon1" />
              </CInputGroup>
              <br />
            </>

            <CForm validated={true}>

              <div className="mb-3">
                <CFormLabel htmlFor="validationTextarea" className="form-label">
                  주소
                </CFormLabel>
                <CFormInput type="text" value={mapAddr} disabled></CFormInput>
              </div>

              <div className="mb-3">
                <CFormInput id="floatingTextarea" className="mb-4"
                            placeholder="세부주소" value={message}
                            onChange={(e) => setMessage(e.target.value)}></CFormInput>
                <CFormFeedback invalid>세부주소를 입력해주세요</CFormFeedback>
              </div>


              <div className="mb-3">
                <CFormLabel htmlFor="validationTextarea" className="form-label">
                  별칭
                </CFormLabel>
                <CFormInput placeholder="우리집" type="text" value={placeName}
                            onChange={(e) => setPlaceName(e.target.value)}></CFormInput>
                <CFormFeedback invalid>별칭을 입력해주세요</CFormFeedback>
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="validationTextarea" className="form-label">
                  이미지 주소
                </CFormLabel>
                <CFormInput placeholder="이미지 주소" type="text" value={imgUrl}
                            onChange={(e) => setImgUrl(e.target.value)}></CFormInput>
                <CFormFeedback invalid>이미지 주소를 입력해주세요</CFormFeedback>
              </div>


              <div className="mb-3">
                <CButton color="primary" onClick={handleAddPlace}>
                  장소 등록하기
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default MyPlace;
