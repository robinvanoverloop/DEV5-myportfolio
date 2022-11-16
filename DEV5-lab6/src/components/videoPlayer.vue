<script setup>
import { ref, onMounted, reactive } from 'vue';
import 'animate.css';

let videos = reactive({data: []});
let videoSrc = ref("");
let counter = ref(0);
let animation = ref("");

    onMounted(() => {
        const apiUrl = "https://app.fakejson.com/q/2PB25qRa?token=_bJ_6Umm5SQoYkcu8uvdWA";
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                videos.data = data.videos;
                videoSrc.value = (data.videos[0].video);
            });
    });

    const nextVideo = () => {
        animation.value = "animatefadeOut";
        counter.value++;
        setTimeout(() => {
            videoSrc.value = videos.data[counter.value].video;
            animation.value = "animatefadeIn";
        }, 500);
    }

    const prevVideo = () => {
        animation.value = "animatefadeOut";
        counter.value--;
        setTimeout(() => {
            videoSrc.value = videos.data[counter.value].video;
            animation.value = "animatefadeIn";
        }, 500);
    }
</script>

<template>
  <div class="blur">
    <div class="controls">
      <a @click.prevent="prevVideo" href="#">⬆️</a>
        <a @click.prevent="nextVideo" href="#">⬇️</a>
    </div>
    <video
      :src="videoSrc"
    :class="animation"
    class="animate__animated"
      controls
      autoplay
      muted></video>
  </div>

</template>

<style scoped>
    video {
        max-width: 100%;
        max-height: 100vh;
    }

    .blur {
        background-image: url('/bg.jpg');
        background-size: cover;
        text-align: center;
        position: relative;
    }

    .controls {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 50%;
        right: 0;
        padding: 1em;
    }

    .controls a {
        font-size: 1.5rem;
        text-decoration: none;
    }


</style>