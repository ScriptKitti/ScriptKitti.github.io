function SKPostGitHub(username, password) {
  var token, id;
  
  $.ajax({ 
    url: 'https://api.github.com/authorizations',
    type: 'POST',
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password)); 
    },
    data: '{"scopes": ["gist"],"note": "Test Vote"}'
  }).done(function(response) {
    alert(response)
    token = response;
  });
  
  $.ajax({ 
    url: 'https://api.github.com/gists',
    type: 'POST',
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', 'token ' + token); 
    },
    data: '{"description": "Vote From User","public": false,"files": {"Votes.txt": {"content": "Test"}}}'
  }).done(function(response) {
    alert(response)
    id = response;
  });
  
  $.ajax({ 
    url: 'https://api.github.com/gists/' + id,
    type: 'PATCH',
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', 'token ' + token); 
    },
    data: '{"description": "Votes From User","public": false,"files": {"Votes.txt": {"content": "test dhsjd"}}}'
  }).done(function(response) {
    alert(response)
  });
}
SKPostGitHub('scriptkitti@gmail.com', 'Fr0g1-10t');
