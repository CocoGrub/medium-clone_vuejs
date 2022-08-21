<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'register'}">
              Need an account?
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
              Sign In
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
  name: 'McvLogin',
  components: {'mcv-validation-errors': McvValidationErrors},
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    submitForm() {
      this.$store
        .dispatch([actionsTypes.login], {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({name: 'home'})
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
