let animals = ['Giraffe', 'Elephant', 'Yak']

animals.forEach(function(animal, index) {
    console.log(animal, index)
})

/* Arrow notation: more concise syntax for callback functions */
/* Remove "function", add arrow after parenthesis */
/* Parameters followed by arrow, followed by statements to be executed when function is called */
animals.forEach( (animal, index) => {
    console.log(animal, index)
} )

/* Can omit curly braces if function contains only 1 statement */
animals.forEach( (animal, index) => console.log(animal, index) )

/* Can omit parenthesis around parameters if there is only 1 parameter */
animals.forEach( animal => console.log(animal) )
