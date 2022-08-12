<template>
  <div id="map"></div>
</template>

<script>
import { Data } from "./../data.js";

export default {
  data() {
    return {
      repsRouteLocationIndexes: {},
      map: undefined,
      userInteracting: false,
    };
  },
  name: "MapView",

  mounted() {
    console.log("mounted", Data);

    this.notificationKeyCounter = 0;

    mapboxgl.accessToken =
      "pk.eyJ1IjoiZ3N0ZXBoZW5zYWZvcnphIiwiYSI6ImNrNTg5aDJ4ODA3d2UzcmptNTg0bXd5a3oifQ.Qv2SNfbkqXo8-Y4Q4XVHvg";
    this.map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/gstephensaforza/cl6nd4fgc001f15p205t7r1sx",
      zoom: 1.5,
      center: [-0.078883, 51.548131],
      projection: "globe",
    });

    this.map.on("style.load", () => {
      this.map.setFog({});
    });

    this.map.on("load", async () => {
      this.onMapLoad();
    });

    console.log("mounted end");
  },

  methods: {
    async onMapLoad() {
      console.log("map loaded");

      this.setupGlobeSpin();

      this.setupAccounts();

      this.setupNotificationListener();

      // Get the initial location of the International Space Station (ISS).
      Data.reps.forEach((rep) => {
        if (rep.Status === "inactive") return;

        this.loadSalesRepRoute(rep);

        // this.map.on("click", rep.Id, (e) => {
        //   // fire event
        //   this.$parent.setActiveRep(rep);
        // });

        // Change the cursor to a pointer when the mouse is over the places layer.
        this.map.on("mouseenter", rep.Id, () => {
          this.map.getCanvas().style.cursor = "pointer";
        });

        // Change it back to a pointer when it leaves.
        this.map.on("mouseleave", rep.Id, () => {
          this.map.getCanvas().style.cursor = "";
        });
      });
    },

    setupNotificationListener() {
      const that = this;
      setInterval(async () => {
        const randomRep =
          Data.reps[Math.floor(Math.random() * (8 - 0 + 1) + 0)];

        let previousVisitName = "Asda";
        if (randomRep) {
          previousVisitName = Data.accounts.find((account) => {
            return account.Id === randomRep.Stops[0];
          }).Name;
        }

        if (this.notificationKeyCounter === 0) {
          this.$toastMsg(
            "completed a visit at " + previousVisitName,
            randomRep
          );
        }
        if (this.notificationKeyCounter === 1) {
          this.$toastMsg(
            "TRAFFIC ALERT: Congestion on M4 (Junction 28-32)",
            null,
            "warning"
          );
        }
        if (this.notificationKeyCounter === 2) {
          this.$toastMsg("completed their route", randomRep);
        }
        this.notificationKeyCounter = (this.notificationKeyCounter + 1) % 3;
      }, Math.floor(Math.random() * (40000 - 20000 + 1) + 20000));

      window.addEventListener("keypress", (e) => {
        const randomRep =
          Data.reps[Math.floor(Math.random() * (8 - 0 + 1) + 0)];

        let previousVisitName = "Asda";
        if (randomRep) {
          previousVisitName = Data.accounts.find((account) => {
            return account.Id === randomRep.Stops[0];
          }).Name;
        }

        if (e.code === "Backquote") {
          if (this.notificationKeyCounter === 0) {
            this.$toastMsg(
              "completed a visit at " + previousVisitName,
              randomRep
            );
          }
          if (this.notificationKeyCounter === 1) {
            this.$toastMsg(
              "TRAFFIC ALERT: Congestion on M4 (Junction 28-32)",
              null,
              "warning"
            );
          }
          if (this.notificationKeyCounter === 2) {
            this.$toastMsg("completed their route", randomRep);
          }
          this.notificationKeyCounter = (this.notificationKeyCounter + 1) % 3;
        }
      });
    },

    setupAccounts() {
      console.log("setupAccounts");
      this.map.addSource("accounts", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: Data.accounts.map((account) => {
            return {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: account.Location,
              },
              properties: {
                title: account.Name,
                pin: account.Pin,
              },
            };
          }),
        },
      });

      // Add a symbol layer
      this.map.addLayer({
        id: "accounts",
        type: "symbol",
        source: "accounts",
        layout: {
          "icon-image": ["get", "pin"],
          // get the title name from the source's "title" property
          "text-field": ["step", ["zoom"], "", 0, "", 10, ["get", "title"]],
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-anchor": "center",
          "text-offset": [0, 1],
          "icon-allow-overlap": true,
          "text-allow-overlap": true,
        },
      });
    },

    setupGlobeSpin() {
      this.spinGlobe();

      // Pause spinning on interaction
      this.map.on("mousedown", () => {
        this.userInteracting = true;
      });

      // Restart spinning the globe when interaction is complete
      this.map.on("mouseup", () => {
        this.userInteracting = false;
        this.spinGlobe();
      });

      // These events account for cases where the mouse has moved
      // off the this.map, so 'mouseup' will not be fired.
      this.map.on("dragend", () => {
        this.userInteracting = false;
        this.spinGlobe();
      });
      this.map.on("pitchend", () => {
        this.userInteracting = false;
        this.spinGlobe();
      });
      this.map.on("rotateend", () => {
        this.userInteracting = false;
        this.spinGlobe();
      });

      // When animation is complete, start spinning if there is no ongoing interaction
      this.map.on("moveend", () => {
        this.spinGlobe();
      });
    },

    spinGlobe() {
      // At low zooms, complete a revolution every two minutes.
      const secondsPerRevolution = 120;
      // Above zoom level 5, do not rotate.
      const maxSpinZoom = 3;
      // Rotate at intermediate speeds between zoom levels 3 and 5.
      const slowSpinZoom = 0;

      let spinEnabled = true;

      const zoom = this.map.getZoom();
      if (spinEnabled && !this.userInteracting && zoom < maxSpinZoom) {
        let distancePerSecond = 360 / secondsPerRevolution;
        if (zoom > slowSpinZoom) {
          // Slow spinning at higher zooms
          const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
          distancePerSecond *= zoomDif;
        }
        const center = this.map.getCenter();
        center.lng -= distancePerSecond;
        // Smoothly animate the this.map over one second.
        // When this animation is complete, it calls a 'moveend' event.
        this.map.easeTo({ center, duration: 1000, easing: (n) => n });
      }
    },

    async loadSalesRepRoute(rep) {
      console.log(
        "loadSalesRepRoute " + rep.Name,
        this.repsRouteLocationIndexes
      );

      let repRouteLocationIndex =
        this.repsRouteLocationIndexes !== undefined &&
        this.repsRouteLocationIndexes[rep.Id] !== undefined
          ? this.repsRouteLocationIndexes[rep.Id]
          : 0;

      const geojson = await this.getLocation(rep, repRouteLocationIndex);

      // Add the ISS location as a source.
      this.map.addSource(rep.Id, {
        type: "geojson",
        data: geojson,
      });
      // Add the rocket symbol layer to the this.map.
      this.map.addLayer({
        id: rep.Id,
        type: "symbol",
        source: rep.Id,
        layout: {
          // This icon is a part of the Mapbox Streets style.
          // To view all images available in a Mapbox style, open
          // the style in Mapbox Studio and click the "Images" tab.
          // To add a new image to the style at runtime see
          // https://docs.mapbox.com/mapbox-gl-js/example/add-image/
          // "icon-image": rep.Pin,
          // "text-field": rep.Name,
          "text-anchor": "center",
          "text-offset": [0, 1],
        },
      });

      // Create a DOM element for each marker.
      const el = document.createElement("div");
      const width = 30;
      const height = 30;
      el.className = "marker";
      el.style.backgroundImage = `url(${rep.Avatar})`;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.borderRadius = "50%";
      el.style.border = "2px solid white";
      el.style.backgroundSize = "100%";

      // console.log("GEOJSON", geojson.features[0].geometry.coordinates);
      // Add markers to the map.
      let marker = new mapboxgl.Marker(el)
        .setLngLat(geojson.features[0].geometry.coordinates)
        .addTo(this.map);

      el.addEventListener("click", () => {
        this.$parent.setActiveRep(rep);
      });

      // Update the source from the API every 2 seconds.
      const that = this;
      setInterval(async () => {
        let repRouteLocationIndex =
          this.repsRouteLocationIndexes !== undefined &&
          this.repsRouteLocationIndexes[rep.Id] !== undefined
            ? this.repsRouteLocationIndexes[rep.Id]
            : 0;

        const geojson = await that.getLocation(rep, repRouteLocationIndex);
        this.map.getSource(rep.Id).setData(geojson);

        marker.setLngLat(geojson.features[0].geometry.coordinates);
      }, 2000);
    },

    async getLocation(rep, repRouteLocationIndex) {
      let repLongLat = rep.Route[repRouteLocationIndex];

      try {
        if (repRouteLocationIndex === rep.Route.length)
          repRouteLocationIndex = 0;

        this.repsRouteLocationIndexes[rep.Id] = repRouteLocationIndex + 1;

        return {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: repLongLat,
              },
            },
          ],
        };
      } catch (err) {
        console.error(err);
      }
    },

    showAccount(accountId) {
      console.log("showing account", accountId);

      let account = Data.accounts.find((account) => {
        return account.Id === accountId;
      });

      if (account) {
        this.map.flyTo({ center: account.Location, zoom: 14 });
      }
    },

    showRoute(rep) {
      console.log("mapview showroute", rep);

      const repRouteLayer = this.map.getLayer("reproute");
      if (repRouteLayer) this.map.removeLayer("reproute");

      const repRouteSource = this.map.getSource("reproute");
      if (repRouteSource) this.map.removeSource("reproute");

      this.map.addSource("reproute", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: rep.Route,
          },
        },
      });
      this.map.addLayer(
        {
          id: "reproute",
          type: "line",
          source: "reproute",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#46ccc2",
            "line-width": 6,
          },
        },
        "1"
      );

      let repRouteLocationIndex =
        this.repsRouteLocationIndexes !== undefined &&
        this.repsRouteLocationIndexes[rep.Id] !== undefined
          ? this.repsRouteLocationIndexes[rep.Id]
          : 0;

      let routeCoords = rep.Route.reduce(function (bounds, coord) {
        return bounds.extend(coord);
      }, new mapboxgl.LngLatBounds(rep.Route[0], rep.Route[0]));

      this.map.fitBounds(routeCoords, {
        padding: {
          top: 90,
          bottom: 80,
          left: 60,
          right: 60,
        },
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  margin: 0;
  padding: 0;
}
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
.marker {
  display: block;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
}
</style>
