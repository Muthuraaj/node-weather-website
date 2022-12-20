const message1=document.querySelector('#m1') 
const message2=document.querySelector('#m2')

const weatherform=document.querySelector('form')
const search=document.querySelector('input')
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location=search.value
    
    message1.textContent='loading...'
    message2.textContent=''
    fetch('http://localhost:3000/weather2?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            message1.textContent=data.error
        }
        else{
            message1.textContent=data.location
            message2.textContent=JSON.stringify(data.forecast) 
            console.log(data.forecast)
        }
    })

})
    
})