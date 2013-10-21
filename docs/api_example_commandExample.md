```js
.on('--help', function() {  
  program.commandExample({  
    description: 'description of the command you want to display.',  
    examples: [{description: 'description of the example',
                command:     'cli cmd -o'},
               {description: 'an other description',
                command:     'cli othercmd -f'}]
  })
})
```

Print out the following lines to console:

```
  Description:
    description of the command you want to display.

  Usage Examples:
    # description of the example
    $ cli cmd -o

    # an other description
    $ cli othercmd -f

```
