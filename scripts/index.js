const progressValueInput = document.getElementById("progress-value");
const progressAnimatedToggler = document.getElementById("animate-toggle");
const progressHiddenToggler = document.getElementById("hide-toggle");

const progressCircleRoot = document.getElementById("progress-circle-root");

const progressCircle = new ProgressCircle(progressCircleRoot);

// Validate value input

progressValueInput.addEventListener("change", (ev) => {
    let value = parseInt(ev.target.value);
    if (isNaN(value)) return ev.target.value = progressCircle.value;
    if (value > 100) value = 100;
    if (value < 0) value = 0;
    ev.target.value = value;
    progressCircle.setValue(value);
});

// Set empty input if input value is zero on focus

progressValueInput.addEventListener("focus", (ev) => {
    if (ev.target.value === '0') {
        ev.target.value = '';
    }
})

// Set zero value to input if input value is empty on blur

progressValueInput.addEventListener("blur", (ev) => {
    if (ev.target.value === '') {
        ev.target.value = '0';
    }
})

progressAnimatedToggler.addEventListener("change", (ev) => {
    const isAnimated = ev.target.checked;
    progressCircle.setAnimated(isAnimated);
});

progressHiddenToggler.addEventListener("change", (ev) => {
    const isHidden = ev.target.checked;
    progressCircle.setHidden(isHidden);
});

// Handling click/enter on toggle button for convenient tab navigation
const toggleButtons = document.querySelectorAll(".toggle-button");
toggleButtons.forEach(btn => {
    const toggleButtonInput = btn.querySelector('.toggle-button__input');
    const toggleButtonLabel = btn.querySelector('.toggle-button__label');
    btn.addEventListener('click', (e) => {
        toggleButtonInput.click();
    })

    // Stop propagation for click event for toggle button to avoid re-event
    toggleButtonLabel.addEventListener('click', (e) => {
        e.stopPropagation();
    })
})