const categoryContainer = document.getElementById('category-container');

const loadCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const dataArr = data.data;
    dataArr.forEach(data => {
        const { category_id, category } = data;
        const button = document.createElement('button');
        button.classList = `btn text-lg font-semibold rounded-md`;
        button.innerText = category;
        categoryContainer.appendChild(button);
        button.addEventListener('click', () => {
            handleCategory(category_id);
        });
    });
};


const cardContainer = document.getElementById('card-container');
let verifiedIcon = [];
const handleCategory = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    const videos = data.data;
    cardContainer.textContent = '';
    videos.forEach(video => {
        let verified = '';
        if (video.authors[0].verified) {
            verified = `<img src="images/verified.png" alt="">`;
        }
        console.log(video.authors[0].verified);
        const div = document.createElement('div');
        div.classList = `card card-compact bg-base-100 shadow-md rounded-lg`;
        div.innerHTML = `
        <figure class="rounded-b-lg">
            <img class="w-full h-[200px]" src="${video.thumbnail}" />
        </figure>
        <div class="card-body flex-row">
            <div class="avatar">
                <div class="w-16 h-16 rounded-full">
                    <img src="${video?.authors[0]?.profile_picture}" />
                </div>
            </div>
            <div class="flex-1 space-y-2">
                <h2 class="card-title font-bold">${video.title}</h2>
                <div class="flex items-center gap-2">
                    <span>${video?.authors[0]?.profile_name}</span>
                    <span>${verified}</span>
                </div>
                <p><span>${video?.others?.views}</span> view</p>
            </div>
        </div>
        `;
        cardContainer.appendChild(div);
    });
};
loadCategory()
