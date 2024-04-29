<template>
  <div class="container">
    <h1>Daftar Kegiatan</h1>
    <input type="text" v-model="newActivity" placeholder="Tambah kegiatan baru">
    <input type="date" v-model="newDate"> 
    <input type="time" v-model="newTime">
    <button @click="addActivity">Masukkan</button> <br>
    <div class="filter-buttons">
    <button @click="toggleFilter">{{ filterButtonLabel }}</button>
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
            <span :class="{ 'completed': activity.completed }" v-if="!activity.completed">{{ activity.name }}</span>
            <span :class="{ 'completed': activity.completed }" v-else style="text-decoration: line-through;">{{ activity.name }}</span>
          </td>
          <td>{{ activity.date }}</td>
          <td>{{ activity.time }}</td>
          <td>
            <input type="checkbox" v-model="activity.completed">
            <span>{{ activity.completed ? 'Selesai' : 'Belum Selesai' }}</span>
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
      newDate: '',
      newTime: '',
      filter: 'all'
    };
  },
  computed: {
    filterButtonLabel() {
      if (this.filter === 'incomplete') {
        return 'Tampilkan Belum Selesai';
      } else if (this.filter === 'completed') {
        return 'Tampilkan Selesai';
      } else {
        return 'Tampilkan Semua';
      }
    },
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
    toggleFilter() {
      if (this.filter === 'incomplete') {
        this.filter = 'completed';
      } else if (this.filter === 'completed') {
        this.filter = 'all';
      } else {
        this.filter = 'incomplete';
      }
    }
  }
};
</script>
