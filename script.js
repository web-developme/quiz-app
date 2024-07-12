const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionNumberElement = document.getElementById('current-question-number')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const feedbackElement = document.getElementById('feedback')
const scoreContainerElement = document.getElementById('score-container')
const scoreElement = document.getElementById('score')

let shuffledQuestions, currentQuestionIndex
let score = 0

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  score = 0
  scoreContainerElement.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex], currentQuestionIndex + 1)
}

function showQuestion(question, questionNumber) {
  questionNumberElement.innerText = questionNumber
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  feedbackElement.innerText = ''
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct === "true"
  if (correct) {
    feedbackElement.innerText = 'You got the Question Correct!'
    score++
  } else {
    feedbackElement.innerText = 'OOPS! Answer given by you is Incorrect!'
  }
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    showScore()
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

function showScore() {
  questionContainerElement.classList.add('hide')
  scoreContainerElement.classList.remove('hide')
  scoreElement.innerText = `Your total score is: ${score}`
}

const questions = [
  {
    question: 'What is the time complexity of an algorithm that executes a constant number of operations, regardless of the input size?',
    answers: [
      { text: 'O(n)', correct: false },
      { text: 'O(log n)', correct: false },
      { text: 'O(1)', correct: true },
      { text: 'O(n^2)', correct: false }
    ]
  },
  {
    question: 'Which data structure uses the Last In, First Out (LIFO) principle?',
    answers: [
      { text: 'Queue', correct: false },
      { text: 'Stack', correct: true },
      { text: 'Linked List', correct: false },
      { text: 'Tree', correct: false }
    ]
  },
  {
    question: 'What is the purpose of a hash function in hash tables?',
    answers: [
      { text: 'To rearrange elements in sorted order', correct: false },
      { text: 'To calculate the average of elements', correct: false },
      { text: 'To map data to a fixed-size array index', correct: true },
      { text: 'To reverse the order of elements', correct: false }
    ]
  },
  {
    question: 'In a binary search, what is the maximum number of comparisons required to find the target element in a sorted array of size n?',
    answers: [
      { text: 'n', correct: false },
      { text: 'log n', correct: true },
      { text: 'n/2', correct: false },
      { text: 'n^2', correct: false }
    ]
  },
  {
    question: 'Which sorting algorithm has an average-case time complexity of O(n log n)?',
    answers: [
      { text: 'Bubble Sort', correct: false },
      { text: 'Insertion Sort', correct: false },
      { text: 'Quick Sort', correct: true },
      { text: 'Selection Sort', correct: false }
    ]
  },
  {
    question: 'What is the purpose of dynamic programming in algorithm design?',
    answers: [
      { text: 'To optimize recursive algorithms', correct: false },
      { text: 'To divide a problem into smaller subproblems', correct: false },
      { text: 'To solve problems by breaking them into overlapping subproblems', correct: true },
      { text: 'To analyze the efficiency of algorithms', correct: false }
    ]
  },
  {
    question: 'Which data structure is used to implement breadth-first search (BFS) in a graph?',
    answers: [
      { text: 'Stack', correct: false },
      { text: 'Queue', correct: true },
      { text: 'Linked List', correct: false },
      { text: 'Hash Table', correct: false }
    ]
  },
  {
    question: 'What is the primary advantage of using a heap data structure?',
    answers: [
      { text: 'Constant-time access to any element', correct: false },
      { text: 'Efficient insertion and deletion of elements', correct: true },
      { text: 'Optimal for searching elements', correct: false },
      { text: 'Automatic sorting of elements', correct: false }
    ]
  },
  {
    question: 'In the context of trees, what is the height of a leaf node?',
    answers: [
      { text: '0', correct: true },
      { text: '1', correct: false },
      { text: 'The maximum depth of the tree', correct: false },
      { text: 'The number of edges on the longest path to the root', correct: false }
    ]
  },
  {
    question: 'What is the purpose of Dijkstra\'s algorithm?',
    answers: [
      { text: 'To find the shortest path in a weighted graph', correct: true },
      { text: 'To sort elements in ascending order', correct: false },
      { text: 'To traverse a tree in post-order', correct: false },
      { text: 'To perform matrix multiplication', correct: false }
    ]
  }
]
