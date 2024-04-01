const getCrafts = async() => {
    try {
        return (await fetch("api/crafts/")).json();
    } catch(error){
        console.log(error);
    }
};

const showCrafts = async() => {
    const crafts = await getCrafts();
    const craftsDiv = document.getElementById("crafts-div");

    if(crafts == ""){
        craftsDiv.innerHTML = "Sorry, no crafts";
        return;
    }

    crafts.forEach((craft)=>{
        const section = document.createElement("section");
        section.classList.add("class-list");
        craftsDiv.append(section);

        //make the whole section clickable
        /* const a = document.createElement("a");
        a.href="#";
        section.append(a);
 */
        const h3 = document.createElement("h3");
        h3.innerHTML = craft.name;
        a.append(h3);

        /* a.onclick = (e) => {
            e.preventDefault();
            displayDetails(craft);
        }; */
    });
};

const displayDetails = (craft) => {
    openDialog("craft-details");

    const craftDetails = document.getElementById("craft-details");
    craftDetails.innerHTML = "";

    const h2 = document.createElement("h2");
    h2.innerHTML = craft.name + ` <span id="edit">&#9998;</span>`;
    
    const p = document.createElement("p");
    p.innerHTML = craft.description;

    const h3 = document.createElement("h3");
    h3.innerHTML = "Supplies: ";

    const ul = document.createElement("ul");
    detailsSection.append(ul);

    craft.supplies.forEach((supply)=>{
    const li = document.createElement("li");
    li.innerHTML = supply;
    ul.append(li);
    });

    detailsSection.append(h2);
    detailsSection.appendChild(p);
    detailsSection.append(h3);
    detailsSection.append(ul);
};

const openDialog = (id) => {
    document.getElementById("dialog").style.display = "block";
    document.querySelectorAll("#dialog-details > *").forEach((item)=> {
        item.classList.add("hidden");
    });
    document.getElementById(id).classList.remove("hidden");
}

const showCraftForm = (e) => {
    e.preventDefault();
    resetForm();
    openDialog("add-craft-form");
}

const addIngredient = (e) => {
    e.preventDefault();
    const section = document.getElementById("ingredient-boxes");
    const input = document.createElement("input");
    input.type = "text";
    section.append(input);
}

const resetForm = () => {
    const form = document.getElementById("add-craft-form");
    form.reset();
    document.getElementById("ingredient-boxes").innerHTML = "";
    document.getElementById("img-prev").src="";
};

const addCraft = async(e)=> {
    e.preventDefault();
    const form = document.getElementById("add-craft-form");
    const formData = new FormData(form);
    formData.append("ingredients", getIngredients());
    console.log(...formData);

    const response = await fetch("/api/crafts", {
        method:"POST",
        body:formData
    });

    if(response.status != 200){
        console.log("error posting data");
    }

    await response.json();
    resetForm();
    document.getElementById("dialog").style.display = "none";
    showCrafts();

};

const getIngredients = () => {
    const inputs = document.querySelectorAll("#ingredient-boxes input");
    const ingredients = [];

    inputs.forEach((input)=>{
        ingredients.push(input.value);
    });

    return ingredients;
}


//on load
showCrafts();
/* document.getElementById("add-craft-form").onsubmit = addCraft;
document.getElementById("add-link").onclick = showCraftForm;
document.getElementById("add-ingredient").onclick = addIngredient;

document.getElementById("img").onchange = (e) => {
    const prev = document.getElementById("img-prev");

    //they didn't pick an image
    if(!e.target.files.length){
        prev.src = "";
        return;
    }

    prev.src = URL.createObjectURL(e.target.files.item(0));
} */