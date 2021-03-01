<template>
  <v-card class="pa-2 flex d-flex flex-column">
    <nuxt-link :to="'/products/' + product.category.key + '/' + product.url">
      <v-img
        :src="$store.state.SITE_URL + product.img"
        :lazy-src="$store.state.SITE_URL + product.img"
      ></v-img>
    </nuxt-link>
    <v-card-text class="px-0 py-2 flex">
      <nuxt-link :to="'/products/' + product.category.key + '/' + product.url">
        {{ product.title }}
      </nuxt-link>
    </v-card-text>
    <v-row class="align-center">
      <v-col cols="6" class="px-4"> {{ product.priceUAH }} ₴ </v-col>
      <v-spacer />
      <v-badge
        v-if="product.available || product.preOrder"
        left
        overlap
        offset-x="18"
        offset-y="18"
        icon="mdi-check"
        color="red"
        :value="isInCart"
      >
        <v-btn
          icon
          class="pa-4 mr-2 mb-1"
          @click="!isInCart ? addToCart(product) : (cartDialog = true)"
        >
          <v-icon color="green accent-4"> mdi-cart-variant </v-icon>
        </v-btn>
      </v-badge>
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
      <v-dialog v-model="cartDialog" max-width="700">
        <Cart :close-modal="closeModal" />
      </v-dialog>
      <v-col cols="12" class="pt-0 mt-n3 text-center">
        <span v-if="product.preOrder" class="pre-order"
          >Попереднє замовлення</span
        >
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex'
import Cart from '~/components/cart'

export default {
  components: {
    Cart,
  },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      cartDialog: false,
    }
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

<style scoped>
a {
  color: initial;
  text-decoration: none;
}
.pre-order {
  font-size: 11px;
  color: #fff;
  background: #ff5959;
  padding: 2px 8px;
  border-radius: 5px;
}
.not-available {
  line-height: 1;
  font-size: 14px;
}
</style>
