function SKGistCreate(username, password, _public, fileName, content) {
  var date = new Date();
  date = date.getTime();
  
  $.ajax({
    url: 'https://api.github.com/authorizations',
    type: 'POST',
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password)); 
    },
    data: '{"scopes": ["gist"],"note": "Creating New File: ' + fileName + ' at ' + date + '"}'
  }).error(function(error) {
    console.log(error);
    alert(error.message + ':\n\n' + error.errors[0].field + ' ' + error.errors[0].code);
  }).done(function(response) {
    SKGistPassedCreateAutho(response.id, response.token, _public, fileName, content, date);
  });
}

function SKGistPassedCreateAutho(id, token, _public, fileName, content, date) {
  $.ajax({ 
    url: 'https://api.github.com/gists',
    type: 'POST',
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', 'token ' + token); 
    },
    data: '{"description": "Created ' + fileName + ' at ' + date + '","public": ' + _public + ',"files": {"' + fileName + '": {"content": "' + content + '"}}}'
  }).error(function(error) {
    console.log(error);
    alert('error: ' + error.message);
  }).done(function(response) {
    alert('ID: ' + id + '\nToken: ' + token + '\n\nTo edit this file, remember these details.');
  });
}

function SKGistUpdate(username, password, _public, fileName, content, confirm) {
  var date = new Date();
  date = date.getTime();
  
  $.ajax({ 
    url: 'https://api.github.com/authorizations',
    type: 'POST',
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password)); 
    },
    data: '{"scopes": ["gist"],"note": "Update ' + fileName + ' at ' + date + '"}'
  }).error(function(error) {
    console.log(error);
    alert(error.message + ':\n\n' + error.errors[0].field + ' ' + error.errors[0].code);
  }).done(function(response) {
    SKGistPassedUpdateAutho(response.id, response.token, _public, fileName, content, confirm, date);
  });
}

function SKGistPassedUpdateAutho(id, token, _public, fileName, content, confirm, date) {
  $.ajax({ 
    url: 'https://api.github.com/gists/' + id,
    type: 'PATCH',
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', 'token ' + token); 
    },
    data: '{"description": "Update ' + fileName + ' at ' + date + ': ' + _description + '","public": ' + _public + ',"files": {"' + fileName + '": {"content": "' + content + '"}}}'
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

SKGistCreate('scriptkitti@gmail.com', 'Fr0g1-10t', 'please.txt', false, 'dsdsd');
//SKGistUpdate('', '', 'erejhrjt', false, 'please.txt', 'hi', true);
