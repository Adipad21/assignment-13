const getCrafts = async() => {
    try{
        return (await fetch("api/crafts")).json();
    } catch(error){
        console.log("error retrieving data");
        return "";
    }
};

const showCrafts = async() => {
    const craftsJSON = await getCrafts();
    const craftsDiv = document.getElementById("crafts-div");

    if(craftsJSON == ""){
        craftsDiv.innerHTML = "Sorry, no crafts";
        return;
    }

    const columns = Array.from({ length: 4 }, () => {
        const col = document.createElement('div');
        col.className = 'craft-column'; // Use this class for styling the columns
        craftsDiv.appendChild(col);
        return col;
    });

    //now loop through the JSON 
    craftsJSON.forEach((craft,index) => {
        const section = document.createElement("section");
        section.classList.add("craft-list");
        craftsDiv.append(section);
        
        const img = document.createElement("img");
        img.src = "images/" + craft.image;
        section.append(img);

        section.onclick = () => {
            document.getElementById("dialog").style.display = "block";
            document.querySelector("#dialog-content #place img").src = img.src; 

            const detailsSection = document.getElementById("craft-details");
            detailsSection.innerHTML = "";

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

        columns[index % 4].appendChild(section);

    });
};


showCrafts();

document.getElementById("dialog-close").onclick = () => {
    document.getElementById("dialog").style.display = "none";
};

