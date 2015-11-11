function SKGistCreate(username, password, _public, fileName, content) {
  var token, id;
  var date = new Date();
  
  $.ajax({
    url: 'https://api.github.com/authorizations',
    type: 'POST',
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password)); 
    },
    data: '{"scopes": ["gist"],"note": "Creating New File: ' + fileName + ' at ' + date.getTime() + '"}'
  }).error(function(error) {
    console.log(error);
    alert(error.message + ':\n\n' + error.errors[0].field + ' ' + error.errors[0].code);
  }).done(function(response) {
    token = response.token;
    id = response.id;
  });
  
  $.ajax({ 
    url: 'https://api.github.com/gists',
    type: 'POST',
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', 'token ' + token); 
    },
    data: '{"description": "Created ' + fileName + ' at ' + date.getTime() + '","public": ' + _public + ',"files": {"' + fileName + '": {"content": "' + content + '"}}}'
  }).error(function(error) {
    console.log(error);
    alert('error: ' + error.message);
  }).done(function(response) {
    alert('ID: ' + id + '\nToken: ' + token + '\n\nTo edit this file, remember these details.');
  });
}

function SKGistUpdate(id, token, _description, _public, fileName, content, confirm) {
  var date = new Date();
  
  // $.ajax({ 
  //   url: 'https://api.github.com/authorizations',
  //   type: 'POST',
  //   beforeSend: function(xhr) { 
  //     xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password)); 
  //   },
  //   data: '{"scopes": ["gist"],"note": "Update ' + fileName + ' at ' + date.getTime() + '"}'
  // }).error(function(error) {
  //   console.log(error);
  //   alert(error.message + ':\n\n' + error.errors[0].field + ' ' + error.errors[0].code);
  // }).done(function(response) {
  //   console.log(response);
  //   token = response.token;
  //   _id = response.id;
  //   alert(token);
  //   alert(_id);
  // });
  
  $.ajax({ 
    url: 'https://api.github.com/gists/' + id,
    type: 'PATCH',
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', 'token ' + token); 
    },
    data: '{"description": "Update ' + fileName + ' at ' + date.getTime() + ': ' + _description + '","public": ' + _public + ',"files": {"' + fileName + '": {"content": "' + content + '"}}}'
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

SKGistCreate('scriptkitti@gmail.com', 'Fr0g1-10t', 'pleasework.json', false, $.parseJSON('{"popularity": {}}'));
//SKGistUpdate('', '', 'erejhrjt', false, 'pleasework.json', 'hi', true);
