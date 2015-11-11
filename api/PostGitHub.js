function SKGistCreate(username, password, _public, fileName, content) {
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
    //SKGistCreate(response.id, response.token, _public, fileName, content);
    $.ajax({ 
      url: 'https://api.github.com/gists',
      type: 'POST',
      beforeSend: function(xhr) { 
        xhr.setRequestHeader('Authorization', 'token ' + response.token); 
      },
      data: '{"description": "Created ' + fileName + ' at ' + date.getTime() + '","public": ' + _public + ',"files": {"' + fileName + '": {"content": "' + content + '"}}}'
    }).error(function(error) {
      console.log(error);
      alert('error: ' + error.message);
    }).done(function(response) {
      alert('ID: ' + response.id + '\nToken: ' + response.token + '\n\nTo edit this file, remember these details.');
    });
  });
}

// function SKGistPassedAutho(id, token, _public, fileName, content) {
//   var date = new Date();
  
//   $.ajax({ 
//     url: 'https://api.github.com/gists',
//     type: 'POST',
//     beforeSend: function(xhr) { 
//       xhr.setRequestHeader('Authorization', 'token ' + token); 
//     },
//     data: '{"description": "Created ' + fileName + ' at ' + date.getTime() + '","public": ' + _public + ',"files": {"' + fileName + '": {"content": "' + content + '"}}}'
//   }).error(function(error) {
//     console.log(error);
//     alert('error: ' + error.message);
//   }).done(function(response) {
//     alert('ID: ' + id + '\nToken: ' + token + '\n\nTo edit this file, remember these details.');
//   });
// }

function SKGistUpdate(username, password, _public, fileName, content, confirm) {
  var date = new Date();
  
  $.ajax({ 
    url: 'https://api.github.com/authorizations',
    type: 'POST',
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password)); 
    },
    data: '{"scopes": ["gist"],"note": "Update ' + fileName + ' at ' + date.getTime() + '"}'
  }).error(function(error) {
    console.log(error);
    alert(error.message + ':\n\n' + error.errors[0].field + ' ' + error.errors[0].code);
  }).done(function(response) {
    $.ajax({ 
      url: 'https://api.github.com/gists/' + response.id,
      type: 'PATCH',
      beforeSend: function(xhr) { 
        xhr.setRequestHeader('Authorization', 'token ' + response.token); 
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
  });
}

SKGistCreate('scriptkitti@gmail.com', 'Fr0g1-10t', 'pleasework.json', false, $.parseJSON('{"popularity": {}}'));
//SKGistUpdate('', '', 'erejhrjt', false, 'pleasework.json', 'hi', true);
