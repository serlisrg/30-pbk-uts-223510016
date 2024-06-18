// store.js

import { defineStore } from 'pinia';

export const useActivityStore = defineStore({
  id: 'activity',
  state: () => ({
    activities: [],
    filter: 'all',
    toggleOptions: [
      { label: 'Semua', value: 'all' },
      { label: 'Belum Selesai', value: 'incomplete' },
      { label: 'Selesai', value: 'completed' }
    ]
  }),
  getters: {
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
  actions: {
    addActivity(newActivity) {
      if (newActivity.trim() !== '') {
        this.activities.push({ name: newActivity, completed: false });
      }
    },
    cancelActivity(index) {
      this.activities.splice(index, 1);
    }
  }
});
