document.addEventListener('click', e => {
    // DELETE Feature
    if (e.target.classList.contains('delete-me')) {
        if (confirm("Delete this item permanently?")) {
            axios.post('/delete-item', { id: e.target.getAttribute("data-id") }).then(function () {
                // update the text on the front end real-time
                e.target.parentElement.parentElement.remove();
            }).catch(function () {
                console.log("Something went wrong.")
            })
        }
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