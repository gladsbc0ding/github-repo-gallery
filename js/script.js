// GitHub Repo Gallery

// GLOBAL VARIABLES

//Div where profile info appears
const overview = document.querySelector(".overview");

// GitHub username
const username = "gladsbc0ding";

// Unordered list  that displays the repos list
const repoList = document.querySelector(".repo-list");

// Create function to fetch GitHub profile info
const getGitProfile = async function () {
  const profileRequest = await fetch(`https://api.github.com/users/${username}`);
  const data = await profileRequest.json();
  getUserInfo(data);
};

getGitProfile ();

// Create function to display fetched user getUserInfo
const getUserInfo = function (data) {
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
    overview.append(div);
    getRepos();
  };

  // Create function to fetch repos
  const getRepos = async function () {
    const reposRequest = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await reposRequest.json();
    displayRepo(repoData);
  };

// Create function to display repo info
  const displayRepo = function (repos) {
    for (const repo of repos) {
      const repoItem = document.createElement("li");
      repoItem.classList.add("repo");
      repoItem.innerHTML = `<h3>${repo.name}</h3>`;
      repoList.append(repoItem);
    }
  };
