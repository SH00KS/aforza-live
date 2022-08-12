<template>
  <div class="lastVisit">
    <div class="title-and-cta">
      <div class="lastVisitTitle">Last Visited</div>
      <div class="contact">
        <div class="cta"><EmailFastOutline /></div>
        <div class="cta"><PhoneOutline /></div>
        <div class="cta">
          <MapMarkerOutline
            @click="$emit('show-account', nextStop.Id)"
            class="map-marker"
          />
        </div>
      </div>
    </div>
    <img
      class="map"
      :src="lastVisitMapUrl"
      @click="$emit('show-account', nextStop.Id)"
    />

    <div class="lastVisitMeta">
      <div class="lastVisitLocation">{{ nextStopName }}</div>
      <div class="lastVisitDateTime">10/Aug/22 12:03</div>
    </div>
  </div>
</template>

<script>
import { Data } from "./../../data.js";
import EmailFastOutline from "vue-material-design-icons/EmailFastOutline.vue";
import PhoneOutline from "vue-material-design-icons/PhoneOutline.vue";
import MapMarkerOutline from "vue-material-design-icons/MapMarkerOutline.vue";

export default {
  data() {
    return {
      nextStop: undefined,
      nextStopName: "Unknown",
      lastVisitMapUrl:
        "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-122.4241,37.78,18.5,0,60/600x600?access_token=pk.eyJ1IjoiZ3N0ZXBoZW5zYWZvcnphIiwiYSI6ImNrNTg5aDJ4ODA3d2UzcmptNTg0bXd5a3oifQ.Qv2SNfbkqXo8-Y4Q4XVHvg",
    };
  },
  props: ["rep"],
  mounted() {
    if (this.rep.Stops && this.rep.Stops.length > 0) {
      this.nextStop = Data.accounts.find((account) => {
        return account.Id === this.rep.Stops[0];
      });
    }

    if (this.nextStop !== undefined && this.nextStop !== null)
      this.nextStopName = this.nextStop.Name;

    if (this.nextStop && this.nextStop.Location)
      this.lastVisitMapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-a+9ed4bd(${this.nextStop.Location})/${this.nextStop.Location},18.5,0,60/600x600?access_token=pk.eyJ1IjoiZ3N0ZXBoZW5zYWZvcnphIiwiYSI6ImNrNTg5aDJ4ODA3d2UzcmptNTg0bXd5a3oifQ.Qv2SNfbkqXo8-Y4Q4XVHvg`;
  },
  components: {
    EmailFastOutline,
    PhoneOutline,
    MapMarkerOutline,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lastVisit {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  padding: 10px 10px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  position: relative;
  width: 25%;
}

.lastVisitMeta {
  margin: 10px 0;
  margin-top: auto;
}

.lastVisitTitle {
  font-weight: bold;
  margin: 10px 0;
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
  margin: auto;
  cursor: pointer;
}

.contact {
  display: flex;
}

.map-marker {
  cursor: pointer;
}

.cta {
  padding: 10px;
  color: grey;
}

.cta:hover {
  color: black;
  cursor: pointer;
}
.title-and-cta {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
}
</style>
