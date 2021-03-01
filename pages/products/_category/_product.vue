<template>
  <div>
    <div v-if="isLoading" class="text-center">
      <v-progress-linear
        indeterminate
        color="red"
        background-color="yellow lighten-3"
      ></v-progress-linear>
    </div>
    <div v-else>
      <v-img
        :src="$store.state.SITE_URL + product.img"
        :lazy-src="$store.state.SITE_URL + product.img"
        class="p-image float-none float-sm-left mr-0 mr-sm-4 mb-2 mb-sm-4"
      ></v-img>
      <h1 class="p-header">
        {{ product.title }}
        <span v-if="product.preOrder" class="pre-order"
          >Попереднє замовлення</span
        >
      </h1>

      <v-row class="align-center my-0">
        <v-col cols="6" class="px-4">
          <v-btn text class="p-price" color="error"
            >{{ product.priceUAH }}₴</v-btn
          >
        </v-col>
        <v-spacer />
        <v-col
          v-if="!product.available && !product.preOrder"
          cols="12"
          sm="6"
          class="pt-2"
        >
          <div class="not-available text-center text-sm-rigth">
            Немає в наявності
          </div>
        </v-col>
        <v-col
          v-if="product.available || product.preOrder"
          cols="6"
          class="px-4 text-right"
        >
          <v-badge
            right
            overlap
            offset-x="18"
            offset-y="18"
            icon="mdi-check"
            color="black darken-1"
            :value="isInCart"
          >
            <v-btn
              color="green accent-4"
              dark
              @click="!isInCart ? addToCart(product) : (cartDialog = true)"
            >
              Придбати
            </v-btn>
          </v-badge>
        </v-col>
        <v-dialog v-model="cartDialog" max-width="700">
          <Cart :close-modal="closeModal" />
        </v-dialog>
      </v-row>

      <div class="description mb-6">{{ product.page.descr }}</div>

      <v-row>
        <v-col>
          <v-card class="mb-4 p-card" style="width: 100%">
            <v-card-title class="justify-center"> Характеристики </v-card-title>
            <v-simple-table>
              <template #default>
                <tbody>
                  <tr v-for="f in product.page.feautures" :key="f.key">
                    <td class="text-left">
                      <b>{{ f.key }}</b>
                    </td>
                    <td class="text-center">{{ f.value }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
      </v-row>

      <v-row v-for="f in product.page.functions" :key="f.group">
        <v-col>
          <v-card class="mb-4 p-card" style="width: 100%">
            <v-card-title class="justify-center"> {{ f.group }} </v-card-title>
            <v-simple-table>
              <template #default>
                <tbody>
                  <tr v-for="item in f.list" :key="item">
                    <td class="text-center">{{ item }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
      </v-row>
      <!-- <pre>{{ JSON.stringify(product, null, 2) }}</pre> -->
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      isLoading: true,
      product: {},
      cartDialog: false,
    }
  },
  async fetch() {
    const response = await this.$axios.$get(
      `/products/u/${this.$route.params.product}`
    )
    this.product = response.data
    this.isLoading = false
  },
  computed: {
    isInCart() {
      return this.$store.state.cart.some(
        ({ product }) => this.product._id === product._id
      )
    },
  },
  methods: {
    ...mapMutations({
      addToCart: 'cart/add',
    }),
    closeModal() {
      this.cartDialog = false
    },
  },
}
</script>

<style lang="scss" scoped>
.pre-order {
  font-size: 11px;
  color: #fff;
  background: #ff5959;
  padding: 2px 8px;
  border-radius: 5px;
}
.v-card.p-card {
  border-top: 3px solid #e53935 !important;
}
.p-price {
  font-size: 20px !important;
}
.p-image {
  width: 45%;
}
.p-header {
  font-size: 18px;
  margin-bottom: 14px;
}
.description {
  white-space: pre-line;
  text-align: justify;
}
@media screen and (max-width: 600px) {
  .p-image {
    width: 100%;
  }
}
</style>
