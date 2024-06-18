<template>
  <q-page class="albums-page">
    <div class="center-content">
      <q-card-section>
        <u><h2 class="text-h4 q-mb-md">Albums</h2></u>
        <q-form @submit.prevent="navigateToAlbum" class="form-inline">
          <q-input
            outlined
            dense
            v-model="albumId"
            label="Masukkan ID Album"
            type="number"
            placeholder="ID Album"
            class="q-mb-md short-input"
          />
          <q-btn type="submit" color="primary" class="short-btn">
            <q-icon name="arrow_forward" />
          </q-btn>
        </q-form>
      </q-card-section>
    </div>

    <q-separator />

    <q-card-section v-if="photos.length > 0">
      <h3 class="text-h5 q-mb-sm">Foto dari Album ID {{ albumId }}</h3>
      <div class="photo-list">
        <q-card v-for="photo in photos" :key="photo.id" class="photo-card bg">
          <q-card-section class="q-pt-none">
            <q-img
              :src="photo.thumbnailUrl"
              :alt="photo.title"
              class="photo-thumbnail"
              @click="viewPhotoDetail(photo)"
            />
          </q-card-section>
          <q-card-section class="q-pb-xs">
            <q-item-label>{{ photo.title }}</q-item-label>
            <q-item-label caption class="photo-url">
              <a :href="photo.url" target="_blank">{{ formatUrl(photo.url) }}</a>
            </q-item-label>
          </q-card-section>
        </q-card>
      </div>
    </q-card-section>

    <q-card-section v-else>
      <q-card-section class="text-center q-pa-md">
        <p>^^^</p>
        <p v-if="albumId !== ''">Silahkan Tekan Tombol Cari untuk Album ID {{ albumId }}</p>
        <p v-else>Silakan masukkan ID Album untuk mencari foto.</p>
      </q-card-section>
    </q-card-section>

    <q-dialog v-model="showDialog">
      <q-card class="photo-dialog-card transparent-card">
        <q-card-section class="q-pt-none">
          <q-img :src="selectedPhoto.url" :alt="selectedPhoto.title" class="photo-detail" />
        </q-card-section>
        <q-card-section>
          <q-item-label>{{ selectedPhoto.title }}</q-item-label>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn @click="closeDialog" label="Tutup" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { useRoute } from 'vue-router';

export default {
  data() {
    return {
      albumId: '',
      photos: [],
      showDialog: false,
      selectedPhoto: {}
    };
  },
  methods: {
    async fetchPhotos() {
      try {
        const albumId = this.$route.params.id;
        if (!albumId) {
          throw new Error('Album ID cannot be empty');
        }

        const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const json = await response.json();
        this.photos = json.map(photo => ({
          ...photo,
          title: photo.title,
          thumbnailUrl: photo.thumbnailUrl,
          url: photo.url
        }));
      } catch (error) {
        console.error('Error fetching photos data:', error);
        this.photos = [];
      }
    },
    navigateToAlbum() {
      if (this.albumId) {
        this.$router.push({ name: 'albumDetails', params: { id: this.albumId } });
      }
    },
    viewPhotoDetail(photo) {
      this.selectedPhoto = photo;
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
    },
    formatUrl(url) {
      return url;
    }
  },
  mounted() {
    const route = useRoute();
    const albumId = route.params.id;
    if (albumId) {
      this.albumId = albumId;
      this.fetchPhotos();
    }
  },
  watch: {
    $route(to) {
      if (to.params.id) {
        this.albumId = to.params.id;
        this.fetchPhotos();
      }
    }
  }
};
</script>

<style scoped>
.albums-page {
  padding: 20px;
}

.center-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.form-inline {
  display: flex;
  align-items: center;
}

.short-input {
  max-width: 200px;
  margin-right: 10px;
}

.short-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
}

.photo-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.photo-card {
  max-width: 200px;
  margin: 10px;
  text-align: center;
}

.photo-thumbnail {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
}

.photo-url {
  word-wrap: break-word;
}

.photo-detail {
  max-width: 600px;
  max-height: 600px;
  width: 600px;
  height: 600px;
  object-fit: contain;
}

.photo-dialog-card {
  max-width: 800px;
  width: auto;
  height: auto;
  max-height: 900vh;
}

.bg {
  background-color: rgba(255, 255, 255, 0.0);
}
</style>
