function SKGistAutho(username, password) {
  $.ajax({ 
    url: 'https://api.github.com/authorizations',
    type: 'POST',
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password)); 
    },
    data: '{"scopes": ["gist"],"note": "er"}'
  }).done(function(response) {
    console.log(response);
    alert(response);
    SKGistCreate(response.token);
  });
}

function SKGistCreate(token) {
  $.ajax({ 
    url: 'https://api.github.com/gists',
    type: 'POST',
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', 'token ' + token); 
    },
    data: '{"description": "hi","public": false,"files": {"abc.txt": {"content": "Test"}}}'
  }).done(function(response) {
    console.log(response);
    alert(response);
    SKGistUpdate(response.id, token);
  });
}

function SKGistUpdate(id, token) {
  $.ajax({ 
    url: 'https://api.github.com/gists/' + id,
    type: 'PATCH',
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', 'token ' + token); 
    },
    data: '{"description": "hi","public": false,"files": {"abc.txt": {"content": "test dhsjd"}}}'
  }).done(function(response) {
    console.log(response);
    alert(response);
  });
}

SKGistAutho('scriptkitti@gmail.com', 'Fr0g1-10t');
