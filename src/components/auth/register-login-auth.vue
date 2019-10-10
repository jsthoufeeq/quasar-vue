<template>
  <form @submit.prevent="submitForm">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        {{ tab | titleCase}} to see Todos App
      </q-banner>
    </div>
    <div class="row q-mb-md">
      <q-input ref="email" outlined class="col" v-model="formData.email" label="Email"
       stack-label :rules="[ val => isValidEmailAddress(val) || 'Please enter a valid email address']" lazy-rules />
    </div>
    <div class="row q-mb-md">
      <q-input ref="password" outlined class="col" type="password" v-model="formData.password" label="Password"
      stack-label :rules="[ val => val.length >= 6 || 'Please enter minimum of 6 characters']" lazy-rules />
    </div>
    <div class="row">
      <q-space />
      <q-btn color="primary" :label="tab" type="submit" />
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['tab'],
  data () {
    return {
      formData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions('auth', ['registerUser', 'loginUser']),
    submitForm () {
      this.$refs.email.validate()
      this.$refs.password.validate()
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        if (this.tab === 'register') {
          this.registerUser(this.formData)
        } else {
          this.loginUser(this.formData)
        }
      }
    },
    isValidEmailAddress (email) {
      return /\S+@\S+\.\S+/.test(email)
    }
  },
  filters: {
    titleCase (value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>
