import axios from "axios";

//export const SERVER_PATH = "http://localhost:7777"
export const SERVER_PATH = "http://192.168.131.181:7777"
export const CLIENT_PATH = "http://192.168.241.181:3000"


class ParkingService {

    /** 도시 리스트 받아오기 */
    getCities(){
        return axios.get(SERVER_PATH+"/api")
    }

    /** 차종(소,중,대 받아오기) */
    getCarType() {
      return axios.get(SERVER_PATH + "/api/car");
    }

    /** DB의 랜트 가능한 장소 조회 */
    getPlaces() {
      return axios.get(SERVER_PATH + "/api/place")
    }
    /** 개인이 들고있는 장소 조회하기 */


    /** 차 등록 */
    postAddCar(carNumber, carModel,carSize){
      console.log(carSize)
       return axios.post(SERVER_PATH + "/api/car", {
         "carModel" : carModel,
         "carNumber" : carNumber,
         "size" : carSize
       },{
         headers :{
           'Authorization' : localStorage.getItem("jwt").toString(),
           'Content-Type': 'application/json'
         }
       })
    }

    /** 장소 등록 */
    postAddPlace(mapAddr,x_pos,y_pos,message,placeName){
      // 현재 검색한 주소를 가지고 도로명 주소로 변환하기
      // 도로명 주소를 mapAddr에 넣은 후 서버로 통신하면 성공.

      return axios.post(SERVER_PATH + "/api/place", {
        "mapAddr": mapAddr,
        "mapX": x_pos,
        "mapY": y_pos,
        "message": message,
        "placeName": placeName
      },{
        headers :{
          'Authorization' : localStorage.getItem("jwt").toString(),
          'Content-Type': 'application/json'
        }
      })
    }

    /** 회원가입 */
    postSignUp(city,email,nickname,password,tel){
        return axios.post(SERVER_PATH+"/api/users", {
                "city": city,
                "email": email,
                "introduce": "안녕하세요",
                "nickname": nickname,
                "password": password,
                "tel": tel
            })

    }
    /** 로그인 */
    postSignIn(email,password){
        return axios.post(SERVER_PATH+"/api/users/login",{
            "email": email,
            "password": password
        })
    }
}

export default new ParkingService();