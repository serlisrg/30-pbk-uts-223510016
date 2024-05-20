<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li><a href="#" @click="selectedTab = 'post'">Post</a></li>
          <li><a href="#" @click="selectedTab = 'todos'">Todos</a></li>
        </ul>
      </nav>
    </header>

    <div class="container">
      <!-- Konten untuk Todos -->
      <div v-if="selectedTab === 'todos'">
        <h1>Daftar Kegiatan</h1>
        <input type="text" v-model="newActivity" placeholder="Tambah kegiatan baru">
        <input type="date" v-model="newDate"> 
        <input type="time" v-model="newTime">
        <button @click="addActivity">Masukkan</button> <br>
        <div class="filter-buttons">
          <button @click="toggleFilter">{{ filterButtonText }}</button>
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
                <span :class="{ 'completed': activity.completed }">{{ activity.name }}</span>
              </td>
              <td>{{ activity.date }}</td>
              <td>{{ activity.time }}</td>
              <td>
                <input type="checkbox" @click="toggleCompletion(index)" :checked="activity.completed">
                <span>{{ activity.completed ? 'Selesai' : 'Belum Selesai' }}</span>
              </td>
              <td>
                <button @click="cancelActivity(index)" class="cancel-button">Hapus</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Konten untuk Post -->
      <div v-if="selectedTab === 'post'">
        <h1>Postingan Pengguna</h1>
        <!-- Select option untuk memilih pengguna -->
        <select v-model="selectedUser" @change="fetchUserPosts">
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>

        <!-- Tampilkan postingan pengguna yang dipilih -->
        <div v-for="post in userPosts" :key="post.id">
          <h2>{{ post.title }}</h2>
          <p>{{ post.body }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTab: 'post',
      users: [],
      selectedUser: null,
      userPosts: [],
      newActivity: '',
      newDate: '',
      newTime: '',
      activities: [],
      filter: 'all'
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        this.users = data;
      } catch (error) {
        console.error('Gagal mengambil data pengguna:', error);
      }
    },
    async fetchUserPosts() {
      if (!this.selectedUser) return;
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`);
        const data = await response.json();
        this.userPosts = data;
      } catch (error) {
        console.error('Gagal mengambil postingan pengguna:', error);
      }
    },
    async addActivity() {
      const newActivity = this.newActivity.trim();
      const newDate = this.newDate;
      const newTime = this.newTime;
      if (newActivity !== '') {
        const date = newDate ? newDate : 'Tidak ada tanggal';
        const time = newTime ? newTime : 'Tidak ada waktu';
        this.activities.push({ name: newActivity, date, time, completed: false });
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
    },
    toggleCompletion(index) {
      this.activities[index].completed = !this.activities[index].completed;
    },
    cancelActivity(index) {
      this.activities.splice(index, 1);
    }
  },
  computed: {
    filteredActivities() {
      if (this.filter === 'all') {
        return this.activities;
      } else if (this.filter === 'completed') {
        return this.activities.filter(activity => activity.completed);
      } else {
        return this.activities.filter(activity => !activity.completed);
      }
    },
    filterButtonText() {
      if (this.filter === 'incomplete') {
        return 'Tampilkan Belum Selesai';
      } else if (this.filter === 'completed') {
        return 'Tampilkan Selesai';
      } else {
        return 'Tampilkan Semua';
      }
    }
  },
  created() {
    this.fetchUsers();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

header {
  background-color: #2c3e50;
  color: #ffffff;
  padding: 10px 0;
}

body {
  background-image: url(bg01.jpg);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

.container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

nav ul li {
  display: inline;
  margin-right: 20px;
}

nav ul li a {
  color: #ffffff;
  text-decoration: none;
  font-size: 18px;
  transition: color 0.3s ease;
}

nav ul li a:hover {
  color: #ffffff;
  opacity: 0.8;
}

h1 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.activity-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}

.activity-table th,
.activity-table td {
  padding: 12px;
  border-bottom: 1px solid rgb(0, 0, 0);
  text-align: center;
  background-color: rgba(245, 245, 245, 0.24);
}

.activity-table th {
  background-color: rgba(0, 255, 255, 0.123);
  text-align: center;
}

.completed {
  text-decoration: line-through;
  color: #888;
}

input[type="text"],
input[type="date"],
input[type="time"] {
  padding: 8px;
  width: 30%;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 10px;
}

input[type="checkbox"] {
  margin-right: 6px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: #fff;
  cursor: pointer;
}

.cancel-button {
  background-color: #f44336;
}

.cancel-button:hover {
  background-color: #d6392e;
}

button:hover {
  background-color: #45a049;
}

.filter-buttons button {
  background-color: rgba(0, 255, 255, 0.388);
  color: black;
}

.filter-buttons button:hover {
  background-color: rgba(11, 212, 212, 0.388);
}
</style>
