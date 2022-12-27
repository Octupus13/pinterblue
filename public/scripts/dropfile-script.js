const dropArea = document.querySelector('.drag-area');
const dragText = document.querySelector('.header');

let button = dropArea.querySelector('.button');
let input = dropArea.querySelector('input[type="file"]');

let file;
// when file is inside drag area
dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.classList.add('active');
    dragText.textContent = 'Release to Upload';
    // console.log('File is inside the drag area');
  });
  
  // when file leave the drag area
  dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('active');
    // console.log('File left the drag area');
    dragText.textContent = 'Drag & Drop';
  });
  
  // when file is dropped
  dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    // console.log('File is dropped in drag area');
    console.log(event.dataTransfer.files);
    file = event.dataTransfer.files[0]; // grab single file even of user selects multiple files
    console.log(file);
    displayFile();
  });
  
  function displayFile() {
    let fileType = file.type;
    console.log(fileType);
  
    let validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
  
    if (validExtensions.includes(fileType)) {
      // console.log('This is an image file');
      let fileReader = new FileReader();
  
      fileReader.onload = () => {
        let fileURL = fileReader.result;
        // console.log(fileURL);
        let imgTag = `<img src="${fileURL}" alt="">`;
        dropArea.innerHTML = imgTag;
      };
        fileReader.readAsDataURL(file)
    } else {
      alert('This is not an Image File');
      dropArea.classList.remove('active');
    }
  }
  button.onclick = () => {
    input.click();
  };
  
  // when browse
  input.addEventListener('change', function () {
    console.log(this.files);
    file = this.files[0];
    dropArea.classList.add('active');
    displayFile();
  });
  
  sendFile = async (ep) =>{
    const id = document.cookie.substring(document.cookie.indexOf('Bearer'))
    console.log(input.files[0]);
    console.log(file);
    const Img  = new FormData();
    Img.append('file',file);
    console.log(Img);
    const res = await fetch(ep,{method:'POST',headers:{'authorization':id},body:Img})
    const data = await res.json()
    console.log(data);
    console.log(data.message);
    alert(data.message)
  }

  loginCheck =async()=>{
    const id = document.cookie.substring(document.cookie.indexOf('Bearer'))
    console.log(id);
    let response = await fetch('/users/getMy',{method:"GET",headers:{'authorization':id}})
    let result = await response.json()
    if(result.uid && result.uid.length != 0){
      console.log('Authorized');
    }
    else{
      window.location.href = '/login.html'
    }
  }