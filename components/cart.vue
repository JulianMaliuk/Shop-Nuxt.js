<template>
  <v-card>
    <v-card-title>
      Кошик
      <v-spacer></v-spacer>
      <v-btn icon @click="closeModal()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="py-3">
      <div v-if="!cart.length" class="text-center">Порожньо (:</div>
      <v-row
        v-for="(
          { product: { _id, img, title, priceUAH }, count }, index
        ) in cart"
        :key="_id"
      >
        <v-col cols="3">
          <v-img :src="'//shop.magnum.com.ua' + img"></v-img>
        </v-col>
        <v-col>
          <h4>{{ title }}</h4>
          <div class="d-inline-flex align-center pt-3">
            <v-btn
              icon
              class="pa-6"
              @click="setCount({ _id, count: count - 1 })"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <v-text-field
              class="centered-input"
              solo
              hide-details="true"
              :value="count"
              @input="setCount({ _id, count: +$event })"
            ></v-text-field>
            <v-btn
              icon
              class="pa-6"
              @click="setCount({ _id, count: count + 1 })"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn text color="error"> {{ priceUAH * count }} ₴ </v-btn>
            <v-btn icon @click="removeFromCart(index)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn text color="error"> Разом: {{ totalPrice }} ₴ </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" text @click="closeModal()">
        Продовжити покупки
      </v-btn>
      <v-btn
        v-if="!!cart.length"
        color="green darken-1"
        dark
        @click="goToOrder"
      >
        Оформити замовлення
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    closeModal: {
      type: Function,
      default: null,
    },
  },
  computed: {
    cart() {
      return this.$store.state.cart
    },
    totalPrice() {
      return this.cart.reduce(
        (total, { product: { priceUAH }, count }) =>
          (total += priceUAH * count),
        0
      )
    },
  },
  methods: {
    ...mapMutations({
      setCount: 'cart/setCount',
      removeFromCart: 'cart/remove',
    }),
    goToOrder() {
      this.closeModal()
      this.$router.push('/checkout')
    },
  },
}
</script>

<style scoped>
.v-text-field {
  width: 70px;
}

.centered-input >>> input {
  text-align: center !important;
}
</style>
