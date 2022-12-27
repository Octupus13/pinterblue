

// const setEpRedirect = (ep) =>{
//     endpointRedirect = ep;
//     console.log(ep);
// }


const getEpRedirect = ()=>{return parent.document.URL.substring(parent.document.URL.indexOf('?id')+4, parent.document.URL.length);}


fetcherGet =async (ep) => {
    let response =await fetch(ep,{method:"GET",headers:{'Content-Type':'application/json'}})
    let result = await response.json()
    result.forEach((element,i) => {
        let createIMG = document.createElement("IMG")
        let createA = document.createElement('a')
        let imgDiv = document.getElementById('imgDiv')
        createIMG.setAttribute('src','data:image/png;base64,'+element.picdata)
        createA.setAttribute('href','/picview.html?id='+element.pid)
        imgDiv.appendChild(createA)
        createA.appendChild(createIMG)
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
    window.location.href = '/login.html'
}


const loginF = async (ep) =>{
    const username = document.getElementById('loginEmail').value
    const pwd = document.getElementById('loginPwd').value
    const data = {username:username,password:pwd}
   
    let response = await fetch(ep,{method:"POST",headers:{'Content-Type':'application/json'},body: JSON.stringify(data)})
    let result = await response.json()
    document.cookie = "Bearer "+result.token+";max-age=3600";
    alert(result.message)
    if(result.message == 'Login Complete Successfully') window.location.href = '/index.html'
    
}

const userGet = async(ep)=>{
    const id = document.cookie.substring(document.cookie.indexOf('Bearer'))
    console.log(id);
    let response = await fetch(ep,{method:"GET",headers:{'authorization':id}})
    let result = await response.json()
    console.log(result);
    return await result
}

const download = async(id) =>{
    let response = await fetch('/img/download/'+id,{method:'GET'})
    let data = await response.blob()
    let date = new Date().toISOString()
    console.log(data);
    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(data);
    a.download = date+"-IMG.png";
    a.click();
    alert('DOWNLOAD SUCCUESS')
}

const getById = async(id) =>{

    let response = await fetch('/img/get/'+id,{method:'GET'})
    let [data] = await response.json()
    if(data.picdata && data.picdata.length != 0){
    let createIMG = document.createElement("IMG")
    let createBtn = document.createElement('button')
    let imgDiv = document.getElementById('picdiv')
    let btnDiv = document.createElement('div')
    createIMG.setAttribute('src','data:image/png;base64,'+data.picdata)
    createIMG.setAttribute('id','singleImg')
    createBtn.appendChild(document.createTextNode('Download'))
    createBtn.setAttribute('onclick','download(getEpRedirect())')
    btnDiv.setAttribute('id','btnDiv')
    imgDiv.appendChild(createIMG)
    imgDiv.appendChild(btnDiv)
    btnDiv.appendChild(createBtn)
    console.log('สร้างแล้ว');}
    else alert(data.message)
}

userNav = async (user) =>{
    const users =await user
    const id = await users.uid
    
    let navbar = document.getElementById('navbar')
    let createLi = document.createElement("li")
    let createA = document.createElement('a')
    
    if(id && id.length != 0){
    let createImg = document.createElement('img')
    createImg.setAttribute('src','./img/user.png')
    createImg.setAttribute('id','userProfile')
    createA.setAttribute('href','/user.html')
    navbar.appendChild(createLi)
    createLi.appendChild(createA)
    createA.appendChild(createImg)
    console.log('เจอ');
    }
    else{
    createA.appendChild(document.createTextNode('Login'))
    createA.setAttribute('href','/login.html')
    navbar.appendChild(createLi)
    createLi.appendChild(createA)
        console.log('ไม่เจอ');
    }
  }
  
  MyProfile = async(user) =>{
    const users = await user
    console.log(users);
    if(users.uid && users.uid.length != 0){
    document.getElementById('userImg').setAttribute('src','./img/user.png')
    document.getElementById('usernameText').innerHTML = users.username
    document.getElementById('emailText').innerHTML = users.email
    }
    else window.location.href = '/login.html'
  }

  checkOwn = async (user) =>{
    const users = await user
    const id = document.cookie.substring(document.cookie.indexOf('Bearer'))
    let response = await fetch('/img/check/'+user,{method:"GET",headers:{'authorization':id}})
    let result = await response.json()
    console.log(result);
    if(result.owned){
        const btnDiv = document.getElementById('btnDiv')
        const btnDelete = document.createElement('button')
        btnDelete.appendChild(document.createTextNode('Delete'))
        btnDelete.setAttribute('onclick','deleteF(getEpRedirect())')
        btnDiv.appendChild(btnDelete)
        console.log("แบะๆ");
    }
  }

  const deleteF = async(user) =>{
    const users = await user
    const id = document.cookie.substring(document.cookie.indexOf('Bearer'))
    let response = await fetch('/img/del/'+users,{method:'DELETE',headers:{'authorization':id}})
    let result = await response.json()
    alert(result.message)
    window.location.href = '/'
}

  userNav(userGet('users/getMy'))