<template>
  <div class="row q-mb-sm">
    <q-input outlined :value="name"
      label="task name" autofocus
      @input="$emit('update:name', $event)"
      class="col" ref="name" :rules="[val => !!val || 'Field is required']">
      <template v-slot:append>
        <q-icon v-if="name" name="close" @click="$emit('update:name', '')" class="cursor-pointer" />
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  props: ['name']
}
</script>
