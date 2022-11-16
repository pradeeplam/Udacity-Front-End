/**
 * 
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

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

function respondToTheClick(evt) {
    evt.preventDefault(); // You want to prvent the default of clicking on a link!!!!
    const sectionText = evt.target.textContent;
    const sectionId = "section" + sectionText.split(" ")[1];
    console.log(sectionId);
    // console.log("A paragraph was clicked.");
    // Modify to scroll down to section w/ animation!
    const sectionElement = document.getElementById(sectionId);
    
    sectionElement.scrollIntoView({
        behavior: "smooth",
        block: "start", 
        inline: "nearest"
    }); 

    toggleSections();
    //console.log(sectionElement);
}

const main = document.querySelector("main");

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
// build the nav


// Add new section via javascript
//<section id="section3" data-nav="Section 3">
//</section>
addNewSection(4);

const navbar_list = document.querySelector("#navbar__list");

const sections = document.querySelectorAll("section")

// Need to re-format to use append, appendChild, and innerHTML!
for (const sec of sections){
    const newItem = document.createElement("li");
    const textContent = sec.getAttribute("data-nav");
    newItem.innerHTML = `<a href="#" class="menu__link">${textContent}</a>`;
    newItem.addEventListener("click", respondToTheClick);
    navbar_list.appendChild(newItem);
}

function toggleSections(){
    for (const sec of sections){
        const rect = sec.getBoundingClientRect();

        if (rect.bottom > 0 && rect.bottom > rect.height/2){
            sec.classList.toggle("active-section", true);
        }
        else {
            sec.classList.toggle("active-section", false);
        }
    }
}

// Modify 'active-state' class to section when in view-port
// Add styling to nav-bar depending on active section - Should start w/ none(?)
// Reformat code
// Create README & Move notes to outside of project directory

// Scroll to anchor ID using scrollTO event


// If not at top of page and not scrolling
// hide navbar


const debounceScroll = (callback, waitTime) => {
    let timeoutId = null;

    return (...args) => { // Just is an event in this case!
        const navbar_menu = document.querySelector(".navbar__menu");
        navbar_menu.style.display = "block";
        
        // Figure out which section to highlight and turn-off all other sections!
        toggleSections()
 
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => callback(args), waitTime);
    }
}

const handleScroll = debounceScroll((evt) => { // function takes in event object
    const navbar_menu = document.querySelector(".navbar__menu");
    if(window.pageYOffset != 0){
        navbar_menu.style.display = "none";
    }
    else{
        navbar_menu.style.display = "block";
    }
}, 2000); // 2000 ms (2 sec)

document.addEventListener("scroll", handleScroll);



/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


