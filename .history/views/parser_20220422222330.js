const fact = document.getElementById('fact')
fact.innerText = new DOMParser().parseFromString(fact, "text/html").body.textContent


