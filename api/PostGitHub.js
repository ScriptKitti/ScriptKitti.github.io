function SKGistAutho(username, password) {
  $.ajax({ 
    url: 'https://api.github.com/authorizations',
    type: 'POST',
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password)); 
    },
    data: '{"scopes": ["gist"],"note": "Test Vote"}'
  }).done(function(response) {
    alert(response)
    SKGistCreate(response);
  });
}

function SKGistCreate(token) {
  $.ajax({ 
    url: 'https://api.github.com/gists',
    type: 'POST',
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', 'token ' + token); 
    },
    data: '{"description": "Vote From User","public": false,"files": {"Votes.txt": {"content": "Test"}}}'
  }).done(function(response) {
    alert(response)
    SKGistUpdate(response, token);
  });
}

function SKGistUpdate(id, token) {
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

SKGistAutho('scriptkitti@gmail.com', 'Fr0g1-10t');
