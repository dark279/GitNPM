var inquirer = require('inquirer');
const getter = require('./getter.js');

function bigStuff()
{
    
    inquirer
      .prompt([
        {
            //ask for the query
            name: 'query',
          message: 'What do you want to search for?',
            default:'nothing'
        },
        {
            //ask for the api results per page size
            name:'size',
            message:'Query size?',
            default:4
        },
        {
            type:'list',
            name:'site',
            message:'Which site?',
            choices:['GitHub','NPM'],
            filter: function(val) {
                return val;
            }
        }
        
      ])
      .then(answers => {
        if(answers.query === null || "")
        {
            answers.query = "nothing";
        }
        if(answers.size === null || "")
        {
            answers.size = 4;
        }
        console.info('Attempting to search for', answers.query + " on " + answers.site + ", please wait!");
        if(answers.site.toLowerCase() === 'npm')
        {
            //i have a query, i have a size, UH, npm search
        const peepee = ("https://api.npms.io/v2/search?q=" + answers.query + "&size=" + answers.size);
        //trigger the searcher
        const getterstuff = (getter.urlget(peepee, answers.size));
        }
        else if(answers.site.toLowerCase() === 'github')
        {
            const getterthings = getter.githubget(answers.query, answers.size);
            //console.log(getterthings);
        }
        else
        {
            console.log('hey! did you mess up w typing? sorry you have to choose github or npm :p');
        }
    });

}
module.exports.bigStuff = bigStuff; //LMAOO ITS NOT RLLY AS BIG but it used to be fairly thicc lol
//ok ithought this was bad.. im fixing things in getter now