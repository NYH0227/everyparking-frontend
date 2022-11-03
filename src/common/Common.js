import moment from "moment";


class Commom {

  setMoment(time) {
    const value = moment();

    value.set('year', time[0]);
    value.set('month',time[1]);
    value.set('day',time[2]);
    value.set('hour',time[3]);
    value.set('minute',time[4]);
    value.set('second',time[5]);

    return value;
  }

  timeRange(startAt,endAt){
    const start = startAt[2]+"일 " + startAt[3]+"시";
    const end = endAt[2]+"일 "+endAt[3]+"시";

    return start+ " ~ " + end;
  }

  timeRangeM(startAt,endAt){
    const start = startAt[1]+"월 "+startAt[2]+"일 " + startAt[3]+"시";
    const end = endAt[1]+"월 "+endAt[2]+"일 "+endAt[3]+"시";

    return start+ " ~ " + end;
  }

  // 일단 한달 31일로 계산
  timePer(start,end){
    const now = new Date();
    const startTime = start[4]+(start[3]*60)+(start[2]*60*24)+(start[1]*60*24*31);
    const endTime = end[4]+(end[3]*60)+(end[2]*60*24)+(end[1]*60*24*31);
    const nowTime = now.getMinutes()+(now.getHours()*60)+(now.getDay()*60*24)+((now.getMonth()+1)*60*24*31)


    return 100-Math.floor((endTime-nowTime)/(endTime-startTime)*100);
  }

  timeFormat(time) {
    return time[1]+"월 "+time[2]+"일 " +time[3]+"시"
  }

  moneyFormat(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  phoneFormat(value) {
    return value.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1-$2-$3");
  }
}

export default new Commom();