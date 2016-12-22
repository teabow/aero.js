# Getting started (CommonJs aero). To use with Browserify.

### Install aero.js via npm
```
npm install aero.js
```

### Require aero.js and then you can create an aero view
```javascript
var aero = require('aero.js');
var React = require('react');

var mainView = aero.view.extend ({

    init: function () {
        this.render();
    },

    render: function () {
        var View = React.createClass({
            render: function() {
                return (
                    <main>
                        <h1>Main view with React</h1>
                    </main>
                );
            }
        });
        React.render(<View />, document.getElementById('content'));
    }
});

module.exports = mainView;
```

### In your main app file, register the view in aero controller
```javascript
var aero = require('aero.js');
var mainView = require('./views/mainView');

var views = [
    {
        name: 'main',
        ref: mainView
    }
];
aero.controller.init(views);
```

### Finally, show the view to the browser
```javascript
aero.controller.showView('main');
```

### Check the full [Browserify-React-Aero sample](https://github.com/teabow/aero.js/tree/master/sample-browserify-react) in the github repository.

# Getting started (Global aero)

### Include aero.js and its dependencies (zepto.js and lodash.js) to your index.html file
```html
<script src="path/to/zepto.js"></script>
<script src="path/to/lodash.js"></script>
<script src="path/to/aero.js"></script>
```
> You can run `bower install aero.js` to retrieve these files

### Then you can create an aero view
```javascript
window.app = window.app || {};
window.app.views = window.app.views || {};

window.app.views.main = window.aero.view.extend ({

    template: 'templates/main.html',

    container: '#content',

    init: function () {
        this.addEvent('click button.hiBtn', this.hiBtnHandler);

        // Array injection
        var array = [{name: 'item list 1'}, {name: 'item list 2'}, {name: 'item list 3'}];
        this.renderArray('main ul', 'templates/mainList.html', array, function (element) {
            element.name = 'Aero ' + element.name;
        });

        // Object injection
        var author = {firstname: 'Thibaud', lastname: 'Bourgeois'};
        this.render('footer', 'templates/mainFooter.html', author);
    },

    hiBtnHandler: function () {
        window.alert('Hi');
    }

});
```
> The template will be later injected into the container element

### Register the view in aero controller
```javascript
var views = [
    {
        name: 'main',
        ref: window.app.views.main
    }
];

window.aero.controller.init(views).preload();
```
> Once initialized you can indicate to the controller to preload templates

### Finally, show the view to the browser
```javascript
window.aero.controller.showView('main');
```
> You can pass a second parameter (a json object) to the showView function. Then use the `<%=key%>` notation to use passed data in your associated template
### Check the full [sample](https://github.com/teabow/aero.js/tree/master/sample) in github repository


# Data binding extension

### Input binding
In your template add the `data-observable-input` attribute to the input you want to observe

```html
<input type="text" name="userName" data-observable-input>
```

Then in your aero view, you can get and set the input value through this variable

```javascript
this.observables.userName.value
```

### Value binding
First create an object with the value you want to observe (here `name`)

```javascript
this.observables.user = {name: 'everyone'};
```

Then in your template, add to your html element the `data-observable-value` attribute which value should be `"user.name"`

```html
<span data-observable-value="user.name"></span>
```

Finally, you can get and set the name property of user object through this variable

```javascript
this.observables.user.name
```

### Array binding
Create an array in your aero view

```javascript
this.observables.others = [
    {
        name: 'Lebron'
    },
    {
        name: 'Kobe'
    }
]
```

Then add the `data-observable-array` attribute to your element which value should be the name of your array variable (here `others`), you can specify the template you want to use for every array iteration thanks to the `data-observable-template` attribute

```html
<ul data-observable-array="others" 
data-observable-template="templates/user.html"></ul>
```

> All the data you want to observe should be register in the `observables` object of the related aero view.
