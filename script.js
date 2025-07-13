let questions = [];
let selectedQuestions = [];

function startQuiz() {
  const name = document.getElementById('name').value.trim();
  const roll = document.getElementById('roll').value.trim();
  if (!name || !roll) return alert('Please enter name and roll number');

  fetch('/questions')
    .then(res => res.json())
    .then(data => {
      questions = data;
      selectedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 5);
      showQuestions();
      document.getElementById('formPage').classList.add('hidden');
      document.getElementById('quizPage').classList.remove('hidden');
    });
}

function showQuestions() {
  const container = document.getElementById('quizContainer');
  container.innerHTML = '';
  selectedQuestions.forEach((q, i) => {
    const block = document.createElement('div');
    block.innerHTML = `
      <p><strong>Q${i + 1}:</strong> ${q.question}</p>
      ${q.options.map((opt, j) =>
        `<label><input type="radio" name="q${i}" value="${opt}"> ${opt}</label><br>`
      ).join('')}
    `;
    container.appendChild(block);
  });
}

function submitQuiz() {
  const name = document.getElementById('name').value;
  const roll = document.getElementById('roll').value;
  let score = 0;

  selectedQuestions.forEach((q, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (selected && selected.value === q.answer) score++;
  });

  fetch('/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, roll, score })
  });

  document.getElementById('quizPage').classList.add('hidden');
  document.getElementById('resultPage').classList.remove('hidden');
  document.getElementById('score').textContent = score;
}
