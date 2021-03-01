<template>
  <div>
    <div v-if="!cart.length" class="text-center">Порожньо (:</div>
    <v-row>
      <v-col cols="6">
        <v-form ref="form">
          <v-card class="mb-2">
            <v-card-title>Контактні дані</v-card-title>
            <v-card-text>
              <v-text-field v-model="user.name" label="ПІБ"></v-text-field>
              <v-text-field v-model="user.phone" label="Телефон"></v-text-field>
              <v-text-field v-model="user.email" label="E-mail"></v-text-field>
            </v-card-text>
          </v-card>
          <v-card>
            <v-card-title>Доставка</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="delivery.region"
                label="Область"
              ></v-text-field>
              <v-text-field
                v-model="delivery.city"
                label="Місто"
              ></v-text-field>
              <v-text-field
                v-model="delivery.office"
                label="Відділення"
              ></v-text-field>
            </v-card-text>
          </v-card>
        </v-form>
      </v-col>
      <v-col cols="6">
        <v-row
          v-for="(
            {
              product: { _id, img, title, priceUAH, available, preOrder },
              count,
            },
            index
          ) in cart"
          :key="_id"
        >
          <v-col cols="3">
            <v-img :src="'//shop.magnum.com.ua' + img"></v-img>
          </v-col>
          <v-col>
            {{ title }}
            <span v-if="!available && preOrder" class="pre-order"
              >Попереднє замовлення</span
            >
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
        <v-btn text color="error"> Разом: {{ totalPrice }} ₴ </v-btn>
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-btn
        v-if="!!cart.length"
        color="green darken-1"
        dark
        :loading="isLoadingOrder"
        @click="createOrder()"
      >
        Підтвердити замовлення
      </v-btn>
    </v-row>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      isLoadingOrder: false,
      user: {
        name: '',
        phone: '',
        email: '',
      },
      delivery: {
        region: '',
        city: '',
        office: '',
      },
    }
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
      clearCart: 'cart/clear',
    }),
    createOrder() {
      console.log({ ...this.user, ...this.delivery })
      this.isLoadingOrder = true
      setTimeout(() => {
        this.isLoadingOrder = false
        this.clearCart()
        this.$router.push('/')
      }, 2000)
    },
  },
}
</script>

<style scoped>
.centered-input >>> input {
  width: 70px;
  text-align: center !important;
}
.pre-order {
  font-size: 12px;
  color: #fff;
  background: #ff5959;
  padding: 2px 8px;
  border-radius: 5px;
}
</style>
