//                           Getting access TOKEN (without authorization)

  useEffect(() => {

    const client_id = "44a2eeebcd05452fb85455ce497c3779";
    const client_secret = "23bb778bf4ff4f3cabcdb18feb6f3f19";
    const requestParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`
    }
    fetch("https://accounts.spotify.com/api/token", requestParameters)
      .then(response => response.json())
      .then(data => setAccessToken(data["access_token"]))
      .catch(e => {
        console.log("Unable to get TOKEN: " + e);
      })
  }, []);