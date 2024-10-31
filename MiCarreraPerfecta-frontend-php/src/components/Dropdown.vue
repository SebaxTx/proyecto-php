<template>
  <div class="dropdown">
    <h2>{{ branch.name }}</h2>
    <select @change="handleSelect($event)">
      <option v-for="career in careerList" :key="career.id_career" :value="career.id_career">
        {{ career.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    branch: Object,
    careerList: Array
  },
  methods: {
    handleSelect(event) {
      const selectedCareer = this.careerList.find(career => career.id_career === Number(event.target.value));
      this.$emit('selectedCareer', selectedCareer);
    }
  }
};
</script>

<style scoped>
.dropdown {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.dropdown h2 {
  font-size: 24px;
  font-weight: bold;
  color: black;
  margin-bottom: 15px;
}

.dropdown select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: black;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.dropdown select:focus {
  border-color: #2980b9;
  box-shadow: 0 0 5px rgba(41, 128, 185, 0.5);
  outline: none;
}

.dropdown option {
  padding: 10px;
}
</style>

