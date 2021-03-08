var unirest = require("unirest");

var req = unirest(
  "POST",
  "https://luxand-cloud-face-recognition.p.rapidapi.com/photo/detect"
);

req.headers({
  "content-type": "application/x-www-form-urlencoded",
  "x-rapidapi-key": "600e727090msh5abaeb237281dc4p184b20jsn81a8a64d2fe2",
  "x-rapidapi-host": "luxand-cloud-face-recognition.p.rapidapi.com",
  useQueryString: true,
});

req.form({
  photo:
    "https://media.glamour.com/photos/5a425fd3b6bcee68da9f86f8/master/pass/best-face-oil.png",
});

req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});
