<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'login'}">
              Already have an account?
            </router-link>
          </p>
          <mcv-validation-errors
            v-if="validationErrors"
            :validationErrors="validationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Username"
                autocomplete
                v-model="username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                autocomplete
                v-model="email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                autocomplete=""
                v-model="password"
              />
            </fieldset>
            <button
              @click="submitForm"
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="isSubmitted"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvValidationErrors from '@/components/ValidationErrors'
import {actionsTypes} from '@/store/modules/auth'

export default {
  name: 'McvRegister',
  components: {'mcv-validation-errors': McvValidationErrors},
  data() {
    return {
      email: '',
      username: '',
      password: '',
    }
  },
  methods: {
    submitForm() {
      console.log('xxx')
      this.$store
        .dispatch(actionsTypes.register, {
          email: this.email,
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          this.$router.push({name: 'home'})
          console.log(response, 'succes')
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  computed: {
    isSubmitted() {
      return this.$store.state.auth.isSubmitting
    },
    validationErrors() {
      return this.$store.state.auth.validationErrors
    },
  },
}
</script>
