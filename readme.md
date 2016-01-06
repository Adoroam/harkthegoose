Angular/Bootstrap Template by Anthony Stabile

how to set up >
    clone to a folder 
        git clone https://github.com/Adoroam/angstrap.git
    install node dependencies
        npm install
    install bower libraries (the .bowerrc file saves the modules to dist/bow for easier linking)
        bower install
    update name, description, and anything else in package.json/bower.json
    open your terminal/emulator of choice in the root directory and run gulp
        gulp
    now you should be able to go to localhost in your browser and check it out
    when you save any important files, it should auto reload in the browser

file locations >
    dist: main files for the website
        dist/bow: bower libraries
        dist/templates: individual templates for your views and navigation
        dist/all.min.js: concat/minified javascript/compiled javascript
        dist/style.css: concat css
    node_modules: gulp and server stuff
    src: places to put your custom libraries
        src/css: put css files here
            src/css/style.css: starter css file to use the raleway google font and get rid of stupid blue underlines.
        src/js: put javascript files here
            src/js/app.js: angular app with required ngRoute
            src/js/routing.js: routing and navigation info
        src/ts: put typescript files here (they will be converted to javascript and merged into dist/all.min.js by gulp)

packages used >
    node
        bower
            angular
            angular-route
            bootstrap
        gulp
            concat (merges files together)
            uglify (removes empty space)
            connect (runs the server and autoreload)
            typescript (because typescript)
        event-stream (for merging compiled typescript with other js)

Questions, Comments, Whatever:
    AStabile.Design@gmail.com