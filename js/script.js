// GitHub Repo Gallery

// GLOBAL VARIABLES

//Div where profile info appears
const overview = document.querySelector(".overview");

// GitHub username
const username = "gladsbc0ding";

// Unordered list  that displays the repos list
const repoList = document.querySelector(".repo-list");

// Section where all repo info will appears
const reposSection = document.querySelector(".repos");

// Section for individual repo data
const repoData = document.querySelector(".repo-data");

// Back to Repo Gallery button
const viewReposButton= document.querySelector(".view-repos");

// Search-by-name input
const filterInput = document.querySelector(".filter-repos");

// Create function to fetch GitHub profile info
const getGitProfile = async function () {
  const profileRequest = await fetch(`https://api.github.com/users/${username}`);
  const data = await profileRequest.json();
  displayUserInfo(data);
};
getGitProfile ();

// Create function to display fetched user getUserInfo
const displayUserInfo = function (data) {
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
    getRepos(username);
  };

  // Create function to fetch repos
  const getRepos = async function (username) {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    displayRepo(repoData);
  };

// Create function to display repo info
  const displayRepo = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
      const repoItem = document.createElement("li");
      repoItem.classList.add("repo");
      repoItem.innerHTML = `<h3>${repo.name}</h3>`;
      repoList.append(repoItem);
    }
  };

  // Add a click event for unordered list (.repo-list)
  repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
      // create variable to target innerText where event happens
      let repoName = e.target.innerText;
      getRepoInfo(repoName);
    }
  });

  // Create function to get specific repo info
  const getRepoInfo = async function (repoName) {
    const fetchRepoInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchRepoInfo.json();
    //console.log(repoInfo);

    // CREATE AN ARRAY OF LANGUAGES
    // Fetch data from languages_url of repoInfo
    const fetchLanguages = await fetch(repoInfo.languages_url);
    // Variable to save JSON response
    const languageData = await fetchLanguages.json();
    // Add each language to empty array (languageData is an object)
    const languages = [];
    for (let language in languageData) {
      languages.push(language);
    }
    displayRepoInfo(repoInfo, languages);
  };

  // CREATE FUNCTION TO DISPLAY SPECIFIC REPO INFO

  // Create new function to display specific repo
  const displayRepoInfo = function (repoInfo, languages) {
    viewReposButton.classList.remove("hide");
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    reposSection.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View repo on GitHub!</a>
    `;
    repoData.append(div);
  };

// Create click event listener - Back to Repo Gallery backToGalleryButton
viewReposButton.addEventListener("click", function () {
  reposSection.classList.remove("hide");
  repoData.classList.add("hide");
  viewReposButton.classList.add("hide");
});

// Create input event listener to filterInput
filterInput.addEventListener("input", function (e) {
  const searchText = e.target.value;
  const repos = document.querySelectorAll(".repo");
  const lowerCaseText = searchText.toLowerCase();
  for (const repo of repos) {
    const repoLowerCase = repo.innerText.toLowerCase();
    if (repoLowerCase.includes(lowerCaseText)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});
