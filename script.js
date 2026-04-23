const input = document.getElementById('journalInput');
const moodLabel = document.getElementById('moodLabel');
const moodDisplay = document.getElementById('moodDisplay');
const suggestionBox = document.getElementById('suggestionBox');
const charCount = document.getElementById('charCount');
const root = document.documentElement;
const saveBtn = document.getElementById('saveBtn');

// 1. Data Analysis Dictionary
const sentiments = {
    happy: ['happy', 'great', 'love', 'amazing', 'productive', 'good', 'success', 'joy', 'wonderful', 'best'],
    sad: ['sad', 'bad', 'tired', 'hate', 'fail', 'angry', 'stress', 'low', 'terrible', 'blue', 'lonely'],
    angry: ['angry', 'mad', 'furious', 'rage', 'annoyed', 'frustrated', 'stupid']
};

// 2. Background Animation
anime({
    targets: '.glow-orb',
    translateX: () => anime.random(-100, 100),
    translateY: () => anime.random(-50, 50),
    scale: () => anime.random(0.8, 1.3),
    easing: 'easeInOutQuad',
    duration: 10000,
    direction: 'alternate',
    loop: true
});

// 3. Main Input Listener
input.addEventListener('input', (e) => {
    const text = e.target.value.toLowerCase();
    charCount.innerText = `${text.length} characters`;

    if (text.length < 5) return;

    let score = 0;
    sentiments.happy.forEach(word => { if (text.includes(word)) score++; });
    sentiments.sad.forEach(word => { if (text.includes(word)) score--; });
    sentiments.angry.forEach(word => { if (text.includes(word)) score -= 2; });

    if (score > 1) {
        updateTheme('Happy 😊', '#00ffcc', 'Your vibe is high! Keep manifesting.', 'smile');
    } else if (score < -1 && score > -4) {
        updateTheme('Reflective 😔', '#bb86fc', 'It\'s okay to feel low. Let the words heal you.', 'brain');
    } else if (score <= -4) {
        updateTheme('Intense 😠', '#ff4d4d', 'Release the fire. Tomorrow is a new sky.', 'hot');
    } else {
        updateTheme('Harmonic 😐', '#00d4ff', 'Balance is key. What\'s on your mind?', 'equalizer');
    }
});

// 4. Update Theme & Colors
function updateTheme(label, color, suggestion, icon) {
    if (root.style.getPropertyValue('--vibe-col') === color) return;

    anime({
        targets: root,
        '--vibe-col': color,
        duration: 1000,
        easing: 'easeInOutQuad'
    });

    moodLabel.innerText = label;
    suggestionBox.innerText = `"${suggestion}"`;
    moodDisplay.querySelector('i').className = `bx bx-${icon}`;
}

// 5. Save & Load Logic
saveBtn.addEventListener('click', () => {
    const content = input.value;
    if (content.trim() === "") return alert("Please write something first!");

    localStorage.setItem('userJournal', content);
    
    // Feedback Animation
    anime({
        targets: '#saveBtn',
        scale: [1, 1.1, 1],
        duration: 300
    });
    alert("Journal saved to your local orbit! ✨");
});

window.onload = () => {
    const saved = localStorage.getItem('userJournal');
    if (saved) {
        input.value = saved;
        input.dispatchEvent(new Event('input'));
    }
};