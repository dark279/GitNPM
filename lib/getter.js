const request = require('request');
const inquirer = require('inquirer');
let result;
const simpleGit = require('simple-git');
const git = simpleGit();
const config = require('./config.json');
var fing = [];
let msg = 'g';
var itdms;
const { exec } = require("child_process");
var GithubSearcher = require('github-search-api');
var questions = [
  {
    type: 'list',
    name: 'size', //BAHAHAH TAKEN FROM INQUIRER PIZZA DEMO
    message: msg,
    choices: fing,
    filter: function (val) {
      return val.toLowerCase();
    }
  }
];
function promptity(questions)
{
    

    msg = 'Download any packages?';
    questions = [
        {
            type: 'list',
            name: 'size', //BAHAHAH TAKEN FROM INQUIRER PIZZA DEMO
            message: msg,
            choices: fing,
            filter: function (val) {
                return val.toLowerCase();
            }
        }
    ];
    inquirer.prompt(questions).then((answers) => {
        if(answers.size == "No, thanks")
        {
            return;
        }
        else
        {
            exec('sudo npm install -g ' + answers.size, (err, stdout, stderr) => { if (err) { return; }});
        }
});
}
function promptityGit(questions)
{
    msg = "Clone any repos?";
    questions = [
        {
            type: 'list',
            name: 'size', //BAHAHAH TAKEN FROM INQUIRER PIZZA DEMO
            message: msg,
            choices: fing,
            filter: function (val) {
                return val.toLowerCase();
            }
        }
    ];
    inquirer.prompt(questions).then((answers) => {
        if(answers.size == "No, thanks")
        {
            return;
        }
        else
        {
            //POG POG POG THIS WORKS
            git.clone('https://github.com/'+answers.size);
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
          fing[i] = JSON.parse(result).results[i].package.name.toString();
          if (i == length - 1)
          {
              fing[length] = "No, thanks";
              promptity(questions);

              
          }
          
      }
      
        
      
    });
} //WOO nightmare over
//WAIT MORE NIGHTMARE? AAAAAAAAAAAAAAA-
function PStringify(input)
{
     return JSON.parse(JSON.stringify(input)); //WHOA YOU CAN JUST DO THAT?!?!
}
var githubget = function(query,length)
{    
    msg = "Clone any repos?";
    console.log("I found",length,"repos under the query",query+".")
    var github = new GithubSearcher({username: config.name, password: config.pass});
    github.searchRepos((length,query /*why is this reversed tho??*/), function(data) {
        for(var i = 0; i < length; i++) 
          {
              var thing = (PStringify(data).items[i].owner.login + '/' + PStringify(data).items[i].name);
              console.log('Repo name:',thing);
              fing[i] = PStringify(data).items[i].owner.login+'/'+PStringify(data).items[i].name.toString();
              if (i == length - 1)
              {
                  fing[length] = "No, thanks";
                  promptityGit(questions);
              }
              
          }
    });
}

module.exports.urlget = npmurlget; //make a function pass it down
module.exports.githubget = githubget; //make another, pass it down