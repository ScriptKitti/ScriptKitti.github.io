function SKPostGitHub(username, password) {
  //SKPostGitHub(username, repo, dir, token, cType, dType, content) Get Github Authorization Token with proper scope, print to console
  var token, id;
  
  $.ajax({ 
    url: 'https://api.github.com/authorizations',
    type: 'POST',
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password)); 
    },
    data: {
      'scopes': ['gist'],
      'note': 'Test Vote'
    }
  }).done(function(response) {
    console.log(response);
    token = response;
  });
  
  //Create a Gist with token from above
  $.ajax({ 
    url: 'https://api.github.com/gists',
    type: 'POST',
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', 'token ' + token); 
    },
    data: {
      'description': 'Vote From User',
      'public': false,
      'files': {
        'Votes.txt': {
          'content': 'Test'
        }
      }
    }
  }).done(function(response) {
    console.log(response);
    id = response;
  });
  
  //Using Gist ID from the response above, we edit the Gist with Ajax PATCH request
  $.ajax({ 
    url: 'https://api.github.com/gists/' + id,
    type: 'PATCH',
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', 'token ' + token); 
    },
    data: {
      'description': 'Votes From User',
      'public': false,
      'files': {
        'Votes.txt': {
          'content': 'test dhsjd'
        }
      }
    }
  }).done(function(response) {
    console.log(response);
  });
  
  // var urlConstruct = 'https://developer.github.com/v3/repos/' + username + '/' + repo + '/contents/' + dir + '?access_token=' + token;
  // $.ajax({
  //   type: 'POST',
  //   url: urlConstruct,
  //   contentType: cType,
  //   dataType: dType,
  //   data: content
  // }).done(function() {
  //   console.log('Post Complete');
  // });
}
SKPostGitHub('scriptkitti@gmail.com', 'Fr0g1-10t');
//SKPostGitHub('ScriptKitti', 'ScriptKitti.github.io', 'articles/parallaxscrolljavascript/Votes.json', '7ad081ba672d3e7e958f0b48dd5333b9524021b7', 'application/json', 'json', JSON.stringify({"Votes": "2"}));
