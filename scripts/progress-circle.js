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