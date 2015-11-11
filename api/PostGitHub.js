function SKGistAutho(username, password, fileName, _public, content) {
  $.ajax({ 
    url: 'https://api.github.com/authorizations',
    type: 'POST',
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password)); 
    },
    data: '{"scopes": ["gist"],"note": "New File"}'
  }).error(function(error) {
    console.log(error);
    alert('Error: ' + error);
  }).done(function(response) {
    SKGistCreate(response.token, fileName, _public, content);
  });
}

function SKGistCreate(token, fileName, _public, content) {
  $.ajax({ 
    url: 'https://api.github.com/gists',
    type: 'POST',
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', 'token ' + token); 
    },
    data: '{"description": "Created ' + fileName + '","public": ' + _public + ',"files": {"' + fileName + '": {"content": "' + content + '"}}}'
  }).error(function(error) {
    console.log(error);
    alert('Error: ' + error);
  }).done(function(response) {
    alert('ID: ' + response.id + '\nToken: ' + token + '\n\nTo edit this file, remember these details.');
  });
}

function SKGistUpdate(id, token, fileName, _public, content) {
  $.ajax({ 
    url: 'https://api.github.com/gists/' + id,
    type: 'PATCH',
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', 'token ' + token); 
    },
    data: '{"description": "Updated ' + fileName + '","public": ' + _public + ',"files": {"' + fileName + '": {"content": "' + content + '"}}}'
  }).error(function(error) {
    console.log(error);
    alert('Error: ' + error);
  }).done(function(response) {
    console.log('Update Successful');
  });
}
SKGistAutho('scriptkitti@gmail.com', 'Fr0g1-10t', 'Votes.json', false, '{"popularity": {}}');
