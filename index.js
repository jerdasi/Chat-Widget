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