function createProgressCircleNode() {
    const progressCircleNode = document.createElement("div");

    progressCircleNode.classList.add("progress-circle");

    progressCircleNode.innerHTML = '<div class="progress-circle__inner"></div>';

    progressCircleNode.setAttribute("role", "progressbar")
    progressCircleNode.setAttribute("aria-live", "polite")
    progressCircleNode.setAttribute("tabindex", "0")
    progressCircleNode.setAttribute("aria-label", "Progress bar")

    return progressCircleNode;
}

function animate(startValue, targetValue, duration, callback) {

    const startTime = performance.now();

    const animationFn = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentValue = startValue + (targetValue - startValue) * progress;

        callback(currentValue);

        if (progress < 1) {
            requestAnimationFrame(animationFn);
        }
    }

    requestAnimationFrame(animationFn);
}

class ProgressCircle {
    constructor(
        parentNode,
        progressCircleProps = {
            value: 0,
            animated: false,
            hidden: false,
        },
    ) {
        const {value, animated, hidden} = progressCircleProps;
        this.node = parentNode.appendChild(createProgressCircleNode());

        this.value = value;
        this.setValue(value);

        this.animated = animated;
        this.setAnimated(animated);

        this.hidden = hidden;
        this.setHidden(hidden);
    }

    setValue(value) {
        animate(this.value, value, 200, (curValue) => {
            this.node.style.setProperty("--progress-value", curValue * 3.6);
        })
        this.node.setAttribute("aria-valuenow", value);
        this.value = value;
    }

    setAnimated(animated) {
        if (animated) {
            this.node.classList.add("animated");
            return;
        }

        this.node.classList.remove("animated");
    }

    setHidden(hidden) {
        if (hidden) {
            this.node.classList.add("hidden");
            return;
        }

        this.node.classList.remove("hidden");
    }
}

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