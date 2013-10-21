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
