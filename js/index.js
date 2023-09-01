const allCategories = async() => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();

    console.log("test", data.data);
}

allCategories();




// navigate to blog
const navigateBlog = () => window.location.href = "blog.html";