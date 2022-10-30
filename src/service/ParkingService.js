import axios from "axios";
import Swal from "sweetalert2";

export const CLIENT_PATH = "http://localhost:3000";
export const SERVER_PATH = "http://localhost:7777";

// export const SERVER_PATH = "http://192.168.187.181:7777";
// export const CLIENT_PATH = "http://192.168.187.38:3000";

export const httpMethod = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
  OPTIONS: "OPTIONS"
};

export const swalIcon = {
  INFO: "info",
  SUCCESS: "success",
  DANGER: "danger",
  ERROR: "error",
  WARNING: "warning",
  QUESTION: "question",
  NONE: ""
};

export const DEFAULT_PLACE_IMG = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8NDw0NDQ8NDw0NDw0NDQ0NDQ8NDQ0NFREWFhURFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALEBHAMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAABAAIH/8QAFhABAQEAAAAAAAAAAAAAAAAAAAER/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AOqIoAkgKSApEEkQWJEEigCJAIoAjiwGUUARQM1HAABQANCgEkASIIEAQUAIIIqEEkQRSBFIEUQGFEBiKAIoACgGBoAAVQZRAAFAA0zQSQAggCEgMMBgIgwCooQRSgFIgikCKhAJEAigZRQMo0AA0AAIAAgEKQASQJBAVEoCIIFIwEUQRRBEGAoUQSRAIoECsAIgAGmQCpAMoigBSACSAA0AgcAIpASCCIIEggSIYBMBApEFCkCKQBUoGUQABACilAyGqyAVIoAJUACAVSQApAYQYCIIEggSIQJEIEggSCCSIBJAARQCqVAUJAKDQABAAEUACAQKBIEDDBCCIMAkECRDAMMZagEwRAY0yQKSBJAEEgFSAIIAqEAQpAMogAkAVBoApICgYBIUBostAmmSDSBAwhASEDSCAhACEgQqFBBLQANACimgEEAQIBBIEUAJgQEpAYQdAoECQgaLJAllA0ggKCAgIECAQWigqEgFSAJBAElQQSBIoEgQKSAkIGiyQJZIEskCWToFBAUECQQEIAkhQWhAEkqASAJBARhAEEAUEBIQEggjAgaQQNIEEQgK0ICggOhACEAKCAJVAEkASQBFAgiAMSAVVICQgRSApIFSkChiQEJAoUgVSQIJAEkCCQIJAqEgSgQFBAYokD//2Q==";

const Toast = Swal.mixin({
  toast: true,
  position: "top-right",
  iconColor: "white",
  customClass: {
    popup: "colored-toast"
  },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true
});


class ParkingService {

  addHeader(method, path, data) {
    if (localStorage.getItem("jwt") === null || undefined) {
      Swal.fire("세션이 만료되었습니다.", "", "info");
      // eslint-disable-next-line no-restricted-globals
      location.href = CLIENT_PATH + "/signin";
    }

    return axios({
      method: method,
      url: SERVER_PATH + path,
      headers: {
        "Authorization": localStorage.getItem("jwt").toString(),
        "Content-Type": "application/json"
      },
      data: data
    });
  }

  /** 도시 리스트 받아오기 */
  getCities() {
    return axios.get(SERVER_PATH + "/api/city");
  }

  /** 차종(소,중,대 받아오기) */
  getCarType() {
    return axios.get(SERVER_PATH + "/api/car");
  }

  /** DB의 랜트 가능한 장소 조회 */
  getPlaces() {
    return axios.get(SERVER_PATH + "/api/place");
  }


  /** 개인이 들고있는 장소 조회하기 */
  getMyPlaces() {
    return this.addHeader(httpMethod.GET, "/api/parking");
  }

  /** Rent 데이터 보내기*/
  postRentPlaceData(startTime, endTime, cost, message, placeId) {
    return this.addHeader(httpMethod.POST, "/api/rent", {
      "startTime": startTime,
      "endTime": endTime,
      "message": message,
      "placeId": placeId,
      "cost": cost
    });
  }

  /** rent에 등록된 데이터 검색 */
  getBorrowData(carNumber, myMapX, myMapY, startTime, endTime) {
    return this.addHeader(httpMethod.POST, "/api/borrow/recommend", {
      "mapX": myMapX,
      "mapY": myMapY,
      "carNumber": carNumber,
      "startTime": startTime,
      "endTime": endTime
    });
  }

  /** Borrow 요청 */
  postBorrow(rentId, startTime, endTime, carNumber) {
    return this.addHeader(httpMethod.POST, "/api/borrow/", {
      "rentId": rentId,
      "startTime": startTime,
      "endTime": endTime,
      "carNumber": carNumber
    });
  }

  /** 소유한 차 받기 */
  getMyCar() {
    return this.addHeader(httpMethod.GET, "/api/car/me");
  }

  getPoint() {
    return this.addHeader(httpMethod.PATCH, "/api/users");
  }


  /** 차 등록 */
  postAddCar(carNumber, carModel, carSize) {
    return this.addHeader(httpMethod.POST, "/api/car", {
      "carModel": carModel,
      "carNumber": carNumber,
      "size": carSize
    });
  }

  /** 장소 등록 */
  postAddPlace(mapAddr, x_pos, y_pos, message, placeName, imgUrl, carSize) {
    return this.addHeader(httpMethod.POST, "/api/place", {
      "mapAddr": mapAddr,
      "mapX": x_pos,
      "mapY": y_pos,
      "message": message,
      "placeName": placeName,
      "imgUrl": imgUrl === "" ? DEFAULT_PLACE_IMG : imgUrl,
      "size": carSize
    });
  }

  /** 장소 취소 */
  cancelPlace(placeId) {
    return this.addHeader(httpMethod.PUT, "/api/rent/" + placeId);
  }

  /** 회원가입 */
  postSignUp(city, email, nickname, password, tel) {
    return axios.post(SERVER_PATH + "/api/users", {
      "city": city,
      "email": email,
      "introduce": "안녕하세요",
      "nickname": nickname,
      "password": password,
      "tel": tel
    });
  }

  /** 로그인 */
  postSignIn(email, password) {
    return axios.post(SERVER_PATH + "/api/users/login", {
      "email": email,
      "password": password
    });
  }

  /** 회원 정보 수정 */
  editUserData(tel, intro, city) {
    return this.addHeader(httpMethod.PUT, "/api/users", {
      "tel" : tel,
      "intro" : intro,
      "city" : city
    });
  }

  userData() {
    return this.addHeader(httpMethod.GET, "/api/users/me");
  }

}

export default new ParkingService();