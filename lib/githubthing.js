const config = require('./config.json');

var github = require('octonode');
var callback;
// Then we instantiate a client with or without a token (as show in a later section)
var client = github.client(config.token);
var ghme           = client.me();
var ghuser         = client.user('pksunkara');
var ghrepo         = client.repo('pksunkara/hub');
var ghorg          = client.org('flatiron');
var ghissue        = client.issue('pksunkara/hub', 37);
var ghmilestone    = client.milestone('pksunkara/hub', 37);
var ghlabel        = client.label('pksunkara/hub', 'todo');
var ghpr           = client.pr('pksunkara/hub', 37);
var ghrelease      = client.release('pksunkara/hub', 37);
var ghgist         = client.gist();
var ghteam         = client.team(37);
var ghproject      = client.project(37);
var ghnotification = client.notification(37);
var ghsearch = client.search();
//var client = github.client();
var result = "";
client = github.client(config.token);
var size = 10;
//client.get('/user', {}, function (err, status, body, headers) {
  ///console.log(body); //json object
//});

function thing(query,length,callback)
{
    ghsearch.repos({
      q: query,
      sort: 'created',
      order: 'asc',
      per_page: length
    }, callback); //array of search results
}
function search(query,length)
{
    for(var i = 0; i < length / length; i++){
         thing(query, length,function(err,data,headers) {
             for(var x = 0; x < data.items.length; x++)
             {
                var data2 = JSON.parse(JSON.stringify(data)).items[x];         
                //console.log(data2.full_name);
                //console.log(data2.full_name);
                if(typeof data2.full_name != 'undefined')
                {
                    //console.log(data2.full_name);
                    result = data2.full_name;
                    console.log(result);
                    //result = result;

                }
                
             }
             //console.log(result);
             //result = result;
             //return result;
             //callback(result);
             
         });
    }
    //allback(result);
    
}
async function doasearch(query,length)
{
    
}
module.exports.search = search;