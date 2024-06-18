<template>
    <q-page>
      <q-page-container class="q-pa-md">
        <q-card-section class="bg">
          <u><h1>Daftar Kegiatan</h1></u>
          <q-input v-model="newActivity" label="Tambah kegiatan baru" />
          <q-btn @click="addActivity" color="pink" label="Tambah" class="q-ml-md" flat />
        </q-card-section>
  
        <q-card-section class="bg q-mt-md">
          <h3>Filter Kegiatan</h3>
          <q-btn-toggle
            v-model="filter"
            exclusive
            dense
            :options="toggleOptions"
            color="pink"
            class="q-mb-md"
            flat
          />
        </q-card-section>
  
        <q-card-section class="bg activities-list">
          <div v-for="(activity, index) in filteredActivities" :key="index" class="activity">
            <q-separator spaced />
            <q-item>
              <q-item-section>
                <q-checkbox v-model="activity.completed" class="q-mr-md" />
                <q-item-section>
                  <q-item-label :class="{ 'completed': activity.completed }">
                    <p>{{ activity.name }}</p>
                  </q-item-label>
                  <q-badge :color="activity.completed ? 'green' : 'red'">
                    <p>{{ activity.completed ? 'Selesai' : 'Belum Selesai' }}</p>
                  </q-badge>
                </q-item-section>
              </q-item-section>
              <q-item-section side top>
                <q-btn @click="cancelActivity(index)" color="negative" label="Hapus" dense flat />
              </q-item-section>
            </q-item>
          </div>
        </q-card-section>
      </q-page-container>
    </q-page>
  </template>
  
  <script>
  import { useActivityStore } from '../stores/todos.js'; 
  
  export default {
    data() {
      return {
        newActivity: ''
      };
    },
    computed: {
      activities() {
        return useActivityStore().activities;
      },
      filter: {
        get() {
          return useActivityStore().filter;
        },
        set(value) {
          useActivityStore().filter = value;
        }
      },
      toggleOptions() {
        return useActivityStore().toggleOptions;
      },
      filteredActivities() {
        return useActivityStore().filteredActivities;
      }
    },
    methods: {
      addActivity() {
        useActivityStore().addActivity(this.newActivity);
        this.newActivity = '';
      },
      cancelActivity(index) {
        useActivityStore().cancelActivity(index);
      }
    }
  };
  </script>
  
  <style scoped>
  p {
    font-size: 18px;
  }
  .bg {
    background-color: rgba(255, 0, 0, 0);
    margin: 0; 
    padding: 0; 
  }
  h1 {
    text-align: center;
    font-size: 24px;
    margin: 0; 
  }
  h3 {
    font-size: 18px;
    margin: 0; 
  }
  .completed {
    text-decoration: line-through;
  }
  .activities-list {
    margin-top: 20px;
  }
  </style>
  