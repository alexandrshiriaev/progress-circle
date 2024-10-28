# progress-circle

> Circular progress bar on plain JavaScript

## Usage example

Copy `progress-circle.js` to your _scripts_ folder and `progress-circle.css` to _styles_ folder.

`index.html`

```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <link rel="stylesheet" href="styles/styles.css" />
        <link rel="stylesheet" href="styles/progress-circle.css" />
        <title>Progress</title>
        <script src="scripts/progress-circle.js"></script>
    </head>
    <body>
    <div id="progress-circle-root"></div>
    </body>
    <script src="scripts/index.js"></script>
</html>
```

`styles/styles.css`
```css
/* These variables are required */
:root {
    --primary-color: #005bff;
    --primary-background-color: #eaf0f6;
    --progress-value: 0;
}
```

`scripts/index.js`
```js
const progressCircleRoot = document.getElementById("progress-circle-root");

const progressCircle = new ProgressCircle(progressCircleRoot, {
    value: 5,
    animated: false,
    hidden: false
});

progressCircle.setAnimated(true);

setTimeout(() => {
    progressCircle.setValue(50);
}, 1000);

setTimeout(() => {
    progressCircle.setValue(100);
}, 2000);

setTimeout(() => {
    progressCircle.setHidden(true);
}, 3000);
```

## API
### `progressCircle = new ProgressCircle(parentNode, [opts]);`

Create a new `progressCircle` instance.

The _progress circle node_ will be created **inside** node `parentNode`.

If `opts` is specified, then the default options (shown below) will be overriden.

```js
{
  value: 0, // Initial value of progress bar
  animated: false, // Initial animation state
  hidden: false, // Initial hidden state
}
```

### `progressCircle.setValue(value)`

`value: number`

Sets progress value of progress circle to `value`.

```js
const value = 100;
progressCircle.setValue(value);
```

### `progressCircle.setAnimated(animated)`

`animated: boolean`

Sets whether progress circle animated to `animated`.

**The length of the rotating line depends on the field `progressCircle.value`.**

```js
progressCircle.setValue(35);

const isAnimated = true;
progressCircle.setAnimated(isAnimated);
```

### `progressCircle.setHidden(hidden)`

`hidden: boolean`

Sets whether progress circle hidden to `hidden`.

```js
const isHidden = true;
progressCircle.setHidden(isHidden);
```
