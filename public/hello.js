const getCrafts = async () => {
    try {
        return (await fetch("api/crafts")).json();
    } catch (error) {
        console.log("error retrieving data");
        return "";
    }
};

const showCrafts = async () => {
    const craftsJSON = await getCrafts();
    const craftsDiv = document.getElementById("crafts-div");

    if (craftsJSON == "") {
        craftsDiv.innerHTML = "Sorry, no crafts";
        return;
    }

    const columns = Array.from({ length: 4 }, () => {
        const col = document.createElement("div");
        craftsDiv.appendChild(col);
        return col;
    });

    craftsJSON.forEach((craft, index) => {
        const section = document.createElement("section");
        section.classList.add("craft-list");

        const img = document.createElement("img");
        img.src = "images/" + craft.image;
        section.append(img);

        section.onclick = () => {
            const detailsSection = document.getElementById("craft-details");
            detailsSection.innerHTML = "";

            const imgSection = document.getElementById("place");
            imgSection.innerHTML = "";

            const img = document.createElement("img");
            img.src = "images/" + craft.image;

            const h2 = document.createElement("h2");
            h2.innerHTML = craft.name + ` <a href="#" id="edit">&#9998;</a>`;

            const p = document.createElement("p");
            p.innerHTML = craft.description;

            const h3 = document.createElement("h3");
            h3.innerHTML = "Supplies: ";

            const ul = document.createElement("ul");
            craft.supplies.forEach((supply) => {
                const li = document.createElement("li");
                li.innerHTML = supply;
                ul.append(li);
            });
            openDialog("dialog-content");
            imgSection.append(img);
            detailsSection.append(h2);
            detailsSection.appendChild(p);
            detailsSection.append(h3);
            detailsSection.append(ul);
        };

        columns[index % 4].appendChild(section);
    });
};

const openDialog = (id) => {
    document.getElementById("dialog").style.display = "block";
    document.querySelectorAll("#dialog-details > *").forEach((item) => {
        item.classList.add("hidden");
    });
    document.getElementById(id).classList.remove("hidden");
}

const showCraftForm = () => {
    document.getElementById("add-link").onclick = (e) => {
        e.preventDefault();
        resetForm();
        openDialog("form");
    };
};

const addSupply = (e) => {
    e.preventDefault();
    const section = document.getElementById("supply-boxes");
    const input = document.createElement("input");
    input.classList.add("box");
    input.type = "text";
    section.appendChild(input);
};

const resetForm = () => {
    const form = document.getElementById("add-craft-form");
    form.reset();
    document.getElementById("supply-boxes").innerHTML = "";
    document.getElementById("img-prev").src = "";
};
 
const addCraft = async (e) => {
    e.preventDefault();
    const form = document.getElementById("add-craft-form");
    const formData = new FormData(form);
    formData.append("supplies", getSupplies());
    console.log(...formData);

    const response = await fetch("/api/crafts", {
        method: "POST",
        body: formData
    });

    if (response.status != 200) {
        console.log("error posting data");
    } else {
        await response.json();
        document.getElementById("crafts-div").innerHTML = ""; 
        resetForm();
        document.getElementById("dialog").style.display = "none";
        showCrafts();
    }
};

const getSupplies = () => {
    const inputs = document.querySelectorAll("#supply-boxes input");
    const supplies = [];
    inputs.forEach((input) => {
        supplies.push(input.value);
    });
    return supplies;
};

//on load
showCrafts();
document.getElementById("dialog-close").onclick = () => {
    document.getElementById("dialog").style.display = "none";
};
document.getElementById("add-craft-form").onsubmit = addCraft;

document.getElementById("add-supply").onclick = addSupply;

document.getElementById("image").onchange = (e) => {
    const prev = document.getElementById("img-prev");

    //they didn't pick an image
    if(!e.target.files.length){
        prev.src = "";
        return;
    }

    prev.src = URL.createObjectURL(e.target.files.item(0));
}
// Initialize the form display
showCraftForm();
document.getElementById("add-craft-form").onsubmit = addCraft;
document.getElementById("cancel").onclick = resetForm; 
