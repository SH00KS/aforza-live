<template>
  <div class="visit">
    <div class="visitDetailsWrapper">
      <div class="visitDetails">
        <div class="visitName">Enroute to {{ nextStopName }}</div>
      </div>
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
    <div class="map-and-info-row">
      <div class="mapWrapper" @click="$emit('show-account', nextStop.Id)">
        <img :src="nextStopUrl" />
      </div>
      <div class="next-stop-info">
        <div>
          <!-- <span class="title">Address: </span> -->
          <span class="title">{{ nextStopName }}</span>
        </div>

        <div>
          <!-- <span class="title">Address: </span> -->
          <span>{{ nextStopAddress }}</span>
        </div>
        <div>
          <!-- <span class="title">Tel: </span> -->
          <span>{{ nextStopTel }}</span>
        </div>
        <div>
          <span class="title">Estimated Arrival: </span>
          <span class="eta">17:53pm</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Data } from "./../../data.js";
import EmailFastOutline from "vue-material-design-icons/EmailFastOutline.vue";
import PhoneOutline from "vue-material-design-icons/PhoneOutline.vue";
import MapMarkerOutline from "vue-material-design-icons/MapMarkerOutline.vue";
// import { encode } from "google-polyline";
import polyline from "@mapbox/polyline";

export default {
  data() {
    return {
      previousStop: undefined,
      nextStop: undefined,
      nextStopName: "Unknown",
      nextStopUrl:
        "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-a+9ed4bd(-122.46589,37.77343),pin-s-b+000(-122.42816,37.75965),path-5+f44-0.5(%7DrpeFxbnjVsFwdAvr@cHgFor@jEmAlFmEMwM_FuItCkOi@wc@bg@wBSgM)/auto/600x300?access_token=pk.eyJ1IjoiZ3N0ZXBoZW5zYWZvcnphIiwiYSI6ImNrNTg5aDJ4ODA3d2UzcmptNTg0bXd5a3oifQ.Qv2SNfbkqXo8-Y4Q4XVHvg",
      nextStopAddress: "Unknown",
    };
  },
  props: ["rep", "account"],
  mounted() {
    if (this.rep.Stops && this.rep.Stops.length > 0) {
      this.nextStop = Data.accounts.find((account) => {
        return account.Id === this.rep.Stops[1];
      });

      this.previousStop = Data.accounts.find((account) => {
        return account.Id === this.rep.Stops[0];
      });
    }

    if (this.nextStop !== undefined && this.nextStop !== null) {
      this.nextStopName = this.nextStop.Name;
      this.nextStopAddress = this.nextStop.Address;
      this.nextStopTel = this.nextStop.Telephone;
    }

    if (this.nextStop && this.nextStop.Location) {
      console.log(polyline);
      // let path = encode(this.rep.Route);
      let path2 = polyline.encode(this.rep.Route);
      // console.log(path);
      // console.log(path2);
      this.nextStopUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-a+9ed4bd(${this.previousStop.Location}),pin-s-b+000(${this.nextStop.Location})/auto/600x300?access_token=pk.eyJ1IjoiZ3N0ZXBoZW5zYWZvcnphIiwiYSI6ImNrNTg5aDJ4ODA3d2UzcmptNTg0bXd5a3oifQ.Qv2SNfbkqXo8-Y4Q4XVHvg`;
    }
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
.visit {
  justify-content: space-between;
  margin-right: 20px;

  padding: 10px 10px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  position: relative;

  cursor: pointer;
  min-width: 620px;
  width: 65%;
}

.visitName {
  font-weight: bold;
  margin: 10px 0;
}

.visitDetails {
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: start;
  padding-left: 20px;
  width: 100%;
}

.contact {
  display: flex;
}

.cta {
  padding: 10px;
  color: grey;
}

.cta:hover {
  color: black;
  cursor: pointer;
}

.mapWrapper img {
  border-radius: 10px;
}

.mapWrapper {
  display: flex;
  border-radius: 10px;
  padding: 10px;
  /* width: 65%; */
  cursor: pointer;
}

.repName {
  font-weight: bold;
}

.repPhone {
  font-size: 13px;
}

.repDetails {
  margin-left: 80px;
}

.visitDetailsWrapper {
  display: flex;
  align-items: center;
}

.map-and-info-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.next-stop-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px;
}

.next-stop-info div {
  margin: 10px 0px;
}

.next-stop-info div .title {
  font-weight: bold;
}

.eta {
  font-size: 20px;
}
</style>
