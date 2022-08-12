<template>
  <div class="lastVisit">
    <div class="lastVisitTitle">Todays Earnings</div>
    <div
      class="value"
      v-bind:class="{
        'value-negative': parseInt(rep.TodaysEarnings) < targetAmountNumber,
        'value-positive': parseInt(rep.TodaysEarnings) >= targetAmountNumber,
      }"
    >
      <span class="todays-earning">{{ todaysEarningsAmount }}</span>
      <span class="target">Target: {{ targetAmount }}</span>
      <span class="target">Commision: {{ commissionAmount }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      targetAmountNumber: 9000,
      targetAmount: 9000,
      commissionAmount: 9000,
      todaysEarningsAmount: 9000,
    };
  },
  props: ["rep"],
  mounted() {
    if (this.rep) {
      this.todaysEarningsAmount = this.formatPrice(
        parseInt(this.rep.TodaysEarnings)
      );
      this.targetAmount = this.formatPrice(this.targetAmount);
      this.commissionAmount = this.formatPrice(this.rep.TodaysEarnings / 100);
    }
  },
  components: {},
  methods: {
    formatPrice(value) {
      // let val = (value / 1).toFixed(2).replace(".", ",");
      // return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

      if (typeof value !== "number") {
        return value;
      }
      var formatter = new Intl.NumberFormat("en-EN", {
        style: "currency",
        currency: "GBP",
      });
      return formatter.format(value);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lastVisit {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;

  padding: 10px 10px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  position: relative;
  width: 25%;

  /* width: 50%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px; */
}

.lastVisitMeta {
  margin: 10px 0;
}

.lastVisitTitle {
  font-weight: bold;
  margin: 10px 0;
}

.value {
  font-weight: bold;

  margin: 10px 0;
  background-color: lightgreen;
  padding: 20px;
  border-radius: 10px;

  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}

.value-negative {
  background-color: red;
}

.value-positive {
  background-color: lightgreen;
}

.lastVisitLocation {
  font-weight: bold;
  font-size: 13px;
  margin-top: 10px;
}

.lastVisitDateTime {
  font-size: 12px;
  font-style: italic;
}

.map {
  border-radius: 10px;
}

.target,
.commission {
  font-size: 12px;
}
</style>
