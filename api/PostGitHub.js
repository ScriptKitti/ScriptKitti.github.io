function SKGistAutho(username, password, fileName, _public, content) {
  $.ajax({ 
    url: 'https://api.github.com/authorizations',
    type: 'POST',
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password)); 
    },
    data: '{"scopes": ["gist"],"note": "Creating New File: ' + fileName + '"}'
  }).error(function(error) {
    console.log(error);
    alert('error');
  }).done(function(response) {
    SKGistCreate(response.id, response.token, fileName, _public, content);
  });
}

function SKGistCreate(id, token, fileName, _public, content) {
  $.ajax({ 
    url: 'https://api.github.com/gists',
    type: 'POST',
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', 'token ' + token); 
    },
    data: '{"description": "Created ' + fileName + '","public": ' + _public + ',"files": {"' + fileName + '": {"content": "' + content + '"}}}'
  }).error(function(error) {
    console.log(error);
    alert('error');
  }).done(function(response) {
    alert('ID: ' + id + '\nToken: ' + token + '\n\nTo edit this file, remember these details.');
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
    alert('error');
  }).done(function(response) {
    console.log(response);
    console.log('Update Successful');
  });
}
//SKGistAutho('scriptkitti@gmail.com', 'Fr0g1-10t', 'happy.json', false, $.parseJSON('{"popularity": {}}'));
//ID: 0f432777586cecf11b01
//Token: df9996fa77f2cf2523366a59301fe0272c06e3e0
//ID: 24375838
//ID: 15379330
//Token: e7aa35ecb433c45d7a7bdf64a9753f7ea6b58ed3
SKGistUpdate('24375838', 'e7aa35ecb433c45d7a7bdf64a9753f7ea6b58ed3', 'happy.json', false, 'hi');
