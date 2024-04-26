<template>
  <div class="container">
    <h1>Daftar Kegiatan</h1>
    <input type="text" v-model="newActivity" placeholder="Tambah kegiatan baru">
    <input type="date" v-model="newDate">
    <input type="time" v-model="newTime">
    <button @click="addActivity">Tambah</button>

    <br>
    <div class="filter-buttons">
      <button @click="setFilter('all')">Semua Kegiatan</button>
      <button @click="setFilter('incomplete')">Kegiatan Belum Selesai</button>
      <button @click="setFilter('completed')">Kegiatan Selesai</button>
    </div>
    <br>
    

    <table class="activity-table">
      <thead>
        <tr>
          <th>Nomor</th>
          <th>Nama Kegiatan</th>
          <th>Tanggal</th>
          <th>Jam</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(activity, index) in filteredActivities" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <template v-if="index !== editingIndex">
              <span :class="{ 'completed': activity.completed }">{{ activity.name }}</span>
            </template>
            <template v-else>
              <input type="text" v-model="editedActivity" @keyup.enter="saveEditedActivity(index)" @keyup.esc="cancelEdit">
            </template>
          </td>
          <td>{{ activity.date }}</td>
          <td>{{ activity.time }}</td>
          <td>
            <input type="checkbox" v-model="activity.completed">
            <span :class="{ 'completed': activity.completed }">{{ activity.completed ? 'Selesai' : 'Belum Selesai' }}</span>
          </td>
          <td>
            
            
            <button @click="cancelActivity(index)" class="cancel-button">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activities: [],
      newActivity: '',
      editingIndex: null,
      editedActivity: '',
      filter: 'all' // Default filter: show all activities
    };
  },
  computed: {
    filteredActivities() {
      if (this.filter === 'incomplete') {
        return this.activities.filter(activity => !activity.completed);
      } else if (this.filter === 'completed') {
        return this.activities.filter(activity => activity.completed);
      } else {
        return this.activities;
      }
    }
  },
  methods: {
    addActivity() {
      if (this.newActivity.trim() !== '') {
        const date = this.newDate ? this.newDate : 'Tidak ada tanggal';
        const time = this.newTime ? this.newTime : 'Tidak ada waktu';
        this.activities.push({ name: this.newActivity, date, time, completed: false });
        this.newActivity = '';
        this.newDate = '';
        this.newTime = '';
      }
    },
    
    cancelActivity(index) {
      this.activities.splice(index, 1);
      if (index === this.editingIndex) {
        this.cancelEdit();
      }
    },
    setFilter(filter) {
      this.filter = filter;
      // Update filterText based on selected filter
      if (filter === 'all') {
        this.filterText = 'Semua Kegiatan';
      } else if (filter === 'incomplete') {
        this.filterText = 'Kegiatan Belum Selesai';
      } else if (filter === 'completed') {
        this.filterText = 'Kegiatan Selesai';
      }
    }
  }
};
</script>


