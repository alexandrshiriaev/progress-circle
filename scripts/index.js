class ProgressCircle {
  constructor(
    parentNode,
    progressCircleProps = {
      value: 0,
      animated: false,
      hidden: false,
    },
  ) {
    const { value, animated, hidden } = progressCircleProps;
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

function createProgressCircleNode() {
  const progressCircleNode = document.createElement("div");

  progressCircleNode.classList.add("progress-circle");

  progressCircleNode.innerHTML = '<div class="progress-circle__inner"></div>';

  return progressCircleNode;
}
