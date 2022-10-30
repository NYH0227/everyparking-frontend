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

  diffTime(startAt,endAt){
    const start = this.setMoment(startAt);
    const end = this.setMoment(endAt);

    return Number(end.diff(start, "hours"));
  }

  timeView(startAt,endAt) {
    const start = this.setMoment(startAt).subtract(1, "M").format("MM월 DD일 HH시")
    const end = this.setMoment(endAt).subtract(1, "M").format("MM월 DD일 HH시")

    return start+" ~ "+end;
  }

  moneyFormat(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  phoneFormat(value) {
    return value.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1-$2-$3");
  }

}

export default new Commom();