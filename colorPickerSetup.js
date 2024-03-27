const alwan = new Alwan('#colorPicker', {
    // Set the container's (widget) id.
    id: 'colorPicker',
    // One or many classes separated by a white space,
    // to add it to the preset button.
    classname: '',
    // 'dark' or 'light'.
    theme: 'dark',
    // Toggle picker's visibility (Show/Hide),
    // Setting this to false keeps the picker visible.
    toggle: true,
    // Display the picker container as a pop-up (a box that floats on top of the page content),
    // if it's false, picker container will be displayed as a block (embeded in the page's content).
    popover: true,
    // Set the position of the popper (if popover is set to true) relative to the reference element,
    // the position has two values seperated by a dash (-),
    // the first value is the direction (top, bottom, right, left),
    // the second value is the alignment (start, center, end), omitting this value will default to center.
    // e.g. 'bottom-start': 'bottom' places the picker below the reference element,
    // and 'start' aligns the left side of the container with the left side of the reference element.
    // Note: 
    // If the picker container has no space to be placed, it will auto-position itself.
    // based on the available space.
    position: 'left-end',
    // Set the gap (in pixels) between the picker container and the reference element.
    margin: 16,
    // Replace the reference element with a pre-styled button.
    // In case you set the preset to false (using your own reference element), 
    // to access the color to change its background or any other property, 
    // add the css custom property to your styles --tw-color.
    preset: true,
    // Initial color.
    color: '#000',
    // Default color.
    default: '#000',
    // Target can be a selector or an HTML element,
    // If the option popover is true, the picker container will be positionned retalive to this element,
    // instead of the reference element.
    // else if popover option is false, the picker container will be appended as a child into this element.
    target: '',
    // Disable the picker, users won't be able to pick colors.
    disabled: false,
    // Initial color format.
    format: 'rgb',
    // For the formats 'hsl' and 'rgb', choose a single input to display the color string,
    // or if false, display an input for each color channel.
    singleInput: false,
    // Choose color formats for the picker input, 'hsl', 'rgb' or 'hex',
    // No input will be displayed if the array is empty.
    inputs: {
        rgb: true,
        hex: true,
        hsl: false,
    },
    // Support alpha channel and display opacity slider.
    opacity: true,
    // Preview the color.
    preview: true,
    // Close color picker when scrolling
    closeOnScroll: false,
    // Add/Remove a copy button.
    copy: true,
    // Array of color strings, invalid color strings will default to rgb(0,0,0).
    swatches: ["#ff0000", "#00ff00", "#0000ff"],
    // Show/Hide swatches container (Make swatches container collapsible).
    toggleSwatches: false, 
    // Picker widget shared between multiple instance (this is good if you have many color picker instances).
    shared: false, 
    // Close color picker when scrolling (only if the color picker is displayed as a popover and can be closed).
    closeOnScroll: false,
    
})