const progressValueInput = document.getElementById("progress-value");
const progressAnimatedToggler = document.getElementById("animate-toggle");
const progressHiddenToggler = document.getElementById("hide-toggle");

const progressCircleRoot = document.getElementById("progress-circle-root");

const progressCircle = new ProgressCircle(progressCircleRoot);

progressValueInput.addEventListener("change", (ev) => {
    let value = parseInt(ev.target.value);
    if (isNaN(value)) return ev.target.value = progressCircle.value;
    if (value > 100) value = 100;
    if (value < 0) value = 0;
    ev.target.value = value;
    progressCircle.setValue(value);
});

progressValueInput.addEventListener("focus", (ev) => {
    if (ev.target.value === '0') {
        ev.target.value = '';
    }
})

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

const toggleButtons = document.querySelectorAll(".toggle-button");
toggleButtons.forEach(btn => {
    const toggleButtonInput = btn.querySelector('.toggle-button__input');
    const toggleButtonLabel = btn.querySelector('.toggle-button__label');
    btn.addEventListener('click', (e) => {
        if (e.target !== toggleButtonInput && e.target !== toggleButtonLabel) {
            toggleButtonInput.click();
        }
    })

    toggleButtonLabel.addEventListener('click', (e) => {
        e.stopPropagation();
    })
})