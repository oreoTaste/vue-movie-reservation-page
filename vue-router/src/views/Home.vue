<template>
  <div class="home">
    <img alt="영화예매 상단로고" src="../assets/logo.png" />
    <Nav />

    <div class="index-main">
        <div class="theater">
            <div class="theater-title index-main__title">상영관</div>
            <div v-for="(val, index) in room">
              {{val}}관
            </div>
        </div>
        <div class="movie">
            <div class="movie-title index-main__title">상영작</div>
            <div v-for="val in name">
              {{val}}
            </div>
        </div>
        <div class="time">
            <div class="time-title index-main__title">상영시간</div>
            <div v-for="val in time">
              {{val}}
            </div>
        </div>
        <div class="seat">
            <div class="seat-title index-main__title">남은 좌석 (전체 좌석)</div>
            <div v-for="val in seats">
              {{val}}
            </div>
        </div>
        <div class="reservation">
            <div class="reservation-title index-main__title">예약하기</div>
            <div v-for="val in schedule" :data-id="val">
              <button @click="register(val)">예약하기</button>
            </div>
        </div>
    </div>

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
      schedule: [],
      room: [],
      name: [],
      time: [],
      total: [],
      seats: []
    } 
  },
  methods: {
    register(e) {
      this.$router.push({path: "/reservation/" + e})
    }
  },
  mounted() {
    fetch(
      'http://localhost:8080/movie/all', {
      method: 'GET'
    }).then((response) => {
        alert("방문해주셔서 감사합니다.");
        return response.json();
    }).then((json) => {
        json.forEach((el) => {
          this.schedule.push(el.scheduleId);
          this.room.push(el.roomNo);
          this.name.push(el.movieName);
          this.time.push(el.movieTime);
          this.total.push(el.totalSeats)
          this.seats.push(parseInt(el.totalSeats - el.reservedSeats) + " (" + el.totalSeats + ")")
        })
    });
  }
};



</script>