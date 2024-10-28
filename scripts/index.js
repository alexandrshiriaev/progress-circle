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
        this.node.style.setProperty("--progress-value", value * 3.6);
        this.value = value;
        this.node.setAttribute("aria-valuemin", 0);
        this.node.setAttribute("aria-valuemax", 100);
        this.node.setAttribute("aria-valuenow", this.value);
        this.setAnimated(false);
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
    if (isNaN(value)) return;
    if (value > 100) value = 100;
    if (value < 0) value = 0;
    ev.target.value = value;
    progressCircle.setValue(value);
    progressAnimatedToggler.checked = false;
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