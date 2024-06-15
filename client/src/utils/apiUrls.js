const backendDomin = "http://localhost:5000"

const SummaryApi = {
    signUP: {
        url: `${backendDomin}/api/user/signup`,
        method: "POST"
    },
    signIn: {
        url: `${backendDomin}/api/user/login`,
        method: "POST"
    },
    UserDetails: {
        url: `${backendDomin}/api/user/userdetails`,
        method: "POST"
    },
    logout: {
        url: `${backendDomin}/api/user/logout`,
        method: 'POST'
    },
    changeRole: {
        url: `${backendDomin}/api/user/changerole`,
        method: 'POST'
    },
    allUser: {
        url: `${backendDomin}/api/user/allusers`,
        method: 'GET'
    },
    deleteUser: {
        url: `${backendDomin}/api/user/deleteuser`,
        method: 'POST'
    },
    updateUser: {
        url: `${backendDomin}/api/user/updateuser`,
        method: "POST"
    },
    uploadProduct: {
        url: `${backendDomin}/api/product/addproduct`,
        method: 'POST'
    },
    allProducts: {
        url: `${backendDomin}/api/product/getallproducts`,
        method: 'GET'
    },
    ProductById: {
        url: `${backendDomin}/api/product/getallproductsbyid/`,
        method: 'GET'
    },
    brands: {
        url: `${backendDomin}/api/product/getcategorylist`,
        method: 'GET'
    },
    allLatestProducts: {
        url: `${backendDomin}/api/product/getLatestproducts`,
        method: 'GET'
    },
    featuredProducts: {
        url: `${backendDomin}/api/product/getFeaturedproducts`,
        method: 'GET'
    },
    allProductsLess: {
        url: `${backendDomin}/api/product/getallproductsless`,
        method: 'GET'
    },
    updateProduct: {
        url: `${backendDomin}/api/product/updateProduct`,
        method: 'POST'
    },
    deleteProduct: {
        url: `${backendDomin}/api/product/deleteproduct`,
        method: 'POST'
    },
    catProduct: {
        url: `${backendDomin}/api/product/getcatproduct/`,
        method: 'POST'
    },
    catProductPage: {
        url: `${backendDomin}/api/product/getcatproductpage`,
        method: 'POST'
    },
    subCatProductPage: {
        url: `${backendDomin}/api/product/getSubcatproductpage`,
        method: 'POST'
    },
    categoryWiseProduct: {
        url: `${backendDomin}/api/product/getcategorylist`,
        method: 'POST'
    },
    categoryProduct: {
        url: `${backendDomin}/api/product/getCategoryProduct/`,
        method: 'POST'
    },
    productDetails: {
        url: `${backendDomin}/api/product/getproductdetails`,
        method: 'POST'
    },
    addCategory: {
        url: `${backendDomin}/api/category/addcategory`,
        method: 'post'
    },
    getCategories: {
        url: `${backendDomin}/api/category/getcategories`,
        method: 'get'
    },
    getAllCategories: {
        url: `${backendDomin}/api/category/getAllCategories`,
        method: 'get'
    },
    getCategory: {
        url: `${backendDomin}/api/category/`,
        method: 'get'
    },
    deleteCategory: {
        url: `${backendDomin}/api/category/delete/`,
        method: 'get'
    },
    updateCategory: {
        url: `${backendDomin}/api/category/update/`,
        method: 'put'
    },
    getcartList: {
        url: `${backendDomin}/api/cart/getCartList`,
        method: 'get'
    },
    addToCartProduct: {
        url: `${backendDomin}/api/cart/createCartList`,
        method: 'post'
    },
    updateCartProduct: {
        url: `${backendDomin}/api/cart/updateCartList/`,
        method: 'put'
    },
    deleteCartProduct: {
        url: `${backendDomin}/api/cart/deleteCartList`,
        method: 'delete'
    },
    addToCartProductView: {
        url: `${backendDomin}/api/view-card-product`,
        method: 'get'
    },
    searchProduct: {
        url: `${backendDomin}/api/search`,
        method: 'get'
    },
    filterProduct: {
        url: `${backendDomin}/api/product/filterproduct`,
        method: 'get'
    },
    getallsubcategoriess: {
        url: `${backendDomin}/api/subcategory/getsubcategories`,
        method: 'get'
    },
    getsubcategories: {
        url: `${backendDomin}/api/subcategory/getsubcategoriesby/`,
        method: 'post'
    },
    getsubcategoriespage: {
        url: `${backendDomin}/api/subcategory/getsubcategoriespage/`,
        method: 'get'
    },
    deletesubcategories: {
        url: `${backendDomin}/api/subcategory/deletesubcategory/`,
        method: 'delete'
    },
    updatesubcategories: {
        url: `${backendDomin}/api/subcategory/updatesubcategory/`,
        method: 'put'
    },
    addsubcategories: {
        url: `${backendDomin}/api/subcategory/addSubCategories/`,
        method: 'post'
    },
    subcategoriesbyname: {
        url: `${backendDomin}/api/subcategory/getsubcategories`,
        method: 'get'
    }
}


export default SummaryApi