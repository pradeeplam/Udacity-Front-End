
// Define Global Variables
const main = document.querySelector("main");

const navbar_list = document.querySelector("#navbar__list"); // Initially empty list

let activeNav = null; // Active navigation section

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

// Switch active__nav to target (If not null) and store active navbar item 
function updateActiveNav(target){
    if (activeNav != null){
        activeNav.classList.remove("active__nav");
    }

    if (target != null){
        target.classList.add("active__nav");
    }
    activeNav = target;
}

// Main code

// Add new section via javascript
addNewSection(4);

// Click-to-scroll functionality for navbar buttons (& update active navbar item)
function respondToTheClick(evt) {
    evt.preventDefault(); // Prevent the default of clicking on a link!

    updateActiveNav(evt.currentTarget); 

    const sectionText = evt.target.textContent;
    const sectionId = "section" + sectionText.split(" ")[1];
    const sectionElement = document.getElementById(sectionId);
    
    sectionElement.scrollIntoView({
        behavior: "smooth",
        block: "start", 
        inline: "nearest"
    }); 

}

// Create navbar
const sections = document.querySelectorAll("section");

const nameToNavbar = {}
for (const sec of sections){
    const newItem = document.createElement("li");
    const textContent = sec.getAttribute("data-nav");
    newItem.innerHTML = `<a href="#" class="menu__link">${textContent}</a>`;
    newItem.addEventListener("click", respondToTheClick);
    navbar_list.appendChild(newItem);
    nameToNavbar[textContent] = newItem;
}

const navHeight = document.querySelector(".navbar__menu").getBoundingClientRect().height;

// Find/Return active section element
function getActiveSection(){
    let retSec = null;
    for (const sec of sections){  // Ref isn't an issue as this can't be run until entire page finished
        const rect = sec.getBoundingClientRect();
        
        if (rect.bottom > navHeight && rect.bottom < navHeight + rect.height){
            retSec = sec;
        }
        else {
            sec.classList.toggle("active-section", false);
        }
    }

    return retSec;
}

// Handle scroll events
function handleScroll(evt){
    const activeSection = getActiveSection();
    
    if (activeSection != null){
        const rect = activeSection.getBoundingClientRect();
        activeSection.classList.add("active-section");
        const navId = activeSection.getAttribute("data-nav");
        const navElement = nameToNavbar[navId];
        updateActiveNav(navElement);
    }
    else {
        updateActiveNav(null);
    }
}

document.addEventListener("scroll", handleScroll);

// Time-out navbar after n seconds of inactivity
const debounceTimer = (callback, waitTime) => {
    let timeoutId = null;

    return (...args) => { // Just is an event in this case!
        const navbar_menu = document.querySelector(".navbar__menu");
        navbar_menu.style.display = "block";
 
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => callback(args), waitTime);
    }
}

// Time-out after 5 seconds of inactivity
// Will hide navbar if not at the top of page
// Show navbar at any activity
const resetTimer = debounceTimer((evt) => {
    const navbar_menu = document.querySelector(".navbar__menu");
    if(window.pageYOffset != 0){
        navbar_menu.style.display = "none";
    }
    else{
        navbar_menu.style.display = "block";
    }
}, 5000); // 5000 ms (5 sec)


// Activity = click, mousemove, or scroll
document.addEventListener("click", resetTimer);
document.addEventListener("mousemove", resetTimer);
document.addEventListener("scroll", resetTimer);