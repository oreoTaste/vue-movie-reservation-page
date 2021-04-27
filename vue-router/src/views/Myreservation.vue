<template>
  <div class="reservation-form">
    <h1>예약이 완료되었습니다</h1>
    <article class="reservation-devider">
      <div class="reservation-left">
        <div class="left__movie-name">
          <div class="confirm-form__title">영화 제목</div>
          <div class="confirm-form__content">{{movieName}}</div>
        </div>
        <div class="left__movie-time">
          <div class="confirm-form__title"> 상영 시간 </div>
          <div class="confirm-form__content">{{movieTime}}</div>
        </div>
        <div class="left__total-price">
          <div class="confirm-form__title"> 가격 </div>
          <div class="confirm-form__content">{{price * people}}원</div>
        </div>
        <div class="left__room">
          <div class="confirm-form__title">상영관</div>
          <div class="confirm-form__room__content">{{roomNo}}관</div>
        </div>      
      </div>
      <div class="reservation-right">
        <div class="confirm-form__id">
          <div class="confirm-form__title">예약번호</div>
          <div class="confirm-form__content">{{id}}</div>
        </div>
        <div class="confirm-form__tel">
          <div class="confirm-form__title"> 연락처 </div>
          <div class="confirm-form__content">{{tel}}</div>
        </div>
        <div class="confirm-form__people">
          <div class="confirm-form__title"> 총 인원 </div>
          <div class="confirm-form__content">{{people}}명</div>
        </div>
        <div class="confirm-form__seat">
          <div class="confirm-form__title">좌석정보</div>
          <div class="confirm-form__seat__content"></div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import axios from 'axios'
import Nav from "@/components/Nav.vue";

export default {
  name: "confirmationForm",
  components: {
    Nav,
  },
  data () { 
    return {
      id: this.$route.params.data.reservationId,
      tel: this.$route.params.data.tel,
      people : this.$route.params.data.people,
      seatRow : this.$route.params.data.seatRow,
      seatColumn : this.$route.params.data.seatColumn,
      movieName : this.$route.params.data.movieInfo.movieName,
      movieTime : this.$route.params.data.movieInfo.movieTime,
      price : parseInt(this.$route.params.data.movieInfo.price),
      roomNo : this.$route.params.data.movieInfo.roomNo
    } 
  },
  created() {
  },
  mounted() {
    const box = document.querySelector(".confirm-form__seat__content");
    let rowArr = this.seatRow.split(",");
    let colArr = this.seatColumn.split(",");
    for (const key in rowArr) {
      const item = document.createElement("div");
      item.classList.add("confirm-form__seat__item");
      item.innerText = rowArr[key] + "" + colArr[key];
      box.appendChild(item);
    }
  },
  methods: {
  }
};



</script>
