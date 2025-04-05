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

// Render subjects and topics
function renderSubjects() {
    const subjectsDiv = document.getElementById('subjects');
    subjectsDiv.innerHTML = ''; // Clear existing subjects

    subjects.forEach((subject, subjectIndex) => {
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
    calculateProgress();  // Recalculate progress
}

// Calculate total progress
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
    document.getElementById('progress').innerText = `Total Progress: ${progress.toFixed(2)}%`;
}

// Load data on page load
window.onload = renderSubjects;
