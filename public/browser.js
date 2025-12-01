document.addEventListener('click', e => {
    function itemTemplate(item){
        return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                    <span class="item-text">${item.text}</span>
                    <div>
                        <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                        <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
                    </div>
                </li>`
    }

    // HANDLERS
    const createForm = document.getElementById('create-form');
    const createField = document.getElementById('create-field');
    const itemList = document.getElementById('item-list');

    // INITIAL Page Load Render
    let ourHTML = items.map(item=>{
        return itemTemplate(item)
    }).join('')
    
    itemList.insertAdjacentHTML('beforeend', ourHTML)


    // CREATE Feature

    createForm.addEventListener('submit', function(e){
        e.preventDefault();
        axios.post('/create-item', {
            text: createField.value
        }).then(function(response){
            // create the HTML for the new item
            itemList.insertAdjacentHTML('afterbegin', itemTemplate(response.data))
            createField.value = '';
            createField.focus()
        }).catch(function(){
            console.log('Something went wrong.')
        })
    })

    // DELETE Feature
    if (e.target.classList.contains('delete-me')) {
        // if (confirm("Delete this item permanently?")) {
            axios.post('/delete-item', { id: e.target.getAttribute("data-id") }).then(function () {
                // update the text on the front end real-time
                e.target.parentElement.parentElement.remove();
            }).catch(function () {
                console.log("Something went wrong.")
            })
        // } 
    }

    // UPDATE Feature
    if (e.target.classList.contains('edit-me')) {
        // pre-populate the prompt field on the current text value
        let todoItemText = e.target.parentElement.parentElement.querySelector('.item-text');
        let userPrompt = prompt("Enter the text to update.", todoItemText.innerHTML)

        // make sure user enters a value in the prompt field to prevent empty text
        if (userPrompt) {
            axios.post('/update-item', { text: userPrompt.trim(), id: e.target.getAttribute("data-id") }).then(function () {
                // update the text on the front end real-time
                // e.target.parentElement.parentElement.querySelector('.item-text').textContent = userPrompt.trim();
                todoItemText.textContent = userPrompt.trim();
            }).catch(function () {
                console.log("Something went wrong.")
            })
        }
    }
})