// Predefined subjects and topics
let subjects = [
  {
      subjectName: "Ce sabuj sir",
      topics: [
          { name: "Con current co planner force", completed: false },
          { name: "Friction", completed: false },
          { name: "Moment and parallel coplanar force system", completed: false },
          { name: "Non coplanar force system", completed: false },
          { name: "Truss", completed: false },
          { name: "Two dimensional frames and trusses", completed: false },
          { name: "Flexible cord", completed: false },
          { name: "Load and support", completed: false }
      ]
  },
  {
      subjectName: "Ce sayka mam",
      topics: [
          { name: "Moment of inertia", completed: false },
          { name: "Force system", completed: false },
          { name: "Product of inertia", completed: false },
          { name: "Plane motion", completed: false },
          { name: "Impulse and momentum", completed: false },
          { name: "Work power and energy", completed: false }
      ]
  },
  {
      subjectName: "Physics",
      topics: [
          { name: "Oscillation", completed: false },
          { name: "Heat and thermodynamics", completed: false },
          { name: "Solid states", completed: false }
      ]
  },
  {
      subjectName: "MATH",
      topics: [
          { name: "Function (Domain, Range, Graph)", completed: false },
          { name: "L' Hospital Rule", completed: false },
          { name: "Limit (Continuity, Differentiability)", completed: false },
          { name: "Taylor, Maclaurin Series", completed: false },
          { name: "Curvature", completed: false },
          { name: "Maxima, Minima, Concavity, Increasing, Decreasing", completed: false },
          { name: "Tangent, Normal", completed: false },
          { name: "Subtangent, Subnormal", completed: false },
          { name: "Definite Integrals (With Properties)", completed: false },
          { name: "Standard Integrals", completed: false },
          { name: "Walli's Theorem", completed: false },
          { name: "Gamma Beta", completed: false },
          { name: "Multiple Integrals", completed: false },
          { name: "Integrals about areas", completed: false },
          { name: "Reduction Formula", completed: false }
      ]
  },
  {
      subjectName: "Eee",
      topics: [
          { name: "KCL / KVL, Cdr / Vdr", completed: false },
          { name: "Superposition, source transformation", completed: false },
          { name: "Norton, Nodal, Thevenin, Mesh", completed: false },
          { name: "Max power transfer", completed: false },
          { name: "Ac Current", completed: false },
          { name: "Transformer", completed: false },
          { name: "Induction motor", completed: false }
      ]
  },
  {
      subjectName: "Chemistry",
      topics: [
          { name: "Chemical kinetics", completed: false },
          { name: "Environment pollution", completed: false },
          { name: "Surface coating paints", completed: false },
          { name: "Corrosion", completed: false },
          { name: "Polymers", completed: false }
      ]
  }
];

// Current filter
let currentSubjectFilter = 'all';

// Load data from localStorage if available
function loadFromLocalStorage() {
    const savedData = localStorage.getItem('syllabusData');
    if (savedData) {
        subjects = JSON.parse(savedData);
    }
}

// Save data to localStorage
function saveToLocalStorage() {
    localStorage.setItem('syllabusData', JSON.stringify(subjects));
}

// Populate subject filter dropdown
function populateSubjectFilter() {
    const filterSelect = document.getElementById('subject-filter');
    // Clear existing options except the "All Subjects" option
    while (filterSelect.options.length > 1) {
        filterSelect.remove(1);
    }
    
    // Add an option for each subject
    subjects.forEach((subject, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = subject.subjectName;
        filterSelect.appendChild(option);
    });
    
    // Add event listener for filter changes
    filterSelect.addEventListener('change', function() {
        currentSubjectFilter = this.value;
        renderSubjects();
    });
}

// Render subjects and topics
function renderSubjects() {
  const subjectsDiv = document.getElementById('subjects');
  subjectsDiv.innerHTML = ''; // Clear existing subjects

  // Show subject-specific progress if a specific subject is selected
  if (currentSubjectFilter !== 'all') {
    const subjectIndex = parseInt(currentSubjectFilter);
    const subjectProgress = calculateSubjectProgress(subjectIndex);
    
    const progressElement = document.createElement('div');
    progressElement.classList.add('subject-progress');
    progressElement.innerHTML = `
      <h3>${subjects[subjectIndex].subjectName} - Progress: ${subjectProgress.toFixed(2)}%</h3>
      <div class="progress-bar">
        <div class="progress-bar-fill" style="width: ${subjectProgress}%"></div>
      </div>
    `;
    subjectsDiv.appendChild(progressElement);
  }

  subjects.forEach((subject, subjectIndex) => {
      // Skip if filtered and not matching
      if (currentSubjectFilter !== 'all' && currentSubjectFilter !== subjectIndex.toString()) {
          return;
      }
      
      let subjectDiv = document.createElement('div');
      subjectDiv.classList.add('subject');
      subjectDiv.innerHTML = `
          <h3>${subject.subjectName}</h3>
          <ul>
              ${subject.topics.map((topic, topicIndex) => `
                  <li class="topic">
                      <input type="checkbox" id="topic-${subjectIndex}-${topicIndex}" 
                          ${topic.completed ? 'checked' : ''} 
                          onclick="toggleCompletion(${subjectIndex}, ${topicIndex})">
                      <label for="topic-${subjectIndex}-${topicIndex}">${topic.name}</label>
                  </li>
              `).join('')}
          </ul>
      `;
      subjectsDiv.appendChild(subjectDiv);
  });
}

// Toggle completion for a topic
function toggleCompletion(subjectIndex, topicIndex) {
  subjects[subjectIndex].topics[topicIndex].completed = !subjects[subjectIndex].topics[topicIndex].completed;
  saveToLocalStorage(); // Save changes to localStorage
  calculateProgress();  // Recalculate progress
}

// Calculate total progress and update the progress displays
function calculateProgress() {
  let totalTopics = 0;
  let completedTopics = 0;

  subjects.forEach(subject => {
      subject.topics.forEach(topic => {
          totalTopics++;
          if (topic.completed) completedTopics++;
      });
  });

  const progress = (completedTopics / totalTopics) * 100;
  
  // Update text progress display
  document.getElementById('progress').innerText = `Total Progress: ${progress.toFixed(2)}%`;
  
  // Update semicircle progress bar
  const progressFill = document.getElementById('progress-fill');
  const progressPercentage = document.getElementById('progress-percentage');
  
  // Set the rotation angle based on progress percentage (180 degrees is half circle)
  const degrees = (progress / 100) * 180;
  progressFill.style.transform = `rotate(${degrees}deg)`;
  
  // Update the percentage text
  progressPercentage.innerText = `${Math.round(progress)}%`;
  
  // Change color based on progress
  if (progress < 30) {
    progressFill.style.borderColor = '#f44336'; // Red for low progress
  } else if (progress < 70) {
    progressFill.style.borderColor = '#ff9800'; // Orange for medium progress
  } else {
    progressFill.style.borderColor = '#4caf50'; // Green for high progress
  }
}

// Calculate and display subject-specific progress
function calculateSubjectProgress(subjectIndex) {
    const subject = subjects[subjectIndex];
    const totalTopics = subject.topics.length;
    let completedTopics = 0;
    
    subject.topics.forEach(topic => {
        if (topic.completed) completedTopics++;
    });
    
    return (completedTopics / totalTopics) * 100;
}

// Add reset button functionality
function addResetButton() {
    const container = document.querySelector('.container');
    const resetBtn = document.createElement('button');
    resetBtn.id = 'resetBtn';
    resetBtn.innerText = 'Reset Progress';
    resetBtn.onclick = resetProgress;
    container.appendChild(resetBtn);
}

// Reset all progress
function resetProgress() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        subjects.forEach(subject => {
            subject.topics.forEach(topic => {
                topic.completed = false;
            });
        });
        saveToLocalStorage();
        renderSubjects();
        calculateProgress();
    }
}

// Initialize app
window.onload = function() {
    loadFromLocalStorage();     // Load saved data first
    populateSubjectFilter();    // Populate the filter dropdown
    renderSubjects();           // Then render the subjects
    calculateProgress();        // Calculate initial progress
    addResetButton();           // Add the reset button
};