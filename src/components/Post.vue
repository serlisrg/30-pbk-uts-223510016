<template>
  <div class="q-pa-md">
    <q-card class="cont no-shadow">
      <q-card-section class="q-pb-sm center-content">
        <h2 class="text-h4 q-mb-md"><u>Menu Posts Users</u></h2>
        <q-select
          v-model="selectedUser"
          outlined
          dense
          emit-value
          label="Pilih Pengguna"
          :options="userOptions"
          option-label="name"
          option-value="name"
          @change="fetchPosts"
          class="short-select"
        />
      </q-card-section>

      <q-card-section v-if="filteredPosts.length > 0">
        <h3 class="text-h5 q-mb-sm title-section">
          Postingan oleh {{ selectedUserName.name }} ID: {{ selectedUserName.id }}
        </h3>
        <q-list bordered separator class="q-pt-xs">
          <q-item
            v-for="post in paginatedPosts"
            :key="post.id"
            class="q-pa-xs"
            :class="{ 'bg1': post.id % 2 === 0, 'bg2': post.id % 2 !== 0 }"
          >
            <q-card dark bordered class="bg my-card">
              <q-card-section>
                <div class="text-h6">{{ post.title }}</div>
              </q-card-section>

              <q-separator dark inset />

              <q-card-section>
                {{ post.body }}
              </q-card-section>
            </q-card>
          </q-item>
        </q-list>

        <q-pagination
          v-if="totalPages > 1"
          v-model="currentPage"
          :max="totalPages"
          :max-pages="5"
          @input="goToPage"
        />
      </q-card-section>

      <q-card-section v-else class="text-center q-pa-md">
        <p>^^^</p>
        <p>Silahkan pilih user yang akan ditampilkan</p>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      posts: [],
      selectedUser: null,
      currentPage: 1,
      pageSize: 5, 
    };
  },
  computed: {
    selectedUserName() {
      const user = this.users.find((u) => u.name === this.selectedUser);
      return user ? { name: user.name, id: user.id } : { name: "", id: "" };
    },
    filteredPosts() {
      const selectedUser = this.users.find(user => user.name === this.selectedUser);
      return this.posts.filter(post => selectedUser && post.userId === selectedUser.id);
    },
    totalPages() {
      return Math.ceil(this.filteredPosts.length / this.pageSize);
    },
    paginatedPosts() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      return this.filteredPosts.slice(startIndex, startIndex + this.pageSize);
    },
    userOptions() {
      return this.users.map((user) => ({
        name: user.name,
        id: user.id,
      }));
    },
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        this.users = json;
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    },
    async fetchPosts() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        this.posts = json;
        this.currentPage = 1; 
      } catch (error) {
        console.error("Error fetching posts data:", error);
      }
    },
    goToPage(pageNumber) {
      this.currentPage = pageNumber;
    },
  },
  mounted() {
    this.fetchUsers();
    this.fetchPosts();
  },
};
</script>

<style scoped>
.cont {
  background-color: transparent; 
  box-shadow: none; 
}

.center-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.short-select {
  max-width: 200px; 
}

.bg1 {
  background-color: rgba(255, 0, 0, 0);
}

.bg2 {
  background-color: rgba(0, 0, 255, 0);
}

h2 {
  font-size: 24px;
}

.title-section {
  margin-bottom: 10px;
}

.title-label {
  font-weight: bold;
}

.bg {
  background-color: rgba(255, 163, 178, 0.511);
}

.my-card {
  margin-bottom: 16px; 
}
</style>
