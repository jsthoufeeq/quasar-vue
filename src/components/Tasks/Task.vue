<template>
    <q-item v-touch-hold:1000.mouse="showEditTaskModal" :class="task.completed ? 'bg-green-1' : 'bg-orange-1'" clickable @click="updateTask({ id: id, updates: { completed : !task.completed }})" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="task.completed" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ task.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="row">
            <div v-if="task.dueDate" class="column justify-center">
              <q-icon size="24px" class="q-mr-xs" name="event" />
            </div>
            <div class="column">
              <q-item-label class="column justify-end" caption>{{task.dueDate | format}}</q-item-label>
              <q-item-label class="column justify-end" caption><small>{{taskDueTime}}</small></q-item-label>
            </div>
          </div>
        </q-item-section>

        <q-item-section side>
          <div class="row">
            <q-btn dense color="primary" icon="edit" @click.stop="showEditTaskModal"/>
            <q-btn dense color="red" icon="delete" @click.stop="promptToDelete(id)"/>
          </div>
        </q-item-section>

        <q-dialog v-model="showEditTask">
          <edit-task :task="task" :id="id" @close="showEditTask = false"/>
        </q-dialog>

      </q-item>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { date } from 'quasar'

export default {
  props: ['task', 'id'],
  data () {
    return {
      showEditTask: false
    }
  },
  computed: {
    ...mapGetters('settings', ['settings']),
    taskDueTime () {
      if (this.settings.show12HourTimeFormat) {
        return date.formatDate(`${this.task.dueDate} ${this.task.dueTime}`, 'h:mmA')
      }
      return this.task.dueTime
    }
  },
  methods: {
    ...mapActions('tasks', ['updateTask', 'deleteTask']),
    showEditTaskModal () {
      this.showEditTask = true
    },
    promptToDelete (id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Confirm delete',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.deleteTask(id)
      })
    }
  },
  filters: {
    format (val) {
      return date.formatDate(val, 'MMM D')
    }
  },
  components: {
    'edit-task': require('./Modals/edit-task.vue').default
  }
}
</script>
