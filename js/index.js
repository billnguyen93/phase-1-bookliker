document.addEventListener("DOMContentLoaded", function() {
    const bookList = document.querySelector("#list")
    const bookUrl = "http://localhost:3000/books"
    const mainContainer = document.querySelector("#show-panel")
    const user = {"id": 99, "username": "pouros"}
    getBooks()
    //fetch requests

    function getBooks() {
       fetch(bookUrl)
        .then(resp => resp.json())
        .then(data => displayBooks(data))
    }


    //Rendering

    function displayBooks(bookObj) {
        bookObj.forEach(bookObj => {
            
            const li = document.createElement("li")
            li.textContent = bookObj.title
            bookList.appendChild(li)
            
            li.addEventListener("click", () => {
                mainContainer.innerHTML = ''
                
                const img = document.createElement('img')
                img.src = bookObj.img_url
                
                const title = document.createElement('h1')
                title.textContent = bookObj.title
                
                const subtitle = document.createElement('h2')
                subtitle.textContent = bookObj.subtitle 
                
                const author = document.createElement('h3')
                author.textContent = bookObj.author
                
                const description = document.createElement('p')
                description.textContent = bookObj.description
                
                const likeButton = document.createElement('button')
                likeButton.textContent = "LIKE"
                
                const userUl = document.createElement("ul")
                bookObj.users.forEach(user => {
                    
                    const userLi = document.createElement("li")
                    userLi.id = "user";
                    userLi.textContent = user.username
                    userUl.append(userLi)
                    
                })

                likeButton.addEventListener('click', () => {
                    bookObj.users.push(user)
                    fetch(bookUrl + `/${bookObj.id}`, {
                        method: "PATCH",
                        contentType: "application/json",
                        body: bookObj.users
                    })
                    
                    userUl.innerHTML = ''
                    bookObj.users.forEach(user => {
                    
                        const userLi = document.createElement("li")
                        userLi.id = "user";
                        userLi.textContent = user.username
                        userUl.append(userLi)
                        
                    })
                })
                
                mainContainer.append(img, title, subtitle, author, description, userUl, likeButton)

            })
            
        })   
    }

   

    
   


   
});

