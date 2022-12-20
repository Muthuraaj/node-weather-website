const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=8b12ffd7b95f91d010dfaed617de4868&query='+latitude+','+longitude+'&units=f'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("unable to find service!!",undefined)
        }
        else if(body.error){
            callback("unable to get weather",undefined)

        }
        else{
            callback(undefined,{
                
                forecast:body.current.weather_descriptions [0] + "  it is currently "+body.current.temperature +" degree out " + " it is currently " + body.current.feelslike + " degree out"
                 
            })
        }
    })

}

module.exports=forecast