<template>
  <div class="card" style="width: 18rem">
    <div class="card-body">
      <h4 class="card-title">{{ title }}</h4>
      <h6 class="card-subtitle">{{ subtitle }}</h6>
      <img :src="img" alt="" class="card-image" />
      <p class="card-description">{{ description }}</p>
      <div @click="readMore()">Read More</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  methods: {
    readMore() {
      this.$router.push(`/details/${this.id}`)
    },
  },
}
</script>

<style scoped>
.card {
  border: 2px solid lightgray;
}
.card:hover {
  border: 2px solid orange;
}
.card-image {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 160px;
}
</style>