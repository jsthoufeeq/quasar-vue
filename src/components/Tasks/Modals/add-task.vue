<template>
  <q-card>

    <task-header>Add Task</task-header>

    <form @submit.prevent="submitForm">
      <q-card-section>

        <task-input ref="taskInput" :name.sync="taskToBeAdded.name"></task-input>

        <task-due-date :dueDate.sync="taskToBeAdded.dueDate" @clear="clearDueDate"></task-due-date>

        <task-due-time v-if="taskToBeAdded.dueDate" :dueTime.sync="taskToBeAdded.dueTime"></task-due-time>

      </q-card-section>

      <modal-buttons></modal-buttons>
    </form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      taskToBeAdded: {
        name: '',
        dueDate: '',
        dueTime: '',
        completed: false
      }
    }
  },
  methods: {
    ...mapActions('tasks', ['addTask']),
    submitForm () {
      this.$refs.taskInput.$refs.name.validate()
      if (!this.$refs.taskInput.$refs.name.hasError) {
        this.submitTask()
      }
    },
    submitTask () {
      this.addTask(this.taskToBeAdded)
      this.$emit('close')
    },
    clearDueDate () {
      this.taskToBeAdded.dueTime = ''
      this.taskToBeAdded.dueDate = ''
    }
  },
  components: {
    'task-header': require('./../shared/modalHeader.vue').default,
    'task-input': require('./../shared/modalTextInput.vue').default,
    'task-due-date': require('./../shared/modalDueDate.vue').default,
    'task-due-time': require('./../shared/modalDueTime.vue').default,
    'modal-buttons': require('./../shared/modalButtons.vue').default
  }
}
</script>
