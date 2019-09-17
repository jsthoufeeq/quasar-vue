<template>
  <q-card>

    <task-header>Edit Task</task-header>

    <form @submit.prevent="submitForm">
      <q-card-section>

        <task-input ref="taskInput" :name.sync="taskToBeEdited.name"></task-input>

        <task-due-date :dueDate.sync="taskToBeEdited.dueDate" @clear="clearDueDate"></task-due-date>

        <task-due-time v-if="taskToBeEdited.dueDate" :dueTime.sync="taskToBeEdited.dueTime"></task-due-time>

      </q-card-section>

      <modal-buttons></modal-buttons>
    </form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['task', 'id'],
  data () {
    return {
      taskToBeEdited: { }
    }
  },
  methods: {
    ...mapActions('tasks', ['updateTask']),
    submitForm () {
      this.$refs.taskInput.$refs.name.validate()
      if (!this.$refs.taskInput.$refs.name.hasError) {
        this.submitTask()
      }
    },
    submitTask () {
      this.updateTask({
        id: this.id,
        updates: this.taskToBeEdited
      })
      this.$emit('close')
    },
    clearDueDate () {
      this.taskToBeEdited.dueTime = ''
      this.taskToBeEdited.dueDate = ''
    }
  },
  components: {
    'task-header': require('./../shared/modalHeader.vue').default,
    'task-input': require('./../shared/modalTextInput.vue').default,
    'task-due-date': require('./../shared/modalDueDate.vue').default,
    'task-due-time': require('./../shared/modalDueTime.vue').default,
    'modal-buttons': require('./../shared/modalButtons.vue').default
  },
  mounted () {
    this.taskToBeEdited = Object.assign({}, this.task)
  }
}
</script>
