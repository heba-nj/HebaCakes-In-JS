// Check If There's Local Storage Color Option 
let mainColor = localStorage.getItem("color-option");
if (mainColor !== null) {
    document.documentElement.style.setProperty('--main-color',mainColor);
    // Remove Active Class From All Colors List Items
    document.querySelectorAll(".color-list li").forEach(element => {
        element.classList.remove("active");
        // Add Active Class On Element With Data-Color === Local Storage Item 
        if (element.dataset.color ===  mainColor) {
            // Add Active Class 
            element.classList.add("active");
        }
    });
}


// Random Background Option 
let backgroundOption = true;
// Variable To Control The background Interval
let backgroundInterval;
// Check If There's Local Storage Random Background Item 
let backgroundLocalItem = localStorage.getItem("background_option");
// Check If Random Background Local Storage Is Not Empty
if (backgroundLocalItem !== null) {
    if (backgroundLocalItem === 'true') {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }
    // Remove Active Class From All Spans 
    document.querySelectorAll(".random-sett span").forEach ( element => {
        element.classList.remove("active");
    });
    if (backgroundLocalItem === 'true') {
        document.querySelector(".random-sett .yes").classList.add("active");
    } else {
        document.querySelector(".random-sett .no").classList.add("active");
    }
}

// Toggle Spin Class On Icon 
document.querySelector(".toggle .fa-gear").onclick = function () {
    // Toggle Class Fa-Spin For Rotation On Self
    this.classList.toggle("fa-spin");

    // Toggle Class Open On Main Settings Box 
    document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors
const colorLi = document.querySelectorAll(".color-list li");
// Loop On All List Items
colorLi.forEach(li => {
    // Click On Every List Items
    li.addEventListener("click",(e) => {
        // Set Colors On Root
        document.documentElement.style.setProperty('--main-color',e.target.dataset.color);
        // Set Colors In Local Storage
        localStorage.setItem("color-option",e.target.dataset.color);
        handleActive(e);
    });
});

// Switch Random Background Option
const randomBackel = document.querySelectorAll(".random-sett span");
// Loop On All Spans
randomBackel.forEach(span => {
    // Click On Every Spans
    span.addEventListener("click",(e) => {
        handleActive(e);
        if (e.target.dataset.background === 'yes') {
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option",true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option",false);
        }
    });
});

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array Of Imgs 
let imgArray = ["cake1.jpg","cake2.jpg","cake3.jpg","cake4.jpg","cake5.jpg"];

// Function To Randomize Imgs
function randomizeImgs() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            // Get Random Number
            let randomNumber = Math.floor(Math.random() * imgArray.length);
            
            // Change Background Image Url 
            landingPage.style.backgroundImage = 'url("imgs/' +  imgArray[randomNumber] + '")';
        }, 1000);
    }
}
randomizeImgs();

// Select Menu Selector 
let ourMenu = document.querySelector(".menu");
window.onscroll = function () {
    // Menu Offset Top 
    let menuOfsetTop = ourMenu.offsetTop;
    // Menu Outer Height 
    let menuOuterHeight = ourMenu.offsetHeight;
    // Window Height
    let windowHeight = this.innerHeight;
    // Window ScrollTop
    let windowScrollTop = this.scrollY;
    if (windowScrollTop < (menuOfsetTop + menuOuterHeight - windowHeight)) {
        let allMenu = document.querySelectorAll(".menu-box .b span");
        allMenu.forEach(menu => {
            menu.style.width = menu.dataset.progress;
        });
    }
};

// Create Popup With The Image 
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img => {
    img.addEventListener('click',(e) => {
        // Create Overlay Element
        let overlay = document.createElement("div");
        // Add Class To Overlay
        overlay.className = 'popup-overlay';
        // Append Overlay To The Body
        document.body.appendChild(overlay);
        // Create The Popup Box 
        let popupBox = document.createElement("div");
        // Add Class To The Popup Box
        if (img.alt !== null) { // Placed Here For Alt  
            // Create Heading 
            let imgHeading = document.createElement("h3");
            // Create Text For Heading 
            let imgText = document.createTextNode(img.alt);
            // Append The Text To The Heading 
            imgHeading.appendChild(imgText);
            // Append The Heading To The Popup Box
            popupBox.appendChild(imgHeading);
        }
        popupBox.className = 'popup-box';
        // Create The Image
        let popupImage = document.createElement("img");
        // Set Image Source
        popupImage.src = img.src;
        // Add Image To Popup Box
        popupBox.appendChild(popupImage);
        // Append The Popup Box To Body
        document.body.appendChild(popupBox);
        // Create The Close Span
        let closeButton = document.createElement("span");
        // Create The Button Close Text
        let closeText = document.createTextNode("X");
        // Append Text To Close Button 
        closeButton.appendChild(closeText);
        // Add Class To Close Button
        closeButton.className = 'close-button';
        // Add Class Button To The Popup Box
        popupBox.appendChild(closeButton);
    });
});
// Close Popup 
document.addEventListener("click",function (e) {
    if (e.target.className == 'close-button') {   
        // Remove The Current Popup 
        e.target.parentNode.remove();
        // Remove Overlay
        document.querySelector(".popup-overlay").remove();
    }
});

// Handle Active State
function handleActive(ev) {
    // Remove Active Class From All Childrens
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    // Add Active Class On Self
    ev.target.classList.add("active");
}

let bulletSpan = document.querySelectorAll(".bullet span");
let bulletcontainer = document.querySelector(".nav-bullets");
let bulletLocal = localStorage.getItem("bullets-item");
if (bulletLocal !== null) {
    bulletSpan.forEach(span => {
        span.classList.remove("active");
    });
    if (bulletLocal === 'block') {
        bulletcontainer.style.display = 'block';
        document.querySelector(".bullet .yes").classList.add("active");
    } else {
        bulletcontainer.style.display = 'none';
        document.querySelector(".bullet .no").classList.add("active");
    }
}

bulletSpan.forEach(span => {
    span.addEventListener("click",(e) => {
        if (span.dataset.display === 'show') {
            bulletcontainer.style.display = 'block';
            localStorage.setItem("bullets-item","block");
        } else {
            bulletcontainer.style.display = 'none';
            localStorage.setItem("bullets-item","none");
        }
        handleActive(e);
    });
});

// Reset Button 
document.querySelector(".reset-options").onclick = function () {
    localStorage.clear();

    // Relod Window
    window.location.reload();
}

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
    // Stop Propagation 
    e.stopPropagation();
    // Toggle Class "menu-active" On Button
    this.classList.toggle("menu-active");
    // Toggle Class "open" On Links 
    tLinks.classList.toggle("open");
}

// Click Anywhere Outside Menu And Toggle Button 
document.addEventListener("click",(e) => {
    if (e.target!== toggleBtn && e.target!== tLinks) {
        // Check If Menu Is Open 
        if (tLinks.classList.contains("open")) {
            // Toggle Class "menu-active" On Button
            toggleBtn.classList.toggle("menu-active");
            // Toggle Class "open" On Links 
            tLinks.classList.toggle("open");
        }
    }
});
// Stop Propagation On Menu
tLinks.onclick = function (e) {
    e.stopPropagation();
}



// For Me
let span = document.querySelector(".up");
window.onscroll = function() {
    if (this.scrollY > 0) {
        span.classList.add("show");
    } else {
        span.classList.remove("show");
    }
}
span.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};