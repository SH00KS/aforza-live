<template>
  <div class="container">
    <ul class="timeline">
      <li
        v-for="item in repStops"
        :key="item"
        v-bind:class="{ 'active-tl': item.IsFirst }"
        :style="widthStyle"
        @click="$emit('show-account', item.Id)"
      >
        {{ item.Name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { Data } from "./../../data.js";
export default {
  data() {
    return {
      repStops: [],
    };
  },
  props: ["rep"],
  mounted() {
    this.rep.Stops.forEach((stop, index) => {
      let account = Data.accounts.find((account) => {
        return account.Id === stop;
      });

      if (account) {
        account.IsFirst = index === 0;
        this.repStops.push(account);
      }
    });
  },
  components: {},
  computed: {
    widthStyle() {
      return {
        width: `${100 / this.repStops.length}%`,
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 100%;
  margin: 0 auto 10px -10px;
}

.timeline {
  counter-reset: test 0;
  position: relative;
  display: flex;
  justify-content: space-evenly;
}

.timeline li {
  list-style: none;
  float: left;
  /* width: calc(100% / `${repStops.length}`); */
  position: relative;
  text-align: center;
  font-size: 12px;
}

/* ul:nth-child(1) {
  color: #4caf50;
} */

.timeline li:before {
  counter-increment: test;
  content: counter(test);
  width: 20px;
  height: 20px;
  border: 3px solid #35c3aa;
  border-radius: 50%;
  display: block;
  text-align: center;
  line-height: 20px;
  margin: 0 auto 10px auto;
  background: #fff;
  color: #000;
  transition: all ease-in-out 0.3s;
  cursor: pointer;
}

.timeline li:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 3px;
  background-color: lightgrey;
  top: 10px;
  left: -50%;
  z-index: -999;
  transition: all ease-in-out 0.3s;
}

.timeline li:first-child:after {
  content: none;
}
.timeline li.active-tl {
  color: #555555;
}
.timeline li.active-tl:before {
  background: #35c3aa;
  color: #F1F1F1;
}

.timeline li.active-tl + li:after {
  background: #35c3aa;
}
</style>
