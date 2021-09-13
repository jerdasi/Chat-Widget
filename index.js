let file; //variabel global untuk menangani file

toggleForm = () => {
    if (document.getElementById('myForm').style.display === "none") {
        document.getElementById('myForm').style.display = "flex";
    } else {
        document.getElementById('myForm').style.display = "none";
    }
}

const dropArea = document.querySelector(".drag-area")
const dragText = document.querySelector("header")
const button = document.querySelector(".btn-browse")
const input = document.querySelector(".input-browse")

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