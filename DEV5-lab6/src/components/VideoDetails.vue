<script setup>
  import { ref, onMounted } from 'vue'
  let username = ref("");
  let description = ref("");

  // onMounted
  onMounted(() => {
    const apiUrl = "https://app.fakejson.com/q/2PB25qRa?token=_bJ_6Umm5SQoYkcu8uvdWA";
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        username.value = data.videos[0].username;
        description.value = data.videos[0].description;
      });
    });

</script>

<template>
  <div class="details">
   <h3>{{ username }}</h3>
   <p>{{ description }}</p>
  </div>
</template>

<style scoped>
  .details{
    padding: 2rem;
  }

</style>
