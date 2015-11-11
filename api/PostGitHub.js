$.ajax({
  type: 'POST',
  url: '',
  contentType: 'application/json',
  dataType: 'json',
  data: JSON.stringify({
    "count": ""
  })
}).done(function() {
  console.log('Post Complete');
});
