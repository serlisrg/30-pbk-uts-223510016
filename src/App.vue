<template>
  <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
    <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>Header</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="200"
      :breakpoint="500"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
        <q-list padding>
          <q-item clickable v-ripple @click="navigateTo('post')">
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>
            <q-item-section>
              Post
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="navigateTo('todos')">
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>
            <q-item-section>
              Todos
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="navigateTo('albums')">
            <q-item-section avatar>
              <q-icon name="send" />
            </q-item-section>
            <q-item-section>
              Albums
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: true,
      miniState: false
    };
  },
  methods: {
    navigateTo(routeName, id = null) {
      if (id) {
        this.$router.push({ name: routeName, params: { id } });
      } else {
        this.$router.push({ name: routeName });
      }
    }
  }
};
</script>


