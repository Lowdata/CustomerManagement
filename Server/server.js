import express from 'express';
const app = express();
import axios from 'axios';
import cors from 'cors';

app.use(cors());
app.use(express.json());

// Authorisation
app.post('/auth', async (req,res)=>{
    try{
        const body= req.body;
        try{
            const response= await axios({
                method:'post',
                url:'https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp',
                data:body,
            })
            res.status(200).send(response.data.access_token);
        }
        catch(error){
            res.status(501).send("error in auth");
        }
    }
    catch(error){
        res.status(500).send("Error in auth")
    }
})

//Create
app.post('/signup_customer', async (req,res)=>{
    try{
        const body= req.body;
        try{
            const response= await axios({
                method:'post',
                url:`https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp`,
                headers:{
                    'Authorization':'Bearer dGVzdEBzdW5iYXNlZGF0YS5jb206VGVzdEAxMjM='
                },
                data:body,
                params:{
                    'cmd':'create',
                }
            });
            res.status(201).send("Successfully Created");
        }   
        catch(error){
            res.status(501).send("Error in signup_customer");
        }
    }
    catch(error){
        res.status(500).send("Error in signup_customer")
    }
})


//Fetch Customer List
app.get('/get_customer_list', async (req, res)=>{
    try{
        const response= await axios({
            method:'get',
            url:'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp',
            headers:{
                'Authorization':'Bearer dGVzdEBzdW5iYXNlZGF0YS5jb206VGVzdEAxMjM=',
            },
            params:{
                'cmd':'get_customer_list'
            },
        });
        res.status(201).json(response.data);
    }
    catch(error){
        res.status(500).send("Error in get_customer_list");
    }
})


//Delete the Customer
app.post('/delete_customer/:uuid', async (req,res)=>{
    try{
        const uuid= req.params.uuid;
        try{
            const response= await axios({
                method:'post',
                url:`https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp`,
                headers:{
                    'Authorization':'Bearer dGVzdEBzdW5iYXNlZGF0YS5jb206VGVzdEAxMjM='
                },
                params:{
                    'cmd':'delete',
                    'uuid':uuid,
                }
            });
            response.status==200?res.status(200).send("Successfully Deleted"):response.status==400?res.status(400).send("UUID not found"):res.status(500).send("Error Not Deleted");
        }   
        catch(error){
            res.status(501).send("Error in signup_customer");
        }
    }
    catch(error){
        res.status(500).send("Error in signup_customer")
    }
})


//Update the Customer 
app.post('/update_customer/:uuid', async (req,res)=>{
    try{
        const body= req.body;
        const uuid= req.params.uuid;
        const response= await axios({
            method:'post',
            url:`https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp`,
            headers:{
                'Authorization':'Bearer dGVzdEBzdW5iYXNlZGF0YS5jb206VGVzdEAxMjM='
            },
            data:body,
            params:{
                'cmd':'update',
                'uuid':uuid,
            }
        });
        response.status==200?res.status(200).send("Successfully Updated"):res.status(400).send("Body is Empty");
    }
    catch(error){
        res.status(500).send("UUID not found")
    }
})


app.listen(8000, (req,res) => 
    console.log("Server is running"),
);