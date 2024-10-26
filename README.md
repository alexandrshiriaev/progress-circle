# Progress circle component on plain JavaScript

## Usage example

```js
const progressCircleRoot = document.getElementById("progress-circle-root");

const progressCircle = new ProgressCircle(progressCircleRoot, {
    value: 35,
    animated: false,
    hidden: false
});

progressCircle.setValue(100); // When this method is called method this.setAnimated(false) is called underhood

progressCircle.setAnimated(true);

progressCircle.setHidden(true);
```
