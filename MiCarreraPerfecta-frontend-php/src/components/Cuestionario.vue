<template>
  <div class="cuestionario">
    <h1 class="cuestionario-title">Mi Carrera Perfecta</h1>
    <h2 class="cuestionario-subtitle">Cuestionario</h2>
    <p v-if="error" class="error-message">{{ error }}</p>
    <div v-for="(pregunta, index) in preguntas.slice(0, questionsToShow)" :key="index" class="question-container">
      <h3 class="question-title">{{ pregunta.questions }}</h3>
      <p class="question-description">{{ pregunta.description }}</p>
      <div class="response-buttons">
        <button
          :class="getButtonClass(respuestas[index], true)"
          @click="handleResponse(index, true)"
        >
          Sí
        </button>
        <button
          :class="getButtonClass(respuestas[index], false)"
          @click="handleResponse(index, false)"
        >
          No
        </button>
      </div>
    </div>
    <button v-if="preguntas.length > questionsToShow" @click="handleShowMore" class="btn-ver-mas">
      Ver más preguntas
    </button>
    <button v-if="questionsToShow >= preguntas.length" @click="handleFinishSurvey" class="btn-terminar-encuesta">
      Terminar encuesta
    </button>
    <h3 class="total-questions">Total de preguntas: {{ preguntas.length }}</h3>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getIntelligenceQuestions, sendIntelligenceAnswers } from '../api.js';
import { formatAnswers } from '../helpers/formatters.js';

export default {
  setup() {
    const preguntas = ref([]);
    const error = ref(null);
    const respuestas = ref({});
    const questionsToShow = ref(7);
    const router = useRouter();

    onMounted(async () => {
      try {
        preguntas.value = await getIntelligenceQuestions();
      } catch (e) {
        error.value = e.message;
      }
    });

    const handleResponse = (index, response) => {
      respuestas.value = { ...respuestas.value, [index]: response };
    };

    const handleShowMore = () => {
      questionsToShow.value += 7;
    };

    const handleFinishSurvey = async () => {
      const formattedAnswers = formatAnswers(respuestas.value);
      try {
        const result = await sendIntelligenceAnswers(formattedAnswers);
        if (result.isSuccess && result.objectResponse) {
          localStorage.setItem('branchs', JSON.stringify(result.objectResponse));
          router.push({ path: '/results' });
        } else {
          console.error("Error en la respuesta de la API:", result.message);
        }
      } catch (e) {
        console.error(e);
      }
    };

    const getButtonClass = (currentValue, buttonValue) => {
      return [
        'btn',
        'mr-2',
        'px-4',
        'py-2',
        'border',
        'rounded',
        currentValue === buttonValue
        ? (buttonValue ? 'bg-green-600 text-white border-green-600' : 'bg-red-600 text-white border-red-600')
          : 'bg-white text-blue-600 border-blue-600 hover:text-[#F1FEEE]',
        ];
    };

    return {
      preguntas,
      error,
      respuestas,
      questionsToShow,
      handleResponse,
      handleShowMore,
      handleFinishSurvey,
      getButtonClass,
    };
  },
};
</script>

<style scoped>
.cuestionario {
  padding: 20px;
  background-color: #1b1343;
  color: white;
}

.cuestionario-title {
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 30px;
}

.cuestionario-subtitle {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.error-message {
  color: red;
  margin-bottom: 10px;
}

.question-container {
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
}

.question-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  color: black;
  text-align: center;
}

.question-description {
  font-size: 16px;
  margin-bottom: 10px;
}

.response-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.btn-ver-mas,
.btn-terminar-encuesta {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-ver-mas {
  background-color: #2980b9;
  color: white;
}

.btn-terminar-encuesta {
  background-color: #27ae60;
  color: white;
}

.total-questions {
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
}
.bg-green-600 {
      background-color: #38a169;
      border-color: #38a169;
    }
    .bg-red-600 {
      background-color: #e53e3e;
      border-color: #e53e3e;
    }
</style>
