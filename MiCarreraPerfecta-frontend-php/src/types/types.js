
const branchModel = {
    id: 0,
    name: ''
  };
  
  const careerModel = {
    id: 0,
    name: '',
    branchId: 0
  };
  
  const preferenceAnswerArray = {
    answers: [false, false, false, false, false, false, false, false]
  };
  
  const intelligenceAnswerArray = {
    espacial: [false, false, false, false, false, false, false],
    corporal: [false, false, false, false, false, false, false],
    naturalista: [false, false, false, false, false, false, false],
    musical: [false, false, false, false, false, false, false],
    linguistica: [false, false, false, false, false, false, false],
    intrapersonal: [false, false, false, false, false, false, false],
    matematica: [false, false, false, false, false, false, false],
    interpersonal: [false, false, false, false, false, false, false]
  };
  
  export { branchModel, careerModel, preferenceAnswerArray, intelligenceAnswerArray };
  