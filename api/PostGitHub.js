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
    console.log(response);
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
    alert('error');
  }).done(function(response) {
    console.log(response);
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
    alert('error');
  }).done(function(response) {
    console.log(response);
    console.log('Update Successful');
  });
}
SKGistAutho('scriptkitti@gmail.com', 'Fr0g1-10t', 'happy.json', false, $.parseJSON('{"popularity": {}}'));
//ID: 0f432777586cecf11b01
//Token: df9996fa77f2cf2523366a59301fe0272c06e3e0
//SKGistUpdate('0f432777586cecf11b01', 'df9996fa77f2cf2523366a59301fe0272c06e3e0', 'hjssd.json', false, 'hi');
