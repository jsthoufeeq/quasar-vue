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
import mixinTasks from 'src/mixins/mixin-tasks'

export default {
  mixins: [mixinTasks],
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
    submitTask () {
      this.addTask(this.taskToBeAdded)
      this.$emit('close')
    }
  }
}
</script>
