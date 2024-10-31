<template>
  <div class="container_result">
    <h1 class="result_title">RESULTADOS</h1>
    <h3 class="result_subtitle">De acuerdo a tus preferencias, tu CARRERA PERFECTA podría estar relacionada a estas ramas. Por favor selecciona una carrera:</h3>
    <div class="branches">
      <Dropdown
        v-for="branch in branches"
        :key="branch.id_branch"
        :branch="branch"
        :career-list="filteredCareers(branch.id_branch)"
        @selectedBranch="handleSelectedBranch"
        @selectedCareer="handleSelectCareer"
      />
    </div>
    <div v-if="selectedCareer.name" class="selectedCareer">
      <h2>Seleccionaste:</h2>
      <div class="career-details">
        <p><strong>Nombre:</strong> {{ selectedCareer.name }}</p>
        <p><strong>Título Intermedio:</strong> {{ selectedCareer.title_intermediate ? 'Sí' : 'No' }}</p>
        <p><strong>Duración:</strong> {{ selectedCareer.duration_months }} meses</p>
        <p><strong>Tipo de Carrera:</strong> {{ selectedCareer.id_type_career === 1 ? 'Universitario' : 'No universitario' }}</p>
        <p><strong>Modalidad:</strong> 
          <span v-if="selectedCareer.id_modality === 1">Presencial</span>
          <span v-else-if="selectedCareer.id_modality === 2">Virtual</span>
          <span v-else-if="selectedCareer.id_modality === 3">Mixto</span>
        </p>
      </div>
    </div>
  </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import Dropdown from '../components/Dropdown.vue';
import { getCareersByBranches } from '../services/generals';

export default {
  components: {
    Dropdown,
  },
  setup() {
    const selectedCareer = ref({});
    const selectedBranch = ref(0);
    const branches = ref([]);
    const careers = ref({});

    onMounted(async () => {
      const savedBranches = localStorage.getItem('branchs');
      if (savedBranches) {
        branches.value = JSON.parse(savedBranches);
        console.log("Datos de ramas recuperados:", branches.value);

        // Fetch careers for all branches
        for (let branch of branches.value) {
          const fetchedCareers = await getCareersByBranches(branch.id_branch);
          careers.value[branch.id_branch] = fetchedCareers;
        }
      } else {
        console.error("No se encontraron datos de ramas en localStorage.");
      }
    });

    const handleSelectedBranch = (branch) => {
      selectedBranch.value = branch;
    };

    const handleSelectCareer = (career) => {
      selectedCareer.value = career;
    };

    const filteredCareers = (branchId) => {
      return careers.value[branchId] || [];
    };

    return {
      selectedCareer,
      branches,
      handleSelectedBranch,
      handleSelectCareer,
      filteredCareers,
    };
  },
};
</script>

<style scoped>
.container_result {
  padding: 20px;
  background-color: #1b1343;
}

.result_title {
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 30px;
  color: white;
}

.result_subtitle {
  text-align: center;
  font-size: 20px;
  margin-bottom: 30px;
  color: white;
}

.branches {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.selectedCareer {
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.selectedCareer h2 {
  margin-bottom: 10px;
  font-size: 24px;
  color: black;
}

.career-details p {
  margin: 5px 0;
  font-size: 18px;
}

.career-details p strong {
  color: black;
}
</style>
