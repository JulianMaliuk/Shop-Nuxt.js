<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12" sm="9" md="9" class="mb-2 order-1 order-sm-0">
        <div v-if="isLoading" class="text-center">
          <v-progress-linear
            indeterminate
            color="red"
            background-color="yellow lighten-3"
          ></v-progress-linear>
        </div>
        <div v-if="!isLoading && !filteredProducts.length" class="text-center">
          Порожньо
        </div>
        <v-row dense>
          <v-col
            v-for="product of filteredProducts"
            :key="product._id"
            cols="6"
            sm="6"
            md="4"
            class="d-flex flex-column"
          >
            <productCard :product="product" />
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        sm="3"
        md="3"
        class="sidebar pl-0 pl-sm-4 mb-2 order-0 order-sm-1"
      >
        <v-card class="pa-2 flex d-flex flex-column">
          <v-text-field
            v-model="search"
            label="Пошук"
            class="mb-2"
            append-icon="mdi-magnify"
            hide-details
            filled
            dense
            clearable
          ></v-text-field>

          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header> Фільтри </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-checkbox
                  v-for="c in categories"
                  :key="c._id"
                  v-model="typesProduct"
                  :label="c.title"
                  color="red"
                  :value="c.key"
                  hide-details
                  class="mt-1"
                ></v-checkbox>

                <v-divider class="my-3" />

                <v-checkbox
                  v-for="(f, index) in features"
                  :key="index"
                  v-model="selectedFeatures"
                  :label="f"
                  color="green"
                  :value="f"
                  hide-details
                  class="mt-1"
                ></v-checkbox>

                <v-btn
                  text
                  block
                  color="primary"
                  class="mt-2"
                  @click="resetFilters()"
                >
                  скинути
                </v-btn>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import productCard from '~/components/product-card'
export default {
  components: {
    productCard,
  },
  data() {
    return {
      isLoading: true,
      search: '',
      products: [],
      categories: [],
      typesProduct: [],
      features: [],
      selectedFeatures: [],
    }
  },
  async fetch() {
    const response = await this.$axios.$get('/products')
    this.products = response.data.sort(
      (a, b) => b.available - a.available || b.preOrder - a.preOrder
    )
    this.categories = response.categories
    this.isLoading = false

    const features = new Set()
    this.products.forEach((p) => {
      if (p.key_features) p.key_features.forEach(features.add, features)
    })
    this.features = [...features].sort()
  },
  computed: {
    filterByCategories() {
      return (products) => {
        if (!this.typesProduct.length) return products
        return products.filter((product) =>
          this.typesProduct.includes(product.category.key)
        )
      }
    },
    filterByFeatures() {
      return (products) => {
        if (!this.selectedFeatures.length) return products
        return products.filter((p) => {
          return (
            p.key_features &&
            this.selectedFeatures.every((f) => p.key_features.includes(f))
          )
        })
      }
    },
    filteredProducts() {
      if (this.search) {
        return this.products.filter((product) =>
          product.title.toLowerCase().includes(this.search.toLowerCase())
        )
      }
      return this.filterByFeatures(this.filterByCategories(this.products))
    },
  },
  methods: {
    resetFilters() {
      this.selectedFeatures = []
      this.typesProduct = []
    },
  },
}
</script>

<style scoped lang="scss">
::v-deep .v-expansion-panel-content__wrap {
  padding: 0px 12px 12px;
}
</style>
