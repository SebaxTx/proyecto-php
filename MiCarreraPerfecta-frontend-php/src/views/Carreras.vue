<template>
  <div class="carreras">
    <h1 class="career-title">Buscador de Carreras</h1>
    <h2>Filtrar</h2>
    <div class="filters">
      <!-- Filtros para los diferentes campos -->
      <label>
        Nombre:
        <input type="text" v-model="filters.name" placeholder="Filtrar por nombre...">
      </label>
      <label>
        Título Intermedio:
        <select v-model="filters.titleIntermediate">
          <option value="">Todos</option>
          <option value="1">Sí</option>
          <option value="0">No</option>
        </select>
      </label>
      <label>
        Duración en meses:
        <input type="number" v-model.number="filters.durationMonths" placeholder="Filtrar por duración...">
      </label>
      <label>
        Tipo de Carrera:
        <select v-model="filters.idTypeCareer">
          <option value="">Todos</option>
          <option value="1">Universitario</option>
          <option value="2">No universitario</option>
        </select>
      </label>
      <label>
        Modalidad:
        <select v-model="filters.modality">
          <option value="">Todos</option>
          <option value="1">Presencial</option>
          <option value="2">Virtual</option>
          <option value="3">Mixto</option>
        </select>
      </label>
      <div class="button-group">
        <button @click="applyFilter" class="btn-filter">Filtrar</button>
        <button @click="clearFilter" class="btn-clear">Limpiar Filtro</button>
      </div>
    </div>
    <h1 class="carreras-title">Carreras</h1>
    <div class="results">
      <div v-for="carrera in filteredCarreras" :key="carrera.id" class="card">
        <h2>{{ carrera.name }}</h2>
        <p><strong>Título Intermedio:</strong> {{ carrera.title_intermediate ? 'Sí' : 'No' }}</p>
        <p><strong>Duración:</strong> {{ carrera.duration_months }} meses</p>
        <p><strong>Tipo de Carrera:</strong> {{ carrera.id_type_career === 1 ? 'Universitario' : 'No universitario' }}</p>
        <p><strong>Modalidad:</strong> 
          <span v-if="carrera.id_modality === 1">Presencial</span>
          <span v-else-if="carrera.id_modality === 2">Virtual</span>
          <span v-else-if="carrera.id_modality === 3">Mixto</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getCarreras } from '../api.js';

export default {
  setup() {
    const carreras = ref([]);
    const filteredCarreras = ref([]);
    const filters = ref({
      name: '',
      titleIntermediate: '',
      durationMonths: '',
      idTypeCareer: '',
      modality: ''
    });

    const applyFilter = () => {
      filteredCarreras.value = carreras.value.filter(carrera => {
        const nameMatch = carrera.name.toLowerCase().includes(filters.value.name.toLowerCase());
        const titleIntermediateMatch = filters.value.titleIntermediate === '' || carrera.title_intermediate.toString() === filters.value.titleIntermediate;
        const durationMonthsMatch = filters.value.durationMonths === '' || carrera.duration_months.toString() === filters.value.durationMonths;
        const idTypeCareerMatch = filters.value.idTypeCareer === '' || carrera.id_type_career.toString() === filters.value.idTypeCareer;
        const modalityMatch = filters.value.modality === '' || carrera.modality.toString() === filters.value.modality;
        return nameMatch && titleIntermediateMatch && durationMonthsMatch && idTypeCareerMatch && modalityMatch;
      });
    };

    const clearFilter = () => {
      filters.value = {
        name: '',
        titleIntermediate: '',
        durationMonths: '',
        idTypeCareer: '',
        modality: ''
      };
      filteredCarreras.value = carreras.value;
    };

    onMounted(async () => {
      try {
        const carrerasResponse = await getCarreras();
        carreras.value = carrerasResponse;
        filteredCarreras.value = carrerasResponse;
      } catch (error) {
        console.error('Error al obtener las carreras:', error);
      }
    });

    return { filters, filteredCarreras, applyFilter, clearFilter };
  }
};
</script>

<style scoped>
.carreras {
  padding: 20px;
  background-color: #1b1343;
  color: white;
}

.career-title {
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 30px;
  color: white;
}

.filters {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.filters label {
  display: block;
  margin-bottom: 10px;
  color: white; /* Color de texto para etiquetas */
}

.filters input,
.filters select {
  padding: 8px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 90%;
}

.filters button {
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button-group {
  display: flex;
  gap: 10px; /* Espacio entre los botones */
}

.btn-filter {
  background-color: #2980b9;
  color: white;
}

.btn-clear {
  background-color: #e74c3c;
  color: white;
}

.carreras-title {
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
}

.results {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.card {
  background-color: #f9f9f9;
  color: black;
  border-radius: 8px;
  padding: 20px;
  width: calc(33% - 20px); /* Ajusta el ancho de la tarjeta */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.card h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.card p {
  margin-bottom: 8px;
  font-size: 16px;
  color: #333; /* Color de texto para detalles */
}
</style>
