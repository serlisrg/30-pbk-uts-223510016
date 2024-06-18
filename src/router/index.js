import { createRouter, createWebHistory } from 'vue-router';
import Post from '../components/Post.vue';
import Todos from '../components/Todos.vue';
import Albums from '../components/Albums.vue';

const routes = [
  { path: '/', redirect: '/post' },
  { path: '/post', name: 'post', component: Post },
  { path: '/todos', name: 'todos', component: Todos },
  { path: '/albums', name: 'albums', component: Albums },
  { path: '/albums/:id', name: 'albumDetails', component: Albums }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
