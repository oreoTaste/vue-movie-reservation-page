<template>
  <div class="reservation-form">
    <h1>Reservation page | 좌석 선택</h1>
    <div class="reservation-form__movie-name">
      영화제목 : [{{movieName}}]
    </div>
    <div class="reservation-form__movie-time">
      상영시간 : {{movieTime}}
    </div>
    <div class="reservation-form__price">
      가격 : {{price}}원 
    </div>
    <div class="reservation-form__roomNo">
      상영관 : {{roomNo}}관
    </div>
    <div class="reservation-form__seats-left">
      잔여좌석 : {{totalSeats - reservedSeats}}석 ({{seatRow}}행 {{seatColumn}}열)
    </div>
    <div >
      인원 :
      <input class="numOfPeople" type="number" placeholder="0">
    </div>
    <div class="myseat">
        {{mychoice}}
    </div>
    <button @click="paint()">좌석 조회하기</button>

    <table class="reservation-form__seat-map">
    </table>

    <button @click="confirm">예약하기</button>
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";

export default {
  name: "Home",
  components: {
    Nav,
  },
  data () { 
    return {
      movieName : "",
      movieTime : "",
      price : 0,
      reservedSeats : 0,
      roomNo : 0,
      scheduleId : 0,
      totalSeats : 0,
      seatRow : 0,
      seatColumn: 0,
      reservedRowsDetails : [],
      reservedColsDetails : [],
      mychoice : "",
      choiceCnt : 0
    } 
  },
  created() {
    // 영화정보 및 좌석지도 요청
    fetch(
    `http://localhost:8080/movie/${this.$route.params.id}`, {
      method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((json) => {
      this.movieName = json.movieName;
      this.movieTime = json.movieTime;
      this.price = json.price;
      this.reservedSeats = json.reservedSeats;
      this.roomNo = json.roomNo;
      this.scheduleId = json.scheduleId;
      this.totalSeats = json.totalSeats;
      this.seatRow = json.seatRow;
      this.seatColumn = json.seatColumn;
    });



    // 예약된 좌석정보 요청
    fetch(
      `http://localhost:8080/seat/${this.$route.params.id}`, {
      method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((json) => {
      json = JSON.parse(JSON.stringify(json));
      json.forEach(el => {
        this.reservedRowsDetails.push(el["row"]);
        this.reservedColsDetails.push(el["col"]);
      })
    });

  },
  mounted() {


  },
  methods: {
    confirm() {
      let arr = this.mychoice.split(",");
      let data = {
        "people": document.querySelector(".numOfPeople").value,
        "seatRow" : arr.map(el => el[0]).slice(0, arr.length - 1),
        "seatColumn" : arr.map(el => el.slice(1)).slice(0, arr.length - 1)
      };

      this.$router.push({path: `../confirm/${this.$route.params.id}`, name: "confirmationForm", params: data})
    },
    paint() {
      const seatMap = document.querySelector(".reservation-form__seat-map");
      seatMap.innerHTML = "";
      for(let i = 0; i < this.seatRow; i++) {
        const seatRow = document.createElement("tr");
        seatRow.classList = "r" + i;
        for(let j = 0; j < this.seatColumn; j++) {
          const seatCol = document.createElement("td");
          let b = true;
          for(let k = 0; k < this.reservedRowsDetails.length; k++) {
            if(this.reservedRowsDetails[k] == i + 1 && this.reservedColsDetails[k] == j + 1) {
              b = false;
            }
          }
          if(b) {
            seatCol.innerText = String.fromCharCode(i + 65) + (j + 1);
            seatCol.addEventListener("click", this.chooseSeat);
          } else {
            seatCol.classList = "occupied";
          }

          seatRow.appendChild(seatCol);
        }
        seatMap.appendChild(seatRow);
      }    
    },
    chooseSeat(e) {
      let num = parseInt(document.querySelector(".numOfPeople").value);
      if(num > this.choiceCnt) {
        this.mychoice += e.target.innerText + ",";
        this.choiceCnt += 1;
      }
    }
  }
};
</script>