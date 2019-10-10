export default {
  methods: {
    submitForm () {
      this.$refs.taskInput.$refs.name.validate()
      if (!this.$refs.taskInput.$refs.name.hasError) {
        this.submitTask()
      }
    },
    clearDueDate () {
      this.taskToBeAdded.dueTime = ''
      this.taskToBeAdded.dueDate = ''
    }
  },
  components: {
    'task-header': require('src/components/Tasks/shared/modalHeader.vue').default,
    'task-input': require('src/components/Tasks/shared/modalTextInput.vue').default,
    'task-due-date': require('src/components/Tasks/shared/modalDueDate.vue').default,
    'task-due-time': require('src/components/Tasks/shared/modalDueTime.vue').default,
    'modal-buttons': require('src/components/Tasks/shared/modalButtons.vue').default
  }
}
