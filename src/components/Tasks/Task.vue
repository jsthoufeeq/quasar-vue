<template>
    <q-item :class="task.completed ? 'bg-green-1' : 'bg-orange-1'" clickable @click="updateTask({ id: id, updates: { completed : !task.completed }})" v-ripple>
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
              <q-item-label class="column justify-end" caption>{{task.dueDate}}</q-item-label>
              <q-item-label class="column justify-end" caption><small>{{task.dueTime}}</small></q-item-label>
            </div>
          </div>
        </q-item-section>

        <q-item-section side>
          <div class="row">
            <q-btn dense color="primary" icon="edit" @click.stop="showEditTask = true"/>
            <q-btn dense color="red" icon="delete" @click.stop="promptToDelete(id)"/>
          </div>
        </q-item-section>

        <q-dialog v-model="showEditTask">
          <edit-task :task="task" :id="id" @close="showEditTask = false"/>
        </q-dialog>

      </q-item>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['task', 'id'],
  data () {
    return {
      showEditTask: false
    }
  },
  methods: {
    ...mapActions('tasks', ['updateTask', 'deleteTask']),
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
  components: {
    'edit-task': require('./Modals/edit-task.vue').default
  }
}
</script>
