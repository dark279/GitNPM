/**
 * Checkbox list examples
 */
const inquirer = require('inquirer');
var fing = [
    new inquirer.Separator(' = stuff = '),
    {
      name: 'PeePee',
    },
    {
      name: 'Pee'    
    },
];
var questions = [
  {
    name:"choice",
    type:'checkbox',
    message:'lol',
    choices: fing,
  }
];

inquirer.prompt(questions).then((answers) => {
});
/*      type: 'checkbox',
      message: 'Select toppings',
      name: 'toppings',
      choices: [
        new inquirer.Separator(' = The Meats = '),
        {
          name: 'Pepperoni',
        },
        {
          name: 'Ham',
        },
        {
          name: 'Ground Meat',
        },
        {
          name: 'Bacon',
        },
        new inquirer.Separator(' = The Cheeses = '),
        {
          name: 'Mozzarella',
          checked: true,
        },
        {
          name: 'Cheddar',
        },
        {
          name: 'Parmesan',
        },
        new inquirer.Separator(' = The usual ='),
        {
          name: 'Mushroom',
        },
        {
          name: 'Tomato',
        },
        new inquirer.Separator(' = The extras = '),
        {
          name: 'Pineapple',
        },
        {
          name: 'Olives',
          disabled: 'out of stock',
        },
        {
          name: 'Extra cheese',
        },
      ],
      validate: function (answer) {
        if (answer.length < 1) {
          return 'You must choose at least one topping.';
        }

        return true;
      },*/
