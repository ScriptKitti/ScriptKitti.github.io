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

function SKGistUpdate(username, password, _description, _public, fileName, content, confirm) {
  var token, id;
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
    alert(error.message + ':\n\n' + error.['errors'][0].field + ' ' + error.['errors'][0].code);
  }).done(function(response) {
    token = response.token;
    id = response.id;
  });
  
  $.ajax({ 
    url: 'https://api.github.com/gists/' + id,
    type: 'PATCH',
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', 'token ' + token); 
    },
    data: '{"description": "' + _description + '","public": ' + _public + ',"files": {"' + fileName + '": {"content": "' + content + '"}}}'
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

//SKGistAutho('scriptkitti@gmail.com', 'Fr0g1-10t', 'happy.json', false, $.parseJSON('{"popularity": {}}'));
//ID: 0f432777586cecf11b01
//Token: df9996fa77f2cf2523366a59301fe0272c06e3e0
//ID: 24375838
//ID: 15379330
//Token: e7aa35ecb433c45d7a7bdf64a9753f7ea6b58ed3
SKGistUpdate('scriptkitti@gmail.com', 'Fr0g1-10t', 'sdhjsd', false, 'happy.json', 'hi', true);
