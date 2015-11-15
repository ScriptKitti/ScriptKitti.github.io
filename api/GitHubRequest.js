function SKGistCreate(username, password, _public, fileName, content, confirm) {
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var today = day + '/' + month + '/' + year;
  
  $.ajax({
    url: 'https://api.github.com/authorizations',
    type: 'POST',
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password)); 
    },
    data: '{"scopes": ["gist"],"note": "' + date.getTime() + '"}'
  }).error(function(error) {
    console.log(error);
    alert(error.message + ':\n\n' + error.errors[0].field + ' ' + error.errors[0].code);
  }).done(function(response) {
    SKGistAuthoTrue(response.token, _public, fileName, content, today, confirm);
  });
}

function SKGistCreateAuthoTrue(token, _public, fileName, content, today, confirm) {
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

function SKGistUpdate(username, password, _description, _public, fileName, content, confirm) {
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var today = day + '/' + month + '/' + year;
  
  $.ajax({
    url: 'https://api.github.com/authorizations',
    type: 'POST',
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password)); 
    },
    data: '{"scopes": ["gist"],"note": "' + date.getTime() + '"}'
  }).error(function(error) {
    console.log(error);
    alert(error.message + ':\n\n' + error.errors[0].field + ' ' + error.errors[0].code);
  }).done(function(response) {
    SKGistUpdateAuthoTrue(response.id, response.token, _description, _public, fileName, content, today, confirm);
  });
}

function SKGistUpdateAuthoTrue(id, token, _description, _public, fileName, content, today, confirm) {
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
