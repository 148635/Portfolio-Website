const express=require("express")
const app=express()
const bodypar=require("body-parser")
const request=require("request")
app.use(express.static(__dirname+"/public"))
const https=require("https")
app.use(bodypar.urlencoded({extended:true}))
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index2.html")
})
app.post("/",function(req,res)
{
    const email=req.body.email
    const data={
        members:[
            {
                email_address : email,
                status:"subscribed"
            } 
        ]
    }
    const data2=JSON.stringify(data)
    console.log(data2);
    const url="https://us14.api.mailchimp.com/3.0/lists/2e4459ba76";
    const options={
        method:"POST",
        auth:"148635:c302e0385597582879e50774ef119d05-us14"

    }
    const resp=https.request(url,options,function(response){
        if(response.statusCode===200)
        {
            res.redirect("/")
        }
        response.on("data",function(data)
        {
            console.log(JSON.parse(data));
        })
    })
    resp.write(data2)
    resp.end()
})
app.listen(process.env.PORT||3000,function(){
    console.log("server 3000 started.");
})
// c302e0385597582879e50774ef119d05-us14
// 2e4459ba76