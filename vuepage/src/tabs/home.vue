<template>
  <div id="home">
    <div v-if="!scan">
      <headnav :title="title" name="add-o" @clickright="clickright" @tipsclick="tipsclick"></headnav>
      <router-view />
      <van-tabbar v-model="active" @change="changeAct">
        <van-tabbar-item icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="search">订单</van-tabbar-item>
        <van-tabbar-item icon="friends-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
    <div v-else>
      <scan @back="hidescan"></scan>
    </div>
  </div>
</template>

<script>
import headnav from '@/components/van-nav.vue'
import scan from '@/components/scan.vue'
export default {
  name: 'home',
  components: {
    headnav,
    scan
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      let tips = to.path.split('home/')[1]
      switch (tips) {
        case 'index':
          vm.active = 0
          break
        case 'order':
          vm.active = 1
          break
        case 'mine':
          vm.active = 2
          break
      }
    })
  },
  data () {
    return {
      active: 0,
      show: false,
      pictureSource: '',
      destinationType: '',
      scan: false
    }
  },
  computed: {
    title () {
      return this.$route.name
    }
  },
  methods: {

    hidescan () { // 销毁正在扫描的条形码
      this.scan = false
      QRScanner.hide()
      QRScanner.cancelScan()
      QRScanner.destroy((status) => {
        document.querySelector('html').style.backgroundColor = '#fff'
        document.querySelector('body').style.backgroundColor = '#fff'
      })
    },
    getContainer () {
      return document.querySelector('#icon-add')
    },
    clickright () {

    },
    onSuccess (imageURL) {
      // 开始上传，这里用到了cordova-plugin-file-transfer 插件，
      // let options = new FileUploadOptions();
      // options.fileKey = "file";//
      // options.fileName = imageURL.substr(imageURL.lastIndexOf('/') + 1);
      // let ft = new FileTransfer();
      // var SERVER = "http://XXXX";//上传接口
      // ft.upload(imageURL, encodeURI(SERVER), this.success, this.fail, options);
      // alert(imageURL)
    },
    onFail (error) {
      console.log(error)
    },

    tipsclick (msg) {
      switch (msg) {
        case '扫一扫':
          //  cordova.plugins.barcodeScanner.scan(
          //       function (result) {
          //                  alert("We got a barcode\n" +
          //                 "Result: " + result.text + "\n" +
          //                 "Format: " + result.format + "\n" +
          //                 "Cancelled: " + result.cancelled);
          //       },
          //       function (error) {
          //           alert("Scanning failed: " + error);
          //       },
          //       {
          //             showTorchButton : true, // iOS and Android
          //             prompt : "请将条码放在显示区域", // Android
          //             disableSuccessBeep: true, // iOS and Android
          //             backButton:true
          //      }
          //   );
          this.scan = true
          QRScanner.prepare((err, status) => {
            //  QRScanner.destroy();
            if (err) {
              // here we can handle errors and clean up any loose ends.
              console.error(err)
            }
            if (status.authorized) {
              // console.log(QRScanner);
              QRScanner.getStatus((status) => {
                console.log(status)
              })
              QRScanner.show((status) => {
                console.log(status)
              })
              QRScanner.scan((err, text) => {
                if (err) {
                  console.log(err)
                } else {
                  console.log(text) // 这里写业务逻辑
                  this.hidescan()

                  //  QRScanner.openSettings();
                  //  alert(text);
                }
              })

              // W00t, you have camera access and the scanner is initialized.
              // QRscanner.show() should feel very fast.
            } else if (status.denied) {
              // The video preview will remain black, and scanning is disabled. We can
              // try to ask the user to change their mind, but we'll have to send them
              // to their device settings with `QRScanner.openSettings()`.
            } else {
              // we didn't get permission, but we didn't get permanently denied. (On
              // Android, a denial isn't permanent unless the user checks the "Don't
              // ask again" box.) We can ask again at the next relevant opportunity.
            }
          })
          break
        case '拍一拍':
          navigator.camera.getPicture(this.onSuccess, this.onFail, {
            quality: 50,
            destinationType: 1,
            encodingType: Camera.EncodingType.JPEG,
            allowEdit: true
            // sourceType:sourceType
          })
          break
        case '选择照片':
          navigator.camera.getPicture(this.onSuccess,
            this.onFail,
            {
              quality: 75,
              destinationType: Camera.DestinationType.DATA_URL,
              sourceType: Camera.PictureSourceType.PHOTOLIBRARY, // 相册类型
              allowEdit: true,
              encodingType: Camera.EncodingType.JPEG,
              // targetWdith: 100,
              // targetHeight: 100,
              popoverOptions: CameraPopoverOptions
            })

          break
      }
    },
    changeAct (index) {
      switch (index) {
        case 0:
          this.$router.push('/home/index')
          break
        case 1:
          this.$router.push('/home/order')
          break
        case 2:
          this.$router.push('/home/mine')
          break
      }
    },
    onDeviceReady () {
      this.pictureSource = navigator.camera.PictureSourceType
      this.destinationType = navigator.camera.DestinationType
    }
  },
  // watch: {
  //       scan(newval){
  //          console.log();
  //           if(!newval){
  //             document.html.style.backgroundColor = "none";
  //           }
  //       }
  // },
  mounted () {
    // console.log(navigator);
    let that = this
    document.addEventListener('deviceready', that.onDeviceReady, false)
    // alert(document.cookie);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
