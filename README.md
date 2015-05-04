# tap-stream-helpers
Helpers for emitting Test Anything Protocol formatted output for systems using file streams, like gulp.

## Install with npm
```npm install tap-stream-helpers```

## Gulp JSHint Example

```
var tapStream = require('tap-stream-helpers').tapStream;

gulp
    .src('mysrc/**/*.js')
    .pipe(jshint()) // jshint emits a file stream with errors
    .pipe(tapStream(jshintOut, function (f) { // run for every file, f is the file
        if (f.jshint.results) {
            return f.jshint.results.map(function (result) {

                // TAP expects the following fields: isOk, file, line, column, message
                return {
                    isOk: false, // false if there was an error
                    file: f.path, // the file the error was found in
                    line: result.error.line, // the line the error was found on
                    column: result.error.character, // the column the error was found on
                    message: result.error.reason // the error message
                };
            });
        }
    }));
```

## TAP String Builder
You can also build up TAP strings manually if you want to generate .tap files manually:

```
var tapStringBuilder = require('tap-stream-helpers').tapStreamBuilder,

    // sample result set
    results = [{
        isOk: false,
        file: 'myfile.js',
        line: 1,
        column: 2,
        message: 'There was an error'
    }];

tapStringBuilder.getTap(results.map(function (result) {
    result.index = j;

    j++;
    
    return result;
}));
```

Or if you want to generate TAP header, lines, and footer separately:

```
var header = tapStringBuilder.getHeader(results.length),
    lineWithFileMarkers = tapStringBuilder.getFileLine({
        isOk: result.isOk,
        index: i,
        file: result.file,
        line: result.line,
        column: result.column,
        message: result.message
    }),
    
    lineWithoutFileMarkers = tapStringBuilder.getLine({
        isOk: result.isOk,
        index: i,
        file: result.file,
        message: result.message
    }),
    footer = tapStringBuilder.getFooter(results.length);
```
