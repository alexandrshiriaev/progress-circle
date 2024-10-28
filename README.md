# Progress circle component on plain JavaScript

## Usage example

```js
const progressCircleRoot = document.getElementById("progress-circle-root");

const progressCircle = new ProgressCircle(progressCircleRoot, {
    value: 35,
    animated: false,
    hidden: false
});

progressCircle.setValue(100);

progressCircle.setAnimated(true);

progressCircle.setHidden(true);
```
