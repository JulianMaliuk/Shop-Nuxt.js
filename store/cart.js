export const state = () => {
  if (process.browser) {
    return JSON.parse(localStorage.getItem('cart') || '[]')
  }
  return []
}

export const mutations = {
  set(state, data) {
    state.push(...data)
  },
  add(state, product) {
    state.push({
      product,
      count: 1,
    })
    localStorage.setItem('cart', JSON.stringify(state))
  },
  setCount(state, { _id, count }) {
    state.forEach((p) => {
      if (p.product._id === _id) p.count = count
    })
    localStorage.setItem('cart', JSON.stringify(state))
  },
  remove(state, index) {
    state.splice(index, 1)
    localStorage.setItem('cart', JSON.stringify(state))
  },
  clear(state) {
    state.splice(0, state.length)
    localStorage.setItem('cart', JSON.stringify(state))
  },
}
