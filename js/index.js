//a global variable
var apiId = 1000;

// cards by id
const catCards = async (id) => {
    apiId = id;
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await response.json();

    const content = data.data;

    const cardsContainer = document.getElementById("cards-container");

    cardsContainer.textContent = "";

    // not found show
    const notFoundContainer = document.getElementById("not-found");

    if (content.length <= 0) {
        notFoundContainer.classList.remove("hidden");
    } else {
        notFoundContainer.classList.add("hidden");
    }


    // card loop
    content.forEach(element => {
        const div = getCardTemplate(element)
        cardsContainer.appendChild(div);
    });
}

// categories
const allCategories = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();

    const catArray = data.data;
    const tabsContainer = document.getElementById("tabs-container");

    catArray.forEach(cat => {
        const div = document.createElement("div");

        div.classList.add("tabs", "tabs-boxed", "bg-gray-50", "text-center", "justify-center");
        div.innerHTML = `
            <button class="rounded-md bg-slate-400 py-1 px-4  focus:bg-green-600 focus:text-white text-black cursor-pointer" onclick="catCards(${cat?.category_id})">${cat?.category}</button>
        `;

        tabsContainer.appendChild(div);
    });

    await catCards(catArray[0].category_id);
}

// all cards
const getCardTemplate = (element) => {
    const arrAuthor = element.authors;
    const postTime = element?.others?.posted_date;
    const views = element?.others?.views;

    // convert post time in hr min
    const timeOfPost = timeConvert(postTime);



    //author info
    const cont = () => {
        for (ar of arrAuthor) {
            return ar;
        }
    }

    const author = cont();
    const verified = author?.verified;

    const div = document.createElement("div");
    div.classList.add("card", "bg-base-100", "rounded-md", "w-[300px]");
    div.innerHTML = `
            
<div class="relative">
    <div class="rounded-md">
        <div class="rounded-md h-52 w-[300px]"><img class="rounded-md h-52 w-[300px]" src="${element.thumbnail}" alt="Shoes" />
        </div>

        <div class="bg-black text-white text-sm w-1/2 rounded-md absolute py-1 text-center top-40 left-32 ${!timeOfPost && "hidden"}" id="time-id">
            <p>${timeOfPost}</p>
        </div>
    </div>
</div>
<div class="card-body p-5">
    <div class="flex gap-4">
        <!-- channel logo -->
        <div class="aspect-square h-[50px] w-[50-px] rounded-[50%]">
            <img class="h-[50px] w-[50-px] aspect-square rounded-[50%]" src="${author?.profile_picture}" alt="pp">
        </div>

        <div>
            <h4 class="text-lg font-semibold">${element?.title}</h4>
            <div class="flex gap-1">
                <p>${author?.profile_name}</p>
                <img class="h-6 w-6 ${!verified && "hidden"}" id="verified-img" src="./images/verified.png" alt="">
            </div>
            <p class="views">${views}</p>
        </div>
    </div>
</div>

`;
    return div
}

// sec to hr and min
const timeConvert = (sec, timeOfPost) => {
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);

    let result = '';

    if (hours > 0) {
        result += `${hours}hr `;
    }

    if (minutes > 0) {
        result += `${minutes} min ago`;
    }

    if (result === '') {
        result = false;
    }

    return result;
}

// navigate to blog
const navigateBlog = () => window.location.href = "blog.html";

// sort functionality

//a global variable
let sortByDescending = false;

// Convert views from "K" format to numbers
function convertViewsToNumber(viewsText) {
    const numPart = parseFloat(viewsText);
    const multiplier = viewsText.includes('K') ? 1000 : 1;
    return numPart * multiplier;
}

// Sort the content by views
const sortByViews = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${apiId}`);
    const data = await response.json();
    const content = data.data;

    const cardsContainer = document.getElementById("cards-container");


    content.sort((a, b) => {
        const viewsA = convertViewsToNumber(a.others?.views);
        const viewsB = convertViewsToNumber(b.others?.views);

        return viewsB - viewsA; //descending order
    });

    // Clear content
    cardsContainer.innerHTML = "";


    // Append the sorted content
    // card loop
    content.forEach(element => {
        const div = getCardTemplate(element)
        cardsContainer.appendChild(div);
    });

    // Toggle sort order
    sortByDescending = !sortByDescending;
};

allCategories();