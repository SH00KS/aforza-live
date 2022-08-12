<template>
  <div class="visit">
    <div class="mapWrapper">
      <img
        class="avatar"
        src="https://developers.google.com/static/maps/documentation/maps-static/images/map-warning.png"
      />
    </div>
    <div class="visitDetails">
      <div class="visitName">{{ rep.Name }}</div>
      <div class="repPhone">Field Rep</div>
      <div class="repPhone">{{ rep.Phone }}</div>
    </div>
    <div class="contact">
      <div class="cta"><EmailFastOutline /></div>
      <div class="cta"><PhoneOutline /></div>
      <div class="cta"><MapMarkerOutline /></div>
    </div>
  </div>
</template>

<script>
import EmailFastOutline from "vue-material-design-icons/EmailFastOutline.vue";
import PhoneOutline from "vue-material-design-icons/PhoneOutline.vue";
import MapMarkerOutline from "vue-material-design-icons/MapMarkerOutline.vue";

export default {
  props: ["rep"],
  mounted() {},
  components: {
    EmailFastOutline,
    PhoneOutline,
    MapMarkerOutline,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rep {
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 120px;

  padding: 10px 10px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  position: relative;
}

.repDetails {
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: start;
  padding-left: 20px;
  width: 100%;
}

.avatarWrapper {
  display: flex;
}
.avatar {
  border-radius: 50%;
  width: 60px;
  border: 2px solid white;
}

.vehicle {
  width: 150px;
  position: absolute;
  top: 18px;
  z-index: -1;
}

.avatarIndicators {
  display: flex;
  margin: 10px 28px;
}

.avatarIndicator {
  border: 2px solid lightgreen;

  border-radius: 50%;
  width: 30px;
  margin-left: -15px;
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

.repName {
  font-weight: bold;
}

.repPhone {
  font-size: 13px;
}

.activeStatus {
  min-width: 10px;
  z-index: 2;
  min-height: 10px;
  padding: 1px;
  margin: 1px;
  background: lightgreen;
  position: absolute;
  border-radius: 50%;
  border: 1px solid lightgreen;
}

.inactiveStatus {
  min-width: 10px;
  min-height: 10px;
  padding: 1px;
  margin: 1px;
  background: white;
  position: absolute;
  border-radius: 50%;
  border: 1px solid lightgray;
}

.repDetails {
  margin-left: 80px;
}
</style>
