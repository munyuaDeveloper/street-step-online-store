const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`

const uploadImage  = async(image: File) => {
    const formData = new FormData()
    formData.append("file",image)
    formData.append("upload_preset",import.meta.env.VITE_REACT_APP_CLOUDINARY_UPLOAD_PRESET)
    

    const dataResponse = await fetch(url,{
        method : "post",
        body : formData
    })

    return dataResponse.json()

}

export default uploadImage 