let fetch = require('node-fetch');


let promise = fetch(
  'https://api.github.com/users/' + process.argv[2],

  {
    method: 'GET',
    headers: {
      Authorization: 'token ' + process.argv[3]
    },

  }
);

promise.then( function handleResponse(responseObj) {
  console.log( responseObj.status );

  if (responseObj.status > 199 && responseObj.status < 300) {

    responseObj.json().then ( function printData(myUserData) {
      console.log(myUserData.name, myUserData.location, myUserData.location);

    } );

  } else {

    console.log('Error', responseObj.status);
  }

} );


let promise1 = fetch(
  'https://api.github.com/users/' + process.argv[2] + '/repos',
  {
    method: 'GET',
    headers: {
      Authorization: 'token ' + process.argv[3]
    },

  }
);

let starCount = {
  name: "something",
  count: 0
};
let i = 0;
contributorLogin= [];

promise1.then( function handleResponse(responseObj) {
  if (responseObj.status > 199 && responseObj.status < 300) {
    responseObj.json().then( function printData(myUserData) {
      myUserData.forEach(function getStarCount(each) {

        if (each.stargazers_count > starCount.count) {
          starCount.count = each.stargazers_count;
          starCount.name = each.name;
        }
      }








      let promise3 = fetch(
        'https://api.github.com/repos/' + process.argv[2] + '/' + each.name + '/contributors',
        {
          method: 'GET',
          headers: {
            Authorization: 'token ' + process.argv[3]
          }
        }
      );

      promise3.then(function handleResponse(responseObj) {
        if (responseObj.status > 199 && responseObj.status < 300) {
          responseObj.json().then(function contributors(contributorData) {
            if (contributorData[0].login !== 'jakerella') {
              i++;
              let contributorName = contributorData[0].login;
              console.log('CONTRIBUTOR ' + i + ':', contributorName);
              contributorLogin.push(contributorName);

            }

          });
        } else {
          console.log('Error', responseObj.status);
        }

      });

    });
    console.log('Repo with the most stars: ', starCount.name);
    console.log('Star Count: ', starCount.count);
  }

});
