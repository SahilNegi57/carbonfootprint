// 1. Define Emission Factors (in kg CO2e per unit of activity)
const EMISSION_FACTORS = {
    electricity: 0.5, // kg CO2 per kWh
    fuel: 2.3,        // kg CO2 per kWh
    transport: 0.2    // kg CO2 per km
};

// 2. Get the form and result elements
const form = document.getElementById('carbon-form');
const resultDisplay = document.getElementById('total-emissions');

// 3. Get the input (slider) elements and their display spans
const sliders = [
    { input: document.getElementById('electricity'), display: document.getElementById('electricity-value') },
    { input: document.getElementById('fuel'), display: document.getElementById('fuel-value') },
    { input: document.getElementById('transport'), display: document.getElementById('transport-value') }
];

// --- REAL-TIME SLIDER VALUE UPDATE LOGIC ---
function updateDisplay(slider) {
    // Sets the content of the <span> to the current slider value
    slider.display.textContent = slider.input.value;
}

// Attach the update function to each slider's 'input' event (fires while dragging)
sliders.forEach(slider => {
    // Set initial display value on load
    if (slider.input) {
        updateDisplay(slider); 
        
        // Update value dynamically when slider moves
        slider.input.addEventListener('input', () => updateDisplay(slider));
    }
});
// ------------------------------------------


// 4. Define the core calculation function
function calculateCarbonFootprint(e) {
    e.preventDefault(); 

    // Get user input values from the sliders
    const electricityInput = parseFloat(document.getElementById('electricity').value);
    const fuelInput = parseFloat(document.getElementById('fuel').value);
    const transportInput = parseFloat(document.getElementById('transport').value);

    // Calculation: Activity Data * Emission Factor
    const electricityEmissions = electricityInput * EMISSION_FACTORS.electricity;
    const fuelEmissions = fuelInput * EMISSION_FACTORS.fuel;
    const transportEmissions = transportInput * EMISSION_FACTORS.transport;

    // Total Emissions
    const totalEmissions_kg = electricityEmissions + fuelEmissions + transportEmissions;

    // Display the result
    const totalEmissions_tonne = totalEmissions_kg / 1000;
    resultDisplay.innerHTML = `
        Total Estimated $\text{CO}_2 \text{e}$: 
        <strong>${totalEmissions_kg.toFixed(2)} \text{ kg}</strong> 
        (or <strong>${totalEmissions_tonne.toFixed(4)} \text{ tonnes})</strong> 
        per month.
    `;
}

// 5. Attach the calculation function to the form submission event
if (form) { 
    form.addEventListener('submit', calculateCarbonFootprint);
}