<template>
  <div>
    <div class="video">
      <video id="my-video" autoplay controls></video>
      <video id="my-video2" autoplay controls></video>
    </div>
    <div>
      <Input v-model="infoHash"></Input>
      <Button @click="addClient">add</Button>
      <Button @click="seedClient">seed</Button>
      <Button @click="mediasource">mediaSorce</Button>
      <Button @click="videoStream">videoStream</Button>
      <Button @click="MSE">MSE</Button>
    </div>
    <form action="" id="file-id">
      <input type="file" ref="file" name="file" id="file">
    </form>
  </div>
</template>
<script>
// var VideoStream = require('videostream')
var MediaElementWrapper = require('mediasource')
var WebTorrent = require('WebTorrent/WebTorrent.min')
var client = new WebTorrent()
export default {
  name: 'Client',
  data () {
    return {
      infoHash: '',
      blobURL: '',
      file: '',
      testBuffer: [],
      stream: ''
    }
  },
  methods: {
    addClient () {
      // var torrentId = this.infoHash
      // var torrentId = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent'
      // var torrentId = 'c53da4fa28aa2edc1faa91861cce38527414d874'
      // var torrentId = '5f7e8d2d8b322b00e0eeffe78d5d53a92c475a88'
      // frag_bunny on instant.io
      // var torrentId = 'magnet:?xt=urn:btih:365fd63d58813dc620645e0afd928220f0bd69cd&dn=frag_bunny.mp4&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com'
      var torrentId = '365fd63d58813dc620645e0afd928220f0bd69cd'
      client.add(torrentId, {
        announce: [
          'http://localhost:8000/announce',
          'udp://0.0.0.0:8000',
          'udp://localhost:8000',
          'http://localhost:8000/stats',
          'ws://localhost:8000'
        ]
      }, (torrent) => {
        // Torrents can contain many files. Let's use the .mp4 file
        // console.log(torrent.files)
        var file = torrent.files.find(function (file) {
          return file.name.endsWith('.mp4')
        })
        // console.log(file)
        file.renderTo('#my-video', function (err, ele) {
          if (err) console.log(err)
          console.log(ele)
        })
        // file.getBlob(function callback (err, blob) {
        //   if (err) console.log(err)
        //   console.log(blob)
        // })
        // file.getBlobURL(function callback (err, url) {
        //   if (err) console.log(err)
        //   console.log(url)
        // })
        // file.getBuffer(function callback (err, buffer) {
        //   if (err) console.log(err)
        //   console.log(buffer)
        // })
        // var exampleFile = {
        //   length: 1000000,
        //   createReadStream: opts => {
        //     // debugger
        //     var start = opts.start
        //     var end = opts.end
        //     // console.log(start)
        //     // console.log(end)
        //     let stream = file.createReadStream({
        //       start: start,
        //       end: end
        //     })
        //     this.stream = stream
        //     // console.log(stream.read())
        //     stream.on('data', (buf) => {
        //       // console.log(buf)
        //       // console.log(this.testBuffer)
        //       this.testBuffer.push(buf)
        //     })
        //     // stream.on('readable', () => {
        //     //   // debugger
        //     //   let tempData = stream.read()
        //     //   console.log(tempData)
        //     // })
        //     return stream
        //   }
        // }
        // let vs = VideoStream(exampleFile, document.querySelector('#my-video'))
        // console.log(vs)

        let stream = file.createReadStream({
          start: 0,
          end: 1000
        })
        this.stream = stream
        // console.log(stream.read())
        stream.on('data', (buf) => {
          // console.log(buf)
          // console.log(this.testBuffer)
          this.testBuffer.push(buf)
        })
      })
    },
    seedClient () {
      let file = this.$refs['file'].files[0]
      let infoHash = file
      client.seed(infoHash, {
        announce: [
          // 'http://localhost:8000/announce',
          // 'udp://0.0.0.0:8000',
          // 'udp://localhost:8000',
          // 'http://localhost:8000/stats',
          // 'ws://localhost:8000'
          'http://138.68.60.223:8000/announce',
          'udp://138.68.60.223:8000',
          'udp://138.68.60.223:8000',
          'ws://138.68.60.223:8000'
        ]
      }, (torrent) => {
        // console.log(torrent['infoHash'])
        // for (let v in torrent) this.infoHash = torrent[v]
        console.log(torrent)
        this.infoHash = torrent.infoHash
      })
    },
    mediasource () {
      // function createElem (tagName) {
      //   var elem = document.createElement(tagName)
      //   elem.controls = true
      //   elem.autoplay = true // for chrome
      //   elem.play() // for firefox
      //   document.body.appendChild(elem)
      //   return elem
      // }
      // var elem = createElem('video')
      // var readable = this.file.createReadStream({
      //   'start': 1,
      //   'end': 10
      // }) // ... get a readable stream from somewhere
      let readable = this.stream
      let elem = document.querySelector('#my-video2')
      var wrapper = new MediaElementWrapper(elem)
      // The correct mime type, including codecs, must be provided
      var writable = wrapper.createWriteStream('video/webm; codecs="vorbis, vp8"')
      elem.addEventListener('error', function () {
        // listen for errors on the video/audio element directly
        var errorCode = elem.error
        var detailedError = wrapper.detailedError
        console.log(errorCode, detailedError)
        // wrapper.detailedError will often have a more detailed error message
      })
      writable.on('error', function (err) {
        console.log(err)
        // listening to the stream 'error' event is optional
      })
      readable.pipe(writable)
    },
    videoStream () {
      var exampleFile = {
        createReadStream: (opts) => {
          var start = opts.start
          var end = opts.end
          return this.file.createReadStream({
            'start': start,
            'end': end
          })
          // Return a readable stream that provides the bytes
          // between offsets "start" and "end" inclusive
        }
      }
      var VideoStream = require('videostream')
      var elem = document.createElement('video')
      var videostream = VideoStream(exampleFile, elem)
      elem.addEventListener('error', function () {
        // listen for errors on the video/audio element directly
        var errorCode = elem.error
        var detailedError = videostream.detailedError
        console.log(errorCode, detailedError)
        // videostream.detailedError will often have a more detailed error message
      })
      document.body.appendChild(elem)
    },
    MSE () {
      let video = document.querySelector('#my-video2')
      // let _testBuffer = this.testBuffer[0].buffer
      // console.log(_testBuffer)
      // debugger
      var mimeCodec = 'video/mp4; codecs="avc1.64001f, mp4a.40.2"' // 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
      if ('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)) {
        var mediaSource = new MediaSource()
        // console.log(mediaSource.readyState); // closed
        video.src = URL.createObjectURL(mediaSource)
        mediaSource.addEventListener('sourceopen', sourceOpen)
      } else {
        console.error('Unsupported MIME type or codec: ', mimeCodec)
      }
      function sourceOpen (_) {
        console.log(this.readyState) // open
        var mediaSource = this
        var sourceBuffer = mediaSource.addSourceBuffer(mimeCodec)
        fetchAB('http://138.68.60.223/wt/frag_bunny.mp4', function (buf) {
          sourceBuffer.addEventListener('updateend', function (_) {
            // debugger
            console.log(mediaSource.readyState)
            mediaSource.endOfStream()
            video.play()
            console.log(mediaSource.readyState) // ended
          })
          console.log(buf)
          // debugger
          sourceBuffer.appendBuffer(buf)
          console.log(sourceBuffer.buffered)
        })
      }
      function fetchAB (url, cb) {
        console.log(url)
        var xhr = new XMLHttpRequest()
        xhr.open('get', url)
        xhr.responseType = 'arraybuffer'
        xhr.onload = function () {
          debugger
          cb(xhr.response)
        }
        xhr.send()
        // console.log(_testBuffer)
        // cb(_testBuffer)
      }
    }
  }
}
</script>
