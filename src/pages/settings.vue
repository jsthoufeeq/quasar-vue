<template>
  <q-page>
    <q-item-label header>Settings</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show 12 hour time format</q-item-label>
        </q-item-section>
        <q-item-section side >
          <q-toggle color="blue" v-model="show12HourTimeFormat"/>
        </q-item-section>
      </q-item>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('settings', ['change12HourTimeFormat'])
  },
  computed: {
    ...mapGetters('settings', ['settings']),
    show12HourTimeFormat: {
      get () {
        return this.settings.show12HourTimeFormat
      },
      set (val) {
        this.change12HourTimeFormat(val)
      }
    }
  }
}
</script>

<style>
</style>
