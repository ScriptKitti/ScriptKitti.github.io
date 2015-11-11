(function() {
  function SKPostGitHub(username, repo, dir, token, cType, dType, content) {
    var urlConstruct = 'https://api.github.com/repos/' + username + '/' + repo + '/contents/' + dir + '?access_token=' + token;
    $.ajax({
      type: 'POST',
      url: urlConstruct,
      contentType: cType,
      dataType: dType,
      data: content
    }).done(function() {
      console.log('Post Complete');
    });
  }
})();
