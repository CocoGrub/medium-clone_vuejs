<template>
  <div>
    <ul class="error-messages">
      <li v-for="errorMessage in errorMessages" :key="errorMessage">
        {{ errorMessage }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'McvValidationErrors',
  props: {
    validationError: {
      type: Object,
      required: false,
    },
  },
  computed: {
    errorMessages() {
      return ["email can't be blank", "password can't be blank"]
    },
  },
}
</script>
