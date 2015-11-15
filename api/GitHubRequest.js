function SKGistAccessToken(username, password, tokenName) {
  $.ajax({
    url: 'https://api.github.com/authorizations',
    type: 'POST',
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password)); 
    },
    data: '{"scopes": ["gist"],"note": "' + tokenName + '"}'
  }).error(function(error) {
    console.log(error);
    alert(error.message + ':\n\n' + error.errors[0].field + ' ' + error.errors[0].code);
  }).done(function(response) {
    alert('ATTENTION\n\nID: ' + response.id + '\nToken: ' + response.token + '\n\nTo create and edit files, remember these details.');
  });
}

function SKGistCreate(token, _public, fileName, content, confirm) {
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var today = day + '/' + month + '/' + year;
  
  $.ajax({ 
    url: 'https://api.github.com/gists',
    type: 'POST',
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', 'token ' + token); 
    },
    data: '{"description": "Created ' + fileName + ' on ' + today + '","public": ' + _public + ',"files": {"' + fileName + '": {"content": "' + content + '"}}}'
  }).error(function(error) {
    console.log(error);
    alert('error: ' + error.message);
  }).done(function(response) {
    if (confirm) {
      alert('Create Successful');
    } else {
      console.log('Create Successful');
    }
  });
}
SKGistCreate('3b1a1f251747a44e4cf502f54ef5859dcc9a5c4f', false, 'Article.json', 'hi', true);
SKGistCreate('93a2cc5bb634e452b07c2d89bf40cf84550a4525', false, 'Popular.json', 'hi', true);

function SKGistUpdate(id, token, _description, _public, fileName, content, confirm) {
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var today = day + '/' + month + '/' + year;
  
  $.ajax({ 
    url: 'https://api.github.com/gists/' + id,
    type: 'PATCH',
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', 'token ' + token); 
    },
    data: '{"description": "Updated ' + fileName + ' on ' + today + ': ' + _description + '","public": ' + _public + ',"files": {"' + fileName + '": {"content": "' + content + '"}}}'
  }).error(function(error) {
    console.log(error);
    alert('error: ' + error.message);
  }).done(function(response) {
    if (confirm) {
      alert('Update Successful');
    } else {
      console.log('Update Successful');
    }
  });
}
