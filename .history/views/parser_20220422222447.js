const fact = document.getElementsByClassName('fact')
fact.innerText = new DOMParser().parseFromString(fact, "text/html").body.textContent


