chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // console.log(request);
        // console.log(getLink());
        if (request.cmd == "get_image") sendResponse({ url: getLink() });
    });

function getLink() {
    let item1 = document.querySelectorAll("article ._97aPb img"); //Anh article
    let item2 = document.querySelectorAll("article ._97aPb video"); //video article
    let item3 = document.querySelectorAll(".qbCDp video source"); //video story
    let item4 = document.querySelectorAll(".qbCDp img"); //Anh story
    let item5 = document.querySelectorAll(".eLAPa img"); //Anh trong profile
    let item6 = document.querySelectorAll(".eLAPa video"); //video trong profile

    let url1 = [...item4, ...item1, ...item5].map(item => {
        return {
            src: item.src,
            type: "img"
        }
    });
    let url2 = [...item3, ...item2, ...item6].map(item => {
        return {
            src: item.src,
            type: "vid"
        }
    });

    let url = url1.concat(url2);
    return JSON.stringify(url);
}