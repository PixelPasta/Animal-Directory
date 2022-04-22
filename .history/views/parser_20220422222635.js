const fact = document.getElementsByClassName('fact')

console.log(new DOMParser().parseFromString(fact, "text/html").body.textContent)

