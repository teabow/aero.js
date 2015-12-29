Aero.js (v1.2.5)
====================

<img src="http://thibaud.bourgeois.free.fr/aerojs/img/aerojs.png" alt="aero.js" height="100px"/>

### Minimalistic Javascript MVC library - Especially designed for mobile apps

<b>You can use it with integrated template mechanism or with a third party UI library like React</b>

To install Aero.js :
- bower install aero.js
- npm install aero.js (commonJS module to use with browserify)

To see how it works just run the samples.
You can find documentation <a href="http://teabow.github.io/aero.js">here</a>.
<br>
To add some cool data-binding check this repository : <a href="https://github.com/teabow/aero.js-observe-extension">aero.js-observe-extension</a>.

### API
#### View
```javascript
    /**
     * Renders an object into the specified selector
     * @param containerSelector the container selector
     * @param templateUrl the template url used to generate display
     * @param data the data object to display
     */
    render: function (containerSelector, templateUrl, data)
    
    /**
     * Renders an array into the specified selector
     * @param containerSelector the container selector
     * @param templateUrl the template url used to generate display
     * @param dataArray the data array to display
     * @param @nullable iterator the iterator used to modify array element before injection
     */
    renderArray: function (containerSelector, templateUrl, dataArray, iterator)
    
    /**
     * Finds element in view container scope
     * @param selector the element selector
     * @returns {*} the jquery object
     */
    findElement: function (selector)
    
    /**
     * Binds an event to the view
     * @param key the key representing the event name and selector, e.g 'click button#btnSave'
     * @param handler the event handler function to implement
     */
    addEvent: function (key, handler)
    
    /**
     * Unbinds an event from the view
     * @param key the key representing the event name and selector
     */
    removeEvent: function (key)
    
    /**
     * Adds a touch event to the view
     * @param selector the node selector
     * @param handler the event handler function to implement
     */
    addTouchEvent: function (selector, handler)
```

