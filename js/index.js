// function searchGithubUsers(query) {
//   fetch(`https://api.github.com/search/users?q=${query}`, {
//     headers: {
//       "Accept": "application/vnd.github.v3+json"
//     }
//   }).then(res => res.json())
//   .then(obj => obj.items)
// }

const userList = document.querySelector("#user-list")
const reposList = document.querySelector("#repos-list")

function createLink(url) {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.setAttribute("href", url)
  a.setAttribute("target", "_blank")
  a.textContent = url
  li.append(a)
  return li
}

function createLi(user, text) {
  const li = document.createElement("li")
  li.setAttribute("style", "cursor: pointer;")
  li.innerHTML = `<img src="${user.avatar_url}" style="width: 30px;"> ${user.login}\n<br><a href="${user.html_url}" target="_blank">${user.html_url}</a><hr>`

  li.addEventListener("click", () => {
    const lis = document.querySelectorAll("#user-list li")
    lis.forEach(li => {
      li.style.color = "black"
    })
    li.style.color = "red"
    reposList.innerHTML = ""
    fetch(`https://api.github.com/users/${user.login}/repos`, {
      headers: {"Accept": "application/vnd.github.v3+json"}
    }).then(res => res.json())
    .then(obj => {
      if(obj.length === 0) {
        reposList.append("There is no repo for this user.")
      } else {
        for(let i = 0; i < obj.length; i++) {
          reposList.append(createLink(obj[i].html_url))
        }
      }
    })
  })
  return li
}

const githubForm = document.querySelector("#github-form")
const search = document.querySelector("#search")

githubForm.addEventListener('submit', (e) => {
  e.preventDefault()
  userList.innerHTML = ""
  reposList.innerHTML = ""
  let users;
  fetch(`https://api.github.com/search/users?q=${search.value}`, {
    headers: {"Accept": "application/vnd.github.v3+json"}
  }).then(res => res.json())
  .then(obj => {
    users = obj.items
    users.forEach(user => {
      userList.append(createLi(user))
    })
  })
})