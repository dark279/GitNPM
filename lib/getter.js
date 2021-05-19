const request = require('request');
const inquirer = require('inquirer');
let result;
const simpleGit = require('simple-git');
const github = require('octonode');
const git = simpleGit();
const config = require('./config.json');
let msg = 'g';
var client = github.client(config.token);
var ghme           = client.me();
var ghuser         = client.user('pksunkara');
var ghrepo         = client.repo('pksunkara/hub');
var ghsearch = client.search();
var npm = require('npm')

client = github.client(config.token);
function thing(query,length,callback)
{
    return ghsearch.repos({
      q: query,
      sort: 'created',
      order: 'asc',
      per_page: length
    }, callback); //array of search results
}
const { exec } = require("child_process");
var GithubSearcher = require('github-search-api');
var fing2 = [
    new inquirer.Separator(' = stuff = '),
    {
        name: "No, thanks"
    }
];
var questionsGit = [
  {
    name:"choice",
    type:'checkbox',
    message:'Clone repos?\n',
    choices: fing2,
  }
];
var questionsNPM = [
  {
    name:"choice",
    type:'checkbox',
    message:'Download packages?\n',
    choices: fing2,
  }
];
function updateQuestions(input)
{
    questios = [
        {
            type: 'list',
            name: 'size',
            message: input,
            choices: fing,
            filter: function (val) {
                return val.toLowerCase();
            }
        }
    ];
    return questios;
}
function promptity(questions, length)
{
    //inquirer.prompt(updateQuestions("Clone any repos?")).then((answers) => {
    inquirer.prompt(questions).then((answers) => {
        if(answers.choice == "No, thanks")
        {
            return;
        }
        else
        {
            for(var i = 0; i < length; i++)
            {
                //we clonin
                if(typeof answers.choice[answers.choice.length - i] !== "undefined" && !answers.choice.includes("No, thanks") && i != answers.choice.length - i)
                {
                    //console.log(answers.choice[answers.choice.length - i]);
                    npm.load(function(err) {
                      // handle errors

                      // install module ffi
                      npm.commands.install([answers.choice[answers.choice.length - 1]], function(er, data) {
                        // log errors or data
                      });

                      npm.on('log', function(message) {
                        // log installation progress
                        console.log(message);
                      });
                    });
                }
                
                
            }
            
        }
});
}
function promptityGit(questions,length)
{
    //inquirer.prompt(updateQuestions("Clone any repos?")).then((answers) => {
    inquirer.prompt(questions).then((answers) => {
        if(answers.choice == "No, thanks")
        {
            return;
        }
        else
        {
            for(var i = 0; i < length; i++)
            {
                //we clonin
                if(typeof answers.choice[answers.choice.length - i] !== "undefined" && !answers.choice.includes("No, thanks") && i != answers.choice.length - i)
                {
                    //console.log(answers.choice[answers.choice.length - i]);
                    git.clone('https://github.com/'+answers.choice[answers.choice.length - i]);
                }
                
                
            }
            
        }
});
}

var npmurlget = function(link, length) {
    request(link, function (error, response, body) { 
      result = body; 
      result = PStringify(result);
      for(var i = 0; i < length; i++) 
      {
          console.log('Package name:', JSON.parse(result).results[i].package.name + '\nVersion: ', JSON.parse(result).results[i].package.version, '\nDescription: ', JSON.parse(result).results[i].package.description); //what is this
          fing2[i] = JSON.parse(result).results[i].package.name.toString();
          if (i == length - 1)
          {
              fing2[length] = "No, thanks";
              promptity(questionsNPM, length);
          }
      }
      
        
      
    });
} //WOO nightmare over
//o no
function PStringify(input)
{
    return JSON.parse(JSON.stringify(input)); //WHOA YOU CAN JUST DO THAT?!?!
}
var githubget = function(query,length)
{
    msg = "Clone any repos?";
    console.log("I found",length,"repos under the query",query+".")
        for (var i = 0; i < length / length; i++)
        {
            thing(query,length,function(err,data,headers) {
                for(var x = 0; x < data.items.length; x++)
                {
                    var data2 = JSON.parse(JSON.stringify(data)).items[x];         
                    //console.log(data2.full_name);
                    fing2[x] = data2.full_name;
                    fing2[data.items.length] = "No, thanks";
                    if(x >= data.items.length + 1)
                    {
                        fing2[x] = "No results left!";
                    }
                }
                promptityGit(questionsGit,length);
                
 
            });
        }
    }

module.exports.urlget = npmurlget; //make a function pass it down
module.exports.githubget = githubget; //make another, pass it down