<template>
  <div class="row q-mb-sm">
    <q-input outlined label="due time" class="col" @input="$emit('update:dueTime', $event)" :value="dueTime">
      <template v-slot:append>
        <q-icon v-if="dueTime" name="close" @click="$emit('update:dueTime','')" class="cursor-pointer" />
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-time :value="dueTime" @input="$emit('update:dueTime', $event)" color="orange" text-color="black" dark />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  props: ['dueDate', 'dueTime']
}
</script>
