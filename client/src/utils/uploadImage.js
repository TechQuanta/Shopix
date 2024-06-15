
const url = `https://api.cloudinary.com/v1_1/dzdp6cm4i/image/upload`

const uploadImage = async (image) => {
    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset", "Shopix")


    const dataResponse = await fetch(url, {
        method: "post",
        body: formData
    })

    return dataResponse.json()

}

export default uploadImage 