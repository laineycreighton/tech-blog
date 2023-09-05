const button = document.getElementById('new-post')
button.addEventListener('click', function (event) {
    console.log('New Post Created')
    window.location.href = '/dashboard/post'
})


const postForm = document.getElementById('post-form')
const title = document.getElementById('title')
const content = document.getElementById('content')

postForm.addEventListener('submit', async function (event) {
    event.preventDefault()
    const postBody = {
        title: title.value,
        body: content.value
    }

    const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postBody)
    })

    if (response.ok) {
        window.location.href = '/dashboard'
    } else {
        const json = await response.json()
        console.log(json)
    }
})