function SKGistAutho(username, password) {
  $.ajax({ 
    url: 'https://api.github.com/authorizations',
    type: 'POST',
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password)); 
    },
    data: '{"scopes": ["gist"],"note": "shjshjd"}'
  }).done(function(response) {
    console.log(response);
    alert(response);
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
    data: '{"description": "sjdshjfdjh","public": false,"files": {"shdj.txt": {"content": "Test"}}}'
  }).done(function(response) {
    console.log(response);
    alert(response);
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
    data: '{"description": "sjdshjfdjh","public": false,"files": {"shdj.txt": {"content": "test dhsjd"}}}'
  }).done(function(response) {
    console.log(response);
    alert(response);
  });
}

SKGistAutho('scriptkitti@gmail.com', 'Fr0g1-10t');
