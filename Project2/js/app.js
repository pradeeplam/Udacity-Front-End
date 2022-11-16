/*
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

// Define Global Variables
const main = document.querySelector("main");

const navbar_list = document.querySelector("#navbar__list");

// Helper functions

// Add new section with specified section ID
function addNewSection(section_id){
    const newSection = document.createElement("section");
    newSection.id = "section" + section_id
    newSection.setAttribute("data-nav", "Section " + section_id)
    newSection.innerHTML = `
    <div class="landing__container">
        <h2>Section ${section_id}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
        <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
    </div>`;
    main.appendChild(newSection);
}

// Label active section with "active-section" class and remove active section when not active
function changeActive(){
    for (const sec of sections){  // Ref isn't an issue as this can't be run until entire page finished
        const rect = sec.getBoundingClientRect();

        if (rect.top >= 0 && rect.top <= rect.height){
            sec.classList.add("active-section");
        }
        else {
            sec.classList.toggle("active-section", false);
        }
    }
}

// Add new section via javascript
addNewSection(4);

// Click-to-scroll functionality to nav-bar buttons and trigger active-section update
function respondToTheClick(evt) {
    evt.preventDefault(); // You want to prvent the default of clicking on a link!!!!
    const sectionText = evt.target.textContent;
    const sectionId = "section" + sectionText.split(" ")[1];
    const sectionElement = document.getElementById(sectionId);
    
    sectionElement.scrollIntoView({
        behavior: "smooth",
        block: "start", 
        inline: "nearest"
    }); 

    changeActive(); // Place/remove "active-section" class 
}

// Create nav-bar
const sections = document.querySelectorAll("section");

for (const sec of sections){
    const newItem = document.createElement("li");
    const textContent = sec.getAttribute("data-nav");
    newItem.innerHTML = `<a href="#" class="menu__link">${textContent}</a>`;
    newItem.addEventListener("click", respondToTheClick);
    navbar_list.appendChild(newItem);
}

// Time-out nav-bar after n seconds of inactivity and trigger active-section update
const debounceScroll = (callback, waitTime) => {
    let timeoutId = null;

    return (...args) => { // Just is an event in this case!
        const navbar_menu = document.querySelector(".navbar__menu");
        navbar_menu.style.display = "block";
        
        changeActive() // Place/remove "active-section" class
 
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => callback(args), waitTime);
    }
}

// Handle waiting for n seconds between scroll
const handleScroll = debounceScroll((evt) => { // Function takes in event object
    const navbar_menu = document.querySelector(".navbar__menu");
    if(window.pageYOffset != 0){
        navbar_menu.style.display = "none";
    }
    else{
        navbar_menu.style.display = "block";
    }
}, 2000); // 2000 ms (2 sec)

document.addEventListener("scroll", handleScroll);