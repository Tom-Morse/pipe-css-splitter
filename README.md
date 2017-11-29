# pipe-css-splitter
Theme css rule splitter separates color information from other settings like height.

## Usage
Add post-css config **postcss.config.js** like below.

```javascript 
/* postcss.config.js */
module.exports = {
  plugins: {
    'pipe-css-splitter': { 
        listenFor: ['.dark', '.light'], 
        extract: ['color', 'background-color', 'border', 'border-color']]
    },
  },
};
```

**Input scss like is:**
```SCSS
// Light Theme
// @import "theme-color-mapping-light.scss";
$sample-bg-color: #ddd;
$sample-color: #222;

.light {
    .sample {
        height: 100%;
        color: $sample-color;
        background-color: $sample-bg-color;
    }
}

// Dark Theme
// @import "theme-color-mapping-dark.scss";
$sample-bg-color: #222;
$sample-color: #ddd;

.dark {
    .sample {
        height: 100%;
        color: $sample-color;
        background-color: $sample-bg-color;
    }
}
```

**Output is:**
```CSS
.sample {
    height: 100%
}

.dark .sample {
    color: #ddd;
    background-color: #222
}

.light .sample {
    color: #222;
    background-color: #ddd
}

```