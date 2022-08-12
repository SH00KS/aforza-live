<template>
  <div class="lastVisit">
    <div class="lastVisitTitle">Popular Products</div>
    <div class="products">
      <div
        class="value"
        v-for="(product, index) in products"
        :key="product.name"
      >
        <div class="tag">{{ product.tags[0].name }}</div>
        <img class="product" :src="product.image" />
        <div>{{ product.name }}</div>
      </div>
      <!-- <div class="value">
        <img
          class="product"
          src="https://www.pinpng.com/pngs/m/91-913146_strong-end-to-year-aids-heineken-results-heineken.png"
        />
        <div>Heineken Premium Lager Beer Cans 4 x 440ml</div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: ["rep"],
  data() {
    return {
      popularProducts: [],
      products: [
        {
          image:
            "https://static.turbosquid.com/Preview/2014/07/09__23_04_06/1_0028Kopie.jpg4a444ab9-d14b-4b2e-b99a-6be577434c20Large.jpg",
          name: "Heineken Premium Lager",
          tags: [{ name: "Multibuy Offer" }],
          icon: "checkboxMultipleBlankCircleOutline",
        },
        {
          image:
            "https://www.pinpng.com/pngs/m/91-913146_strong-end-to-year-aids-heineken-results-heineken.png",
          name: "Heineken Beer Cans 4 x 440ml",
          tags: [{ name: "Aforza Predicted " }],
          icon: "autoFix",
        },
        {
          image:
            "https://mpng.subpng.com/20180805/eoa/kisspng-coca-cola-fizzy-drinks-pepsi-diet-coke-coca-cola-boite-33cl-%E5%8F%AF%E5%8F%A3%E5%8F%AF%E4%B9%90-coca-cola-5b66e177236745.694116971533469047145.jpg",
          name: "Coca-Cola Original Taste",
          tags: [{ name: "Recently Purchased" }, { name: "Top Seller" }],
          icon: "handCoin",
        },
        // {
        //   image:
        //     "https://toppng.com/uploads/preview/lotion-bottle-11551054694dcepy4iepp.png",
        //   name: "Aesop Oxidant Serum 100ml",
        //   tags: [],
        // },
        // {
        //   image:
        //     "https://www.pngkey.com/png/full/451-4514991_walkers-crisps-cheese-and-onion-walkers.png",
        //   name: "Walkers Grab Bag",
        //   tags: [],
        // },
        // {
        //   image:
        //     "https://e7.pngegg.com/pngimages/109/522/png-clipart-nachos-pringles-potato-crisps-baked-potato-potato-chip-cheese-food-cheese.png",
        //   name: "Pringles Snack Pack",
        //   tags: [],
        // },
      ],
    };
  },
  mounted() {
    const randomNumber = Math.floor(Math.random() * 6);
    if (!this.popularProducts.includes(randomNumber)) {
      this.popularProducts.push(randomNumber);
      console.log(randomNumber);
    }

    const randomNumber2 = Math.floor(Math.random() * 6);
    if (!this.popularProducts.includes(randomNumber)) {
      this.popularProducts.push = randomNumber;
      console.log(randomNumber2);
    }

    const randomNumber3 = Math.floor(Math.random() * 6);
    if (!this.popularProducts.includes(randomNumber)) {
      this.popularProducts.push = randomNumber;
      console.log(randomNumber3);
    }
  },
  components: {},
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
  width: 65%;
}

.lastVisitMeta {
  margin: 10px 0;
}

.lastVisitTitle {
  font-weight: bold;
  margin: 10px 0;
}

.products {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.product {
  height: 70px;
}

.value {
  font-weight: bold;

  margin: 10px;
  background-color: #d3d3d33d;
  padding: 30px 10px;
  border-radius: 10px;
  font-size: 12px;
  width: 40%;
  position: relative;
  /* display: flex;
  justify-content: center;
  flex-direction: column; */
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

.tag {
  background: purple;
  border-radius: 12px;
  color: white;
  width: fit-content;
  padding: 5px;
  margin: 5px;
  position: absolute;
  top: -15px;
  font-size: 11px;
}
</style>
