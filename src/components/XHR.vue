<template>
  <Button @click="getVideoData">XHR Test</Button>
</template>
<script>
export default {
  name: 'XHR',
  methods: {
    getVideoData () {
      // let xhr = new XMLHttpRequest()
      // // xhr.open('GET', 'http://localhost/wt/Sintel.mp4', false)
      // // https://tx.acgvideo.com/f/a2/20919317-1.flv?txTime=1501513259&platform=pc&txSecret=324658349c1201bf25abbd798b1b42ba&oi=3078818617&rate=1280000&hfb=b99ffc3c5c68f00a33123bb25f882d5b
      // xhr.open('GET', 'https://tx.acgvideo.com/f/a2/20919317-1.flv?txTime=1501513259&platform=pc&txSecret=324658349c1201bf25abbd798b1b42ba&oi=3078818617&rate=1280000&hfb=b99ffc3c5c68f00a33123bb25f882d5b', false)
      // // xhr.setRequestHeader('Referer', 'https://www.bilibili.com/video/av12722140/')
      // xhr.send()
      // console.log(xhr.response)
      fetch('http://localhost:8000/Sintel.mp4', {
        method: 'GET',
        mode: 'cors'
      }).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>
