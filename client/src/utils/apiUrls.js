const backendDomin = "https://shopix-bd.onrender.com"

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
    allUserNoPage: {
        url: `${backendDomin}/api/user/allusersnopage`,
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
    updateUserOrderCount: {
        url: `${backendDomin}/api/user/updateUserOrderCount`,
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
    getSearchedProducts: {
        url: `${backendDomin}/api/product/getSearchedProducts`,
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
    },
    getReviews: {
        url: `${backendDomin}/api/productReview/getReviews`,
        method: 'get'
    },
    getReviewsById: {
        url: `${backendDomin}/api/productReview/getReviewsById`,
        method: 'get'
    },
    getReviewsByProduct: {
        url: `${backendDomin}/api/productReview/getReviewsByProduct`,
        method: 'get'
    },
    createReview: {
        url: `${backendDomin}/api/productReview/createReview`,
        method: 'post'
    },
    deleteReview: {
        url: `${backendDomin}/api/productReview/deleteReview`,
        method: 'delete'
    },
    updateReview: {
        url: `${backendDomin}/api/productReview/updateReview/`,
        method: 'put'
    },
    getMyList: {
        url: `${backendDomin}/api/list/getMyList`,
        method: 'get'
    },
    getMyListByUser: {
        url: `${backendDomin}/api/list/getMyListByUser`,
        method: 'get'
    },
    createMYListItem: {
        url: `${backendDomin}/api/list/createOneList`,
        method: 'post'
    },
    deleteMyListItem: {
        url: `${backendDomin}/api/list/deleteMyList/`,
        method: 'delete'
    },
    getOrders: {
        url: `${backendDomin}/api/order/getOrders`,
        method: 'get'
    },
    getOrdersLatest: {
        url: `${backendDomin}/api/order/getOrdersLatest`,
        method: 'get'
    },
    getOrdersByUser: {
        url: `${backendDomin}/api/order/getOrdersByUser`,
        method: 'get'
    },
    createOneOrder: {
        url: `${backendDomin}/api/order/createOneOrder`,
        method: 'post'
    },
    createOneOrderCash: {
        url: `${backendDomin}/api/order/createOneOrderCash`,
        method: 'post'
    },
    deleteOrder: {
        url: `${backendDomin}/api/order/deleteOrder/`,
        method: 'delete'
    },
    updateOrder: {
        url: `${backendDomin}/api/order/updateMyList/`,
        method: 'put'
    },
}


export default SummaryApi
