<template>
  <div class="confirm-form">
    <h1>Confirmation page | 연락처 선택</h1>
    <div class="confirm-form__people">
      <div class="confirm-form__title"> 총 인원 </div>
      <div class="confirm-form__content">{{people}}명</div>
    </div>
    <div class="confirm-form__seat">
      <div class="confirm-form__title">좌석현황</div>
      <div class="confirm-form__seat__content"></div>
    </div>
    <div class="confirm-form__tel tel">
      <div class="confirm-form__title"> 연락처 </div>
      <div class="confirm-form__content">
        <input class="js-tel" type="tel" placeholder="000-0000-0000">
      </div>
    </div>

    <button @click="confirm()">예약하기</button>
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
      id: this.$route.params.id,
      tel: this.$route.params.tel,
      people : this.$route.params.people,
      seatRow : this.$route.params.seatRow,
      seatColumn : this.$route.params.seatColumn,
    } 
  },
  created() {
  },
  mounted() {
    const box = document.querySelector(".confirm-form__seat__content");
    for (const key in this.seatRow) {
      if (Object.hasOwnProperty.call(this.seatRow, key)) {
        const item = document.createElement("div");
        item.classList.add("confirm-form__seat__item");
        item.innerText = this.seatRow[key] + "" + this.seatColumn[key];
        box.appendChild(item);
      }
    }
  },
  methods: {
    confirm() {
      let data = {
        "tel" : document.querySelector(".js-tel").value,
        "people": this.people,
        "seatRow" : this.seatRow.join(),
        "seatColumn" : this.seatColumn.join()
      };
      axios.post(`http://localhost:8080/reservation/${this.id}`, null, {params : data})
      .then((response) => {
        this.$router.push({path: `../myreservation/${this.$route.params.id}`, name: "Myreservation", params: response})
      })
    }
  }
};



</script>