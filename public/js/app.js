const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageSucces = document.querySelector('#message-1')
const messageFailure = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = search.value
    console.log(location);
    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            console.log(data.error);
            messageFailure.textContent=data.error
        }else{
            console.log(data.location)
            console.log(data.forecast)
            messageSucces.textContent=data.forecast
        }
    })
})
})