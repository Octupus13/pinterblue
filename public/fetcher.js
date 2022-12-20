fetcherGet =async (ep) => {
    let response =await fetch(ep,{method:"GET",headers:{'Content-Type':'application/json'}})
    let result = await response.json()
    console.log(result);
    result.forEach((element,i) => {
        let createIMG = document.createElement("IMG")
        
        console.log(element.picdata);
        createIMG.setAttribute('src','data:image/png;base64,'+element.picdata)
        createIMG.setAttribute('height','300')
        createIMG.setAttribute('width','300')
        createIMG.setAttribute('alt','pic'+ i)
        document.body.appendChild(createIMG)
    });
}

const signUpF = async (ep) =>{
    const username = document.getElementById('username').value
    const email = document.getElementById('email').value
    const pwd = document.getElementById('password').value
    const cfPwd = document.getElementById('conpassword').value
    const data = {username:username,email:email,password:pwd,confirm_password:cfPwd}
    console.log(data);
    let response = await fetch(ep,{method:"POST",headers:{'Content-Type':'application/json'},body: JSON.stringify(data)})
    let result = await response.json()
    alert(result.message)
}


const loginF = async (ep) =>{
    const username = document.getElementById('loginEmail').value
    const pwd = document.getElementById('loginPwd').value
    const data = {username:username,password:pwd}
   
    let response = await fetch(ep,{method:"POST",headers:{'Content-Type':'application/json'},body: JSON.stringify(data)})
    let result = await response.json()
    document.cookie = "Bearer "+result.token+";max-age=3600"; "path="+ep;
    alert(result.message)
    
}

const userGet = async(ep)=>{
    const id = document.cookie
    console.log(id);
    let response = await fetch(ep,{method:"GET",headers:{'authorization':id}})
    let result = await response.json()
    console.log(result);
    const idBox = document.getElementById('text')
    idBox.innerText =JSON.stringify(result);
    
}