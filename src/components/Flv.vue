<template>
  <div>
    <video id="videoElement"></video>
    <Button @click="testPlayer">testPlayer</Button>
  </div>
</template>
<script>
import flvjs from 'flv.js'
export default {
  name: 'Flv',
  methods: {
    testPlayer () {
      if (flvjs.isSupported()) {
        var videoElement = document.getElementById('videoElement')
        var flvPlayer = flvjs.createPlayer({
          type: 'flv',
          url: 'http://otof18y9e.bkt.clouddn.com/frag_bunny.mp4'
        })
        flvPlayer.attachMediaElement(videoElement)
        flvPlayer.load()
        flvPlayer.play()
      }
    }
  }
}
</script>
