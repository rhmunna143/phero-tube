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


        const div = document.createElement("div");
        div.innerHTML = `
            <div class="card bg-base-100 rounded-md p-5">
                <div class="">
                    <div class="max-h-[200px] rounded-md ">
                        <div class="rounded-md"><img class="rounded-md" src="./images/Rectangle 1.png" alt="Shoes" />
                        </div>

                        <div class="bg-black text-white text-sm w-1/2 rounded-md relative px-4 py-1 text-center bottom-11 left-28">
                            <p>30hr 50min ago</p>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="flex mt-4 gap-4">
                        <!-- channel logo -->
                        <div class="aspect-square rounded-full">
                            <img src="" alt="pp">
                        </div>

                        <div>
                            <h4 class="text-lg font-semibold">title</h4>
                            <div class="flex gap-2">
                                <p>author</p>
                                <img class="h-6 w-6 hidden" id="verified" src="./images/verified.png" alt="">
                            </div>
                            <p>views</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        cardsContainer.appendChild(div);

        console.log(views);

    });
}




// navigate to blog
const navigateBlog = () => window.location.href = "blog.html";