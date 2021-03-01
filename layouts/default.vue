<template>
  <v-app>
    <v-container>
      <v-card elevation="2">
        <v-container class="pa-0 mt-2">
          <v-row align="center">
            <v-col cols="7" class="text-left py-0">
              <nuxt-link to="/" class="menu-item d-inline-flex">
                <v-icon color="red darken-1" class="basket">
                  mdi-basket
                </v-icon>
                <img
                  src="~/assets/images/MagnuM.svg"
                  class="ml-2 align-self-center"
                  alt="MagnuM"
                />
              </nuxt-link>
            </v-col>
            <v-spacer />
            <v-col cols="4" class="text-right py-0 pr-8">
              <v-badge
                color="red accent-3"
                :value="cart.length"
                :content="cart.length"
                class="align-self-center"
                offset-x="14"
                offset-y="14"
              >
                <v-icon
                  color="green accent-4"
                  x-large
                  @click.stop="cartDialog = true"
                >
                  mdi-cart-variant
                </v-icon>
              </v-badge>
              <v-dialog v-model="cartDialog" max-width="700">
                <Cart :close-modal="closeModal" />
              </v-dialog>
              <!-- <nuxt-link to="/checkout" class="menu-item d-inline-flex px-6">
                <v-badge
                  color="red accent-3"
                  :value="cart.length"
                  :content="cart.length"
                  class="align-self-center"
                  offset-x="14"
                  offset-y="14"
                >
                  <v-icon color="green accent-4" x-large>
                    mdi-cart-variant
                  </v-icon>
                </v-badge>
              </nuxt-link> -->
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-container>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Cart from '~/components/cart'

export default {
  components: {
    Cart,
  },
  data() {
    return {
      cartDialog: false,
    }
  },
  computed: {
    cart() {
      return this.$store.state.cart
    },
  },
  mounted() {
    if (localStorage && localStorage.cart) {
      this.$store.commit('cart/set', JSON.parse(localStorage.getItem('cart')))
    }
  },
  methods: {
    closeModal() {
      this.cartDialog = false
    },
  },
}
</script>

<style scoped lang="scss">
a {
  color: initial;
  text-decoration: none;
  transition: linear 0.1s;
  padding: 8px;
  &:hover {
    background-color: #f2f2f2;
  }
}
.v-icon.basket {
  font-size: 67px;
}
img {
  height: 28px;
}
.menu-item {
  height: 84px;
}
@media screen and (max-width: 600px) {
  .v-icon.basket {
    font-size: 50px;
  }
}
</style>
