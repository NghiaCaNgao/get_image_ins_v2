var main_image = document.querySelector(".main-image a");
var gallery = document.querySelectorAll(".see-more .col");

async function loadData() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({
            active: true,
            currentWindow: true,
            url: ["https://www.instagram.com/*"]
        }, function(tabs) {
            if (tabs.length > 0) {
                chrome.tabs.sendMessage(tabs[0].id, { cmd: "get_image" }, function(response) {
                    if (response.url) {
                        let decodeData = JSON.parse(response.url);
                        if (decodeData.length > 0)
                            resolve(decodeData);
                        else resolve([{
                            src: "/assets/images/noImage/404.jpg",
                            type: "img"
                        }]);
                    } else resolve([{
                        src: "/assets/images/noImage/404.jpg",
                        type: "img"
                    }]);
                });
            } else resolve([{
                src: "/assets/images/noImage/404.jpg",
                type: "img"
            }]);
        });
    });
}

function fillImage(list) {
    list.forEach((element, index) => {
        let link = document.createElement("a");
        link.href = element.src;
        link.target = "_blank";
        link.download = "";
        if (element.type == "img")
            link.innerHTML = `<img src = ${element.src} width = "100%" loading = "lazy"><span class = "img">image</span>`;
        else if (element.type == "vid")
            link.innerHTML = `<video src = ${element.src} width = "100%" loading = "lazy"></video><span class = "vid">video</span>`;
        gallery[index % 3].appendChild(link);
    });
}

async function setImage() {
    main_image.firstElementChild.src = "/assets/images/loading/loading.gif"
    let links = await loadData();
    main_image.href = links[0].src;
    main_image.firstElementChild.src = links[0].src;
    fillImage(links);
}

setImage();