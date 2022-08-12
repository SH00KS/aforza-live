<template>

    <div class="SidebarToggle" v-on:click="toggleSidebar">
      <div class="avatarIndicators">
        <div v-for="item in reps" :key="item.id">
          <img
            class="avatarIndicator"
            v-if="item.Status === 'active'"
            :src="item.Avatar"
          />
        </div>
      </div>
    </div>
    <div class="Sidebar" v-if="visible">
      <div class="SidebarHeader">
        <div class="SidebarTitle">Field Reps</div>
        <ArrowLeft class="arrow-left" v-on:click="toggleSidebar" />
      </div>

      <div v-for="item in orderedReps" :key="item.id">
        <div
          class="rep"
          @click="$emit('show-route', item)"
          v-bind:class="{ 'inactive-rep': item.Status === 'inactive' }"
        >
          <div class="avatarWrapper">
            <div class="activeStatus" v-if="item.Status === 'active'"></div>
            <div class="inactiveStatus" v-if="item.Status === 'inactive'"></div>
            <img class="avatar" :src="item.Avatar" />
          </div>
          <div class="repDetails">
            <div class="repName">{{ item.Name }}</div>

            <div class="repPhone">{{ item.Phone }}</div>
          </div>
          <div class="contact">
            <div class="cta"><EmailFastOutline /></div>
            <div class="cta"><PhoneOutline /></div>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
import { Data } from "./../data.js";
import ArrowLeft from "vue-material-design-icons/ArrowLeft.vue";
import EmailFastOutline from "vue-material-design-icons/EmailFastOutline.vue";
import PhoneOutline from "vue-material-design-icons/PhoneOutline.vue";

export default {
  data() {
    return {
      visible: false,
      reps: Data.reps,
      orderedReps: [],
    };
  },
  mounted() {
    this.orderedReps = this.reps.sort((a, b) => {
      if (a.Status === "active") {
        return -1;
      } else if (b.Status === "inactive") {
        return 1;
      }
    });
  },
  components: {
    ArrowLeft,
    EmailFastOutline,
    PhoneOutline,
  },

  methods: {
    toggleSidebar() {
      console.log("inside toggle sidebar");
      this.visible ? (this.visible = false) : (this.visible = true);
      this.$parent.closeModal();
      
    },
    closeSidebar() {
      this.visible = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Sidebar {
  background: #f7f5f3;
  z-index: 10000;
  position: fixed;
  height: 100%;
  top: 0;
  width: 400px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  overflow: auto;
}

.SidebarTitle {
  border-bottom: 1px solid lightgrey;
  width: 80%;
  text-align: left;
}

.SidebarHeader {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  margin-bottom: 2px solid grey;
}

.SidebarToggle {
  z-index: 10000;
  position: fixed;

  top: 0;
  width: 200px;

  display: flex;
}

.rep {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;

  padding: 10px 10px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  cursor: pointer;
}

.inactive-rep {
  opacity: 0.5;

  cursor: default;
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
}

.avatarIndicators {
  display: flex;
  margin: 10px 28px;
  cursor: pointer;
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

.arrow-left {
  cursor: pointer;
}
</style>
