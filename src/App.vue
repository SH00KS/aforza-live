<template>
  <div class="map">
    <Logo />
    <SidePanel @show-route="showRouteSidePanel" ref="sidePanel" />
    <Modal v-if="modalVisibility" ref="modal">
      <div class="rep-modal">
        <div class="rep-info">
          <User :rep="activeRep" @show-route="showRoute" />
          <RouteTimeline :rep="activeRep" @show-account="showAccount" />
          <div class="visitStatus">
            <LastVisited :rep="activeRep" @show-account="showAccount" />
            <NextStopCard :rep="activeRep" @show-account="showAccount" />
          </div>
          <div class="financials">
            <TodaysEarnings :rep="activeRep" />
            <PopularProducts />
          </div>
          <!-- <RepModalCTAs class="rep-modal-ctas" @show-route="showRoute" /> -->
        </div>
        <div class="rep-messaging">
          <Messenger :User="activeRep" />
        </div>
        <div v-on:click="toggleModal()" class="close-modal-icon">
          <WindowClose />
        </div>
      </div>
    </Modal >
    <MapView ref="mapview" />
  </div>
</template>

<script>
import MapViewVue from "./components/MapView.vue";
import SidePanel from "./components/SidePanel.vue";
import Modal from "./components/Modal.vue";
import RepModalHeader from "./components/RepModalHeader.vue";
import Messenger from "./components/Messenger.vue";
// import RepModalCTAs from "./components/RepModalCTAs.vue";
import WindowClose from "vue-material-design-icons/WindowClose.vue";
import Logo from "./components/Logo.vue";
import User from "./components/widgets/User.vue";
import NextStopCard from "./components/widgets/NextStopCard.vue";
import LastVisited from "./components/widgets/LastVisited.vue";
import RouteTimeline from "./components/widgets/RouteTimeline.vue";
import TodaysEarnings from "./components/widgets/TodaysEarnings.vue";
import PopularProducts from "./components/widgets/PopularProducts.vue";
import "animate.css";

export default {
  name: "App",
  data() {
    return {
      modalVisibility: false,
      activeRep: undefined,
    };
  },
  components: {
    MapView: MapViewVue,
    SidePanel: SidePanel,
    Modal: Modal,
    RepModalHeader: RepModalHeader,
    // RepModalCTAs: RepModalCTAs,
    WindowClose: WindowClose,
    NextStopCard,
    Logo,
    User,
    LastVisited,
    RouteTimeline,
    TodaysEarnings,
    PopularProducts,
    Messenger: Messenger,
  },
  methods: {
    toggleModal() {
      this.modalVisibility
        ? (this.modalVisibility = false)
        : (this.modalVisibility = true);
      this.$refs.sidePanel.closeSidebar();
    },
      closeModal() {
      this.modalVisibility = false;
    },
    setActiveRep(rep) {
      this.activeRep = rep;
      this.toggleModal();
    },
    showRoute() {
      this.modalVisibility = false;
      this.$refs.mapview.showRoute(this.activeRep);
    },
    showRouteSidePanel(rep) {
      if (rep.Status === "inactive") return;

      this.modalVisibility = false;
      this.$refs.mapview.showRoute(rep);
    },
    showAccount(accountId) {
      this.modalVisibility = false;
      this.$refs.mapview.showAccount(accountId);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.map {
  width: 80%;
}

.rep-modal {
  height: calc(100% - 20px);
  display: flex;
  flex-direction: row;
  padding: 10px;
}

.rep-info {
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #00000014;
}

.rep-messaging {
  width: 30%;
  height: 100%;
}

.rep-modal-ctas {
  margin-top: auto;
}

.close-modal-icon {
  cursor: pointer;
}

.visitStatus {
  display: flex;
}

.financials {
  display: flex;
}
</style>
