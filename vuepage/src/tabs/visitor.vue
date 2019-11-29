<template>
  <div id="visitor">
    <headnav title="访客预约" lefttext="返回" :leftarrow="true" @clickleft="clickleft"></headnav>
    <div class="form">
      <div class="visitor_info">
        <span class="title">访客信息</span>
        <van-cell-group>
          <van-field v-model="visitor.name.val" required placeholder="访客姓名" label="访客姓名" clearable
            :error-message="visitor.name.error" @blur="check('name')" />
          <van-field v-model="visitor.phoneNum.val" required placeholder="手机号" label="手机号" clearable
            :error-message="visitor.phoneNum.error" @blur="check('phoneNum',pattern.phoneNumber)" />
          <van-field v-model="visitor.company.val" required placeholder="来访公司" label="来访公司" clearable
            :error-message="visitor.company.error" @blur="check('company')" />
          <van-field v-model="visitor.cause.val" required placeholder="来访事由" label="来访事由" clearable
            :error-message="visitor.cause.error" @blur="check('cause')" />
          <van-field v-model="visitor.date.val" required placeholder="来访日期" label="来访日期" @focus="showdate = true"
            readonly clearable />

          <van-action-sheet v-model="showdate">
            <van-datetime-picker v-model="datepicker" type="date" @confirm="confirmdate" :formatter="formatter"
              title="选择日期" @cancel="showdate = false" />
          </van-action-sheet>
        </van-cell-group>
      </div>
      <div class="respondent_info">
        <span class="title">被访人信息</span>
        <van-cell-group>
          <van-field v-model="visitor.rphoneNum.val" required placeholder="注册手机号" label="注册手机号"
            :error-message="visitor.rphoneNum.error" @blur="check('rphoneNum',pattern.phoneNumber)" />
          <van-field v-model="visitor.rname.val" required placeholder="被访人姓名" label="被访人姓名"
            :error-message="visitor.rname.error" @blur="check('rname')" />
          <van-field v-model="visitor.respondentphoneNum.val" required placeholder="手机号" label="手机号"
            :error-message="visitor.respondentphoneNum.error" @blur="check('respondentphoneNum',pattern.phoneNumber)" />
        </van-cell-group>
      </div>
      <div class="upload_img" @click="showupload =  true">

        <span class="upload">
          <van-icon name="plus" size="50" />
        </span>
        <span class="tips" v-if="imgurl == ''">
          请上传照片开通人脸识别门禁授权
        </span>
        <van-image v-if="imgurl != ''" width="55" height="55" :src="imgurl" />
      </div>
      <van-button type="info" @click.native="handleClick()" style="width:100%">提交</van-button>

    </div>
    <van-action-sheet v-model="showupload" :actions="actions" @select="onSelect" cancel-text="取消"
      @cancel="()=>{showupload = false}" />
  </div>
</template>

<script>
import request from '@/axios/request'
import headnav from '@/components/van-nav.vue'
export default {
  components: {
    headnav
  },
  name: 'visitor',
  data () {
    return {
      imgurl: '',
      showupload: false,
      datepicker: new Date(),
      actions: [
        { name: '拍照' },
        { name: '从相册中选择' }
      ],
      pattern: {
        username: /^[a-z0-9_-]{3,18}$/,
        password: /^((?!.*[\u4E00-\u9FA5])(?=.*\d)(?=.*[a-z]).{6,20})$/,
        sms_code: /^\d{6}$/,
        phoneNumber: /^[1][3,4,5,7,8][0-9]{9}$/
      },
      visitor: {
        name: {
          error: '',
          val: '',
          check: ''
        },
        phoneNum: {
          error: '',
          val: '',
          check: '',
          message: '请输入11位的手机号码'
        },
        company: {
          error: '',
          val: '',
          check: ''
        },
        cause: {
          error: '',
          val: '',
          check: ''
        },
        date: {
          val: this.dateFormat(new Date(), 'yyyy-MM-dd')
        },
        rphoneNum: {
          error: '',
          val: '',
          check: '',
          message: '请输入11位的手机号码'
        },
        rname: {
          error: '',
          val: '',
          check: ''
        },
        respondentphoneNum: {
          error: '',
          val: '',
          check: '',
          message: '请输入11位的手机号码'
        }
      },
      showdate: false

    }
  },
  computed: {

  },
  methods: {
    check (key, pattern) {
      if (!pattern) {
        if (this.visitor[key].val === '') {
          this.visitor[key].error = '该项为必填'
          return
        }
        this.visitor[key].error = ''
      } else {
        if (!pattern.test(this.visitor[key].val)) {
          this.visitor[key].error = this.visitor[key].message
          return
        }
        this.visitor[key].error = ''
      }
    },
    onSuccess (imageURL) {
      this.imgurl = 'data:image/jpeg;base64,' + imageURL
    },
    onFail (error) {
      console.log(error)
    },
    onSelect (val) {
      // console.log(val)
      switch (val.name) {
        case '拍照':
          navigator.camera.getPicture(this.onSuccess, this.onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            encodingType: Camera.EncodingType.JPEG,
            allowEdit: true
            // sourceType:sourceType
          })
          this.showupload = false
          break
        case '从相册中选择':
          navigator.camera.getPicture(this.onSuccess, this.onFail,
            {
              quality: 50,
              destinationType: Camera.DestinationType.DATA_URL,
              sourceType: Camera.PictureSourceType.PHOTOLIBRARY, // 相册类型
              // allowEdit: true,
              encodingType: Camera.EncodingType.JPEG,
              // targetWdith: 100,
              // targetHeight: 100,
              popoverOptions: CameraPopoverOptions
            })
          this.showupload = false
          break
      }
    },
    clickleft () {
      this.$router.go(-1)
    },
    confirmdate (val) {
      this.showdate = false
      this.visitor.date.val = this.dateFormat(val, 'yyyy-MM-dd')
    },
    dataURLtoFile (dataurl, filename) { // 将base64转换为文件
      // eslint-disable-next-line one-var
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    },
    handleClick () {
      var isPass = true
      for (let i in this.visitor) {
        if (this.visitor[i].val === '' && i !== 'date') { // date附有默认值
          isPass = false
          if (!this.visitor[i].hasOwnProperty('message')) {
            this.check(i)
          } else {
            this.check(i, this.pattern.phoneNumber)
          }
        }
      }

      if (!isPass) return
      if (this.imgurl === '') {
        this.$notify({
          type: 'danger',
          message: '图片不能为空'
        })
        return
      }

      // console.log(1)
      let visitorjson = {}
      visitorjson.iCompanyPhone = this.visitor.rphoneNum.val
      visitorjson.iName = this.visitor.rname.val
      visitorjson.iPhone = this.visitor.respondentphoneNum.val
      visitorjson.visitDate = this.visitor.date.val
      visitorjson.visitReasons = this.visitor.cause.val
      visitorjson.visitorCompany = this.visitor.company.val
      visitorjson.visitorName = this.visitor.name.val
      visitorjson.visitorPhone = this.visitor.phoneNum.val

      let url = this.dataURLtoFile(this.imgurl, 'file')
      // let json = { file: url, info: JSON.stringify(visitorjson) }
      let form = new FormData()
      form.append('file', url)

      form.append('info', JSON.stringify(visitorjson))
      request.addvisitor(form).then(res => {
        let data = JSON.parse(res)
        let types = 'danger'
        if (data.state) {
          types = 'primary'
          this.$router.push('login')
        }
        this.$notify({
          type: types,
          message: data.data
        })
      }).catch(err => {
        console.log(err)
      })
      // this.$http.post('http://192.9.51.222:9936/MIPS/employee/add-visitor', form).then(res => {
      //   let types = 'danger'
      //   if (res.data.state) {
      //     types = 'primary'
      //     this.$router.push('login')
      //   }
      //   this.$notify({
      //     type: types,
      //     message: res.data.data
      //   })
      // })
    },
    dateFormat (date, fmt) {
      var o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds()// 毫秒
      }
      if (arguments.length == 1) {
        fmt = 'yyyy-MM-dd hh:mm:ss'
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    },
    formatter (type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      }
      return value
    }
  },
  mounted () {

  },
  watch: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#visitor {
  height: 100%;
  display: flex;
  flex-direction: column;
}
#visitor .form {
  padding: 15px;
}
#visitor .respondent_info {
  margin-top: 15px;
}
#visitor .upload_img {
  display: flex;
  flex-direction: row;
  margin: 15px 0;
}
#visitor .upload_img .upload {
  background-color: #eee;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
}
#visitor .upload_img .tips {
  flex: 1;
  margin-left: 15px;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #000;
}
.van-image {
  margin-left: 15px;
}
</style>
