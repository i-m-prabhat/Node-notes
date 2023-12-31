require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

app.get("/", (req, res) =>
{
    res.send("Hello World!");
})

app.get("/twitter", (req, res) =>
{
    res.send("Hello You are using / twitter route!");
})


app.get("/login", (req, res) =>
{
    res.send("Login Page is Loading...........");

})
app.get("/signup", (req, res) =>
{
    res.send("Sign Up Page is Loading...........");
})

app.get('/githubdata', (req, res) =>
{
    res.json({
        "login": "i-m-prabhat",
        "id": 117756490,
        "node_id": "U_kgDOBwTSSg",
        "avatar_url": "https://avatars.githubusercontent.com/u/117756490?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/i-m-prabhat",
        "html_url": "https://github.com/i-m-prabhat",
        "followers_url": "https://api.github.com/users/i-m-prabhat/followers",
        "following_url": "https://api.github.com/users/i-m-prabhat/following{/other_user}",
        "gists_url": "https://api.github.com/users/i-m-prabhat/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/i-m-prabhat/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/i-m-prabhat/subscriptions",
        "organizations_url": "https://api.github.com/users/i-m-prabhat/orgs",
        "repos_url": "https://api.github.com/users/i-m-prabhat/repos",
        "events_url": "https://api.github.com/users/i-m-prabhat/events{/privacy}",
        "received_events_url": "https://api.github.com/users/i-m-prabhat/received_events",
        "type": "User",
        "site_admin": false,
        "name": "Prabhat",
        "company": null,
        "blog": "",
        "location": null,
        "email": null,
        "hireable": true,
        "bio": "Hi, I 'm Prabhat. You might recognize  me as MERN Stack Developer 👨‍💻",
        "twitter_username": "i_m_prabhat__",
        "public_repos": 46,
        "public_gists": 2,
        "followers": 18,
        "following": 6,
        "created_at": "2022-11-08T15:52:52Z",
        "updated_at": "2023-12-24T06:58:10Z"
    });
})


app.listen(process.env.PORT || port, () =>
{
    console.log(`Server is running on http://localhost:${process.env.PORT || port}`);
})