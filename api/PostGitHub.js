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
SKPostGitHub('ScriptKitti', 'ScriptKitti.github.io', 'articles/parallaxscrolljavascript/Votes.json', '7ad081ba672d3e7e958f0b48dd5333b9524021b7', 'application/json', 'json', JSON.stringify({"Votes": "2"}));
