function SKGistCreate(username, password, tokenName, _public, fileName, content, confirm) {
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
    SKGistAuthoTrue(response.token, _public, fileName, content, confirm)
    alert('ATTENTION\n\nID: ' + response.id + '\nToken: ' + response.token + '\n\nTo edit THIS file, remember these details.');
  });
}

function SKGistAuthoTrue(token, _public, fileName, content, confirm) {
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
SKGistCreate('scriptkitti@gmail.com', 'Fr0g1-10t', 'Article', false, 'Article.json', '', true);

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
