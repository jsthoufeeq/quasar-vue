<template>
  <q-layout view="hHh lpR fff">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center">
          Quasar POC
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab v-for="list in lists" :key="list.name" :to="list.path" :icon="list.icon" :label="list.name" />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Navigations</q-item-label>
        <q-item v-for="list in lists" :key="list.name" clickable exact :to="list.path">
          <q-item-section avatar>
            <q-icon :name="list.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{list.name}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: false,
      lists: [
        {
          name: 'Todo',
          icon: 'list',
          path: '/'
        },
        {
          name: 'Settings',
          icon: 'settings',
          path: '/settings'
        }
      ]
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
@media screen and (min-width: 768px) {
  .q-footer {
    display: none;
  }
}
</style>
