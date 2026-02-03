const predictionForm = document.getElementById('predictionForm');
const predictBtn = document.getElementById('predictBtn');
const resultCard = document.getElementById('resultCard');
const predictionResult = document.getElementById('predictionResult');
const resetBtn = document.getElementById('resetBtn');

predictionForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Show loading state
    predictBtn.classList.add('loading');
    predictBtn.disabled = true;

    // Get values
    const data = {
        sepal_length: parseFloat(document.getElementById('sepal_length').value),
        sepal_width: parseFloat(document.getElementById('sepal_width').value),
        petal_length: parseFloat(document.getElementById('petal_length').value),
        petal_width: parseFloat(document.getElementById('petal_width').value)
    };

    try {
        const response = await fetch('http://127.0.0.1:8000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('API Error');
        }

        const result = await response.json();

        // Show result
        predictionResult.textContent = result.prediction;
        predictionForm.classList.add('hidden');
        resultCard.classList.remove('hidden');

    } catch (error) {
        console.warn('Backend offline, using Demo Mode');

        // DEMO MODE: Simulate a prediction for UI demonstration
        const demoClasses = ['setosa', 'versicolor', 'virginica'];
        const randomClass = demoClasses[Math.floor(Math.random() * demoClasses.length)];

        // Simulate network delay
        await new Promise(r => setTimeout(r, 1000));

        predictionResult.textContent = randomClass + ' (Demo)';
        predictionForm.classList.add('hidden');
        resultCard.classList.remove('hidden');
    } finally {
        predictBtn.classList.remove('loading');
        predictBtn.disabled = false;
    }
});

resetBtn.addEventListener('click', () => {
    predictionForm.reset();
    resultCard.classList.add('hidden');
    predictionForm.classList.remove('hidden');
});
