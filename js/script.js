// GitHub Repo Gallery

// GLOBAL VARIABLES

//div where profile info appears
const overview = document.querySelector(".overview");
const username = "gladsbc0ding";

// Create function to fetch GitHub profile
const getGitProfile = async function () {
  const profileRequest = await fetch(`https://api.github.com/users/${username}`);
  const data = await profileRequest.json();
  //console.log(data);
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
  };
