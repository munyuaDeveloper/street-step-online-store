const fetchCategoryProducts = async(category) => {
    const res = await fetch('/api/category-product', {
        headers: {
            'content-type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({
            category: category
        })
    })

    const data = await res.json()

    return data;
}

export default fetchCategoryProducts