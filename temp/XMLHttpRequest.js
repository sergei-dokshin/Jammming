//                    get access token after authorization(youtube method)

async function callAuthorizationApi() {
    let body = `grant_type=authorization_code&code=${AuthCode}&redirect_uri=http://localhost:3000/&client_id=44a2eeebcd05452fb85455ce497c3779&client_secret=23bb778bf4ff4f3cabcdb18feb6f3f19`;

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://accounts.spotify.com/api/token', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa('44a2eeebcd05452fb85455ce497c3779:23bb778bf4ff4f3cabcdb18feb6f3f19'));

    xhr.send(body);
    xhr.onload = handleAuthResponse;
}

function handleAuthResponse() {
    let data = '';
    if (this.status == 200) {
      data = JSON.parse(this.responseText);
      console.log("DATA: " + data);
      setStatus('m');

      if (data.access_token != undefined) {
        setAccess_token(data.access_token);
        console.log("access_token: " + access_token);
      }
    } else {
      console.log("responseText: " + this.responseText);
    }
  }
