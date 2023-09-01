const allCategories = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();

    const catArray = data.data;
    const tabsContainer = document.getElementById("tabs-container");

    catArray.forEach(cat => {
        const div = document.createElement("div");

        div.classList.add("tabs", "tabs-boxed", "bg-gray-50", "text-center", "justify-center");
        div.innerHTML = `
            <a class="rounded-md bg-slate-400 py-1 px-4 active:bg-green-600 active:text-white text-black cursor-pointer" onclick="catCards(${cat?.category_id})">${cat?.category}</a>
        `;

        tabsContainer.appendChild(div);

        console.log();
    });
}

allCategories();

// cards by id
const catCards = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await response.json();

    const content = data.data;

    const cardsContainer = document.getElementById("cards-container");

    cardsContainer.textContent = "";

    content.forEach(element => {
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
        console.log(id, element);

        const div = document.createElement("div");
        div.classList.add("card", "bg-base-100", "rounded-md", "w-[300px]");
        div.innerHTML = `
            
                <div class="">
                    <div class="rounded-md">
                        <div class="rounded-md h-52 w-[300px]"><img class="rounded-md h-52 w-[300px]" src="${element.thumbnail}" alt="Shoes" />
                        </div>

                        <div class="bg-black text-white text-sm w-1/2 rounded-md relative py-1 text-center bottom-11 left-28 ${!timeOfPost && "hidden"}" id="time-id">
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
                            <p>${views}</p>
                        </div>
                    </div>
                </div>
            
        `;

        cardsContainer.appendChild(div);
    });
}

catCards(1000);


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