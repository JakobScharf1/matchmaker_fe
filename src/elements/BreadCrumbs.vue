<template>
  <nav v-if="breadcrumbs && breadcrumbs.length">
    <ol class="breadcrumb">
      <li
          v-for="(breadcrumb, index) in breadcrumbs"
          :key="index"
          class="breadcrumb-item"
          :class="{ active: index === breadcrumbs.length - 1 }"
      >
        <a v-if="index !== breadcrumbs.length - 1"
           class="breadcrumb-link" :href="breadcrumb.path">{{ breadcrumb.name }}</a>
        <span v-else>{{ breadcrumb.name }}</span>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: "BreadCrumbs",
  props: {
    breadcrumbs: {
      type: Array,
      required: true
    }
  }
};
</script>
<style>
.breadcrumb {
  list-style: none;
  display: flex;
  background-color: transparent;
  text-align: right;
  width: 100%;
  justify-content: flex-end;
  margin: 0;
  padding-bottom: 0;
  padding-top: 0;
}

.breadcrumb-item {
  color: #007bff;
}

.breadcrumb-link {
  text-decoration: none;
  color: white;
}

.breadcrumb-link:hover {
  color: white;
  text-decoration: underline;
}

.breadcrumb-item.active span {
  color: #6c757d;
}
</style>