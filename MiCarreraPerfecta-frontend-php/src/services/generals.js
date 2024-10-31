// generals.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export function getCarreras() {
  return api.get('/career')
    .then(response => response.data.objectResponse)
    .catch(error => {
      console.error('Error al obtener las carreras:', error);
      throw error;
    });
}

export function getIntelligenceQuestions() {
  return api.get('/questions')
    .then(response => response.data.objectResponse)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function getPreferenceQuestions() {
  return api.get('/preferencegroup')
    .then(response => response.data.objectResponse)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function sendIntelligenceAnswers(respuestas) {
  return api.post('/questionnaire/answer/intelligence', respuestas)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function sendPreferenceAnswers(respuestas) {
  return api.post('/questionnaire/answer/preference', respuestas)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function getBranches() {
  return api.get('/branch')
    .then(response => {
      return response.data.objectResponse.map(element => ({
        id: element[2],
        name: element[0],
      }));
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function getCareersByBranches(id_branch) {
  return api.post('/questionnaire/branch/career', id_branch)
    .then(response => response.data.objectResponse)
    .catch(error => {
      console.error('Error al obtener las carreras:', error);
      throw error;
    });
}
