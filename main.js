let fetch = require('node-fetch');


let promise = fetch(
  'https://api.github.com/users/' + process.argv[2],

  {
    method: 'GET',
    headers: {
      Authorization: 'token ' + process.argv[3]
    },
    body: '...'
  }
);

promise.then( function handleResponse(responseObj) {
  console.log( responseObj.status );

  if (responseObj.status > 199 && responseObj.status < 300) {

    responseObj.json().then ( function printData(myUserData) {
      console.log(myUserData.name, myUserData.location);

    } );

  } else {

    console.log('There was a problem', responseObj.status);
  }

} );







let promise1 = fetch(
  'https://api.github.com/users/' + process.argv[2] + '/repos',
  {
    method: 'GET',
    headers: {
      Authorization: 'token ' + process.argv[3]
    },
    body: '...'
  }
);

promise1.then( function handleResponse(responseObj) {
  console.log( responseObj.status );

  if (responseObj.status > 199 && responseObj.status < 300) {

    responseObj.json().then( function printData(repos) {
      // console.log(repos);

      repos.forEach(function(repos) {
        console.log(repos);
      });

    });

  } else {
    console.log('There was a problem', responseObj.status);
  }

} );
