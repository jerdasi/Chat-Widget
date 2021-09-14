let file; //variabel global untuk menangani file
const dropArea = document.querySelector(".drag-area")
const dragText = document.querySelector("header")
const button = document.querySelector(".btn-browse")
const input = document.querySelector(".input-browse")

toggleFormUser = () => {
    if (document.getElementById('myForm').style.display === "none") {
        document.getElementById('myForm').style.display = "flex";
    } else {
        document.getElementById('myForm').style.display = "none";
    }
}

sendMessage = () => {
    let message = document.getElementById('msg').value 
    let time = moment().calendar();

    let html = `<div class="chat-buble p-0 mb-2 text-right">
        <span class="time-message text-left">${time}</span>
        <span class="text-buble">
            ${message}
        </span>
    </div>`

    document.querySelector('.chat-buble-container').innerHTML += html

    document.getElementById('msg').value = ""

    let elem = document.querySelector('.typing')
    elem.remove()
}

showTyping = () => {
    let html = `<div class="chat-buble p-0 mb-2 text-right typing">
    <span class="time-message text-left">${moment().calendar()}</span>
    <span class="text-buble">
        <span class="messages__dot"></span>
        <span class="messages__dot"></span>
        <span class="messages__dot"></span>
    </span>
    </div>`

    document.querySelector('.chat-buble-container').innerHTML += html
}

toggleFormAdmin = () => {
    if (document.querySelector('.container-admin').style.display === "none") {
        document.querySelector('.container-admin').style.display = "flex"
    } else {
        document.querySelector('.container-admin').style.display = "none";
    }
}

showAttach = () => {
    if (dropArea.style.display === "none") {
        document.querySelector('.chat-buble-container').style.display = "none"
        dropArea.style.display = "flex"
    } else {
        document.querySelector('.chat-buble-container').style.display = "block"
        dropArea.style.display = "none"
    }
    
}



button.onclick = () => {
    input.click()
}

input.addEventListener("change", function(){
    file = this.files[0];
    showFile()
    dropArea.classList.add("active")
})

dropArea.addEventListener("dragover", (event) => {
    event.preventDefault()
    dropArea.classList.add("active")
    dragText.textContent = "Release to Upload File"
})

dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active")
    dragText.textContent = "Drag & Drop to Upload File"
})

dropArea.addEventListener("drop", (event) => {
    event.preventDefault()
    file = event.dataTransfer.files[0]
    showFile()
})

let showFile = () => {
    let fileType = file.type

    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]
    if(validExtensions.includes(fileType)){
        let fileReader = new FileReader()
        fileReader.onload = () => {
            let fileURL = fileReader.result
            console.log(fileURL);
            let imgTag = `<img src="${fileURL}" alt="">`
            dropArea.innerHTML = imgTag
        }
        fileReader.readAsDataURL(file)
    } else {
        alert("This is not an Image File")
        dropArea.classList.remove("active")
    }
}