<template lang="pug">
  section.mb-4
    .row.justify-content-center
      .form-width.mx-0
        form#form.p-5.bg-primary.text-secondary
          .form-row.mb-5
            .col-6
              h1 捐罐頭
              span ＊為必填欄位
            .col-6.d-flex.align-items-center
              .processSteps.w-100
                .processSteps--circle.active
                .processSteps--circle
                .processSteps--circle
          .form-group
            label.h4(for='creditNum') 信用卡卡號＊
            input#creditNum.form-control.form-control-lg(type='text', placeholder='7777-6666-7777-6666', v-model="creditNum", :class="{ 'isInvalid': creditNumError }", required)
            .text-danger {{ creditNumErrMsg }}
          label.h4(for='cardname') 持卡人姓名＊
          .form-row
            .col-6
              .form-group
                input#cardFirstName.form-control.form-control-lg(type='text', placeholder='王', required)
            .col-6
              .form-group
                input#cardLastName.form-control.form-control-lg(type='text', placeholder='小明', required)
          label.h4(for='validity-period-month') 有效期限＊
          .form-row
            .col-6
              .form-group
                select#validity-period-month.form-control.form-control-lg(name='', required)
                  option(value='', selected, disabled) 月
                  option(value='1') 1
                  option(value='2') 2
                  option(value='3') 3
                  option(value='4') 4
                  option(value='5') 5
                  option(value='6') 6
                  option(value='7') 7
                  option(value='8') 8
                  option(value='9') 9
                  option(value='10') 10
                  option(value='11') 11
                  option(value='12') 12
            .col-6
              .form-group
                select#validity-period-year.form-control.form-control-lg(name='', required)
                  option(value='', selected, disabled) 年
                  option(value='2008') 2008
                  option(value='2009') 2009
                  option(value='2010') 2010
                  option(value='2011') 2011
                  option(value='2012') 2012
                  option(value='2013') 2013
                  option(value='2014') 2014
                  option(value='2015') 2015
                  option(value='2016') 2016
                  option(value='2017') 2017
                  option(value='2018') 2018
                  option(value='2019') 2019
          label.h4(for='cvv') 背面末三碼＊
          .form-row
            .col-6
              .form-group
                input#cvv.form-control.form-control-lg(type='text', placeholder='123', v-model="cvv", :class="{ 'isInvalid': cvvError }", required)
              .text-danger {{ cvvErrMsg }}
        .mx-0
          button.btn.btn-accent.btn-block.btn-lg.py-3.text-secondary(@click='submitForm') 下一步
            i.fas.fa-chevron-right

</template>

<script>
import $ from 'jquery'

export default {
  data () {
    return {
      creditNum: '',
      creditNumError: false,
      creditNumErrMsg: '',
      cvv: '',
      cvvError: false,
      cvvErrMsg: ''
    }
  },
  methods: {
    checkForm () {
      const creditNum = $('#creditNum').val().length
      const cardFirstName = $('#cardFirstName').val().length
      const cardLastName = $('#cardLastName').val().length
      const validityPeriodMonth = $('#validity-period-month').val()
      const validityPeriodYear = $('#validity-period-year').val()
      const cvv = $('#cvv').val().length
      if (creditNum > 15 && creditNum < 17 && cardFirstName >= 1 && cardLastName >= 1 && cvv > 2 && cvv < 4 && validityPeriodMonth !== null && validityPeriodYear !== null) {
        const isNumber = /^[0-9]+$/
        if (!isNumber.test(this.creditNum) || !isNumber.test(this.cvv)) {
          alert('請輸入數字')
        } else {
          this.$router.push('/checkout_2')
        }
      } else {
        alert('填寫欄位長度有誤，請再次檢查。')
      }
    },
    submitForm () {
      $('#form').submit(this.checkForm())
    }
  },
  watch: {
    creditNum () {
      const isCreditNum = /^[0-9]+$/
      if (!isCreditNum.test(this.creditNum)) {
        this.creditNumError = true
        this.creditNumErrMsg = '請輸入數字'
      } else if (this.creditNum.length < 16) {
        this.creditNumError = true
        this.creditNumErrMsg = '請填完 16 個數字'
      } else if (this.creditNum.length > 16) {
        this.creditNumError = true
        this.creditNumErrMsg = '超過 16 個數字'
      } else {
        this.creditNumError = false
        this.creditNumErrMsg = ''
      }
    },
    cvv () {
      const isCvv = /^[0-9]+$/
      if (!isCvv.test(this.cvv)) {
        this.cvvError = true
        this.cvvErrMsg = '請輸入數字'
      } else if (this.cvv.length < 3) {
        this.cvvError = true
        this.cvvErrMsg = '請填完 3 個數字'
      } else if (this.cvv.length > 3) {
        this.cvvError = true
        this.cvvErrMsg = '超過 3 個數字'
      } else {
        this.cvvError = false
        this.cvvErrMsg = ''
      }
    }
  }
}
</script>
