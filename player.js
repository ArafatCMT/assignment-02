const DefaultPlayers = () => {
    
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=Danny`)
    .then(res => res.json())
    .then(data => 
        // console.log(data.player)
        DefaultDisplayPlayers(data.player)
    );
};

const DefaultDisplayPlayers = (arr) => {
    // console.log(arr.length);
    const PlayerContainer = document.getElementById("player-container");

    const Container = document.createElement("div");
    Container.classList.add("CardSection");

    for(let i=0; i<10; i++){
        // console.log(arr[i]);
        
        const CardDiv = document.createElement("div");
        CardDiv.classList.add("card-container");
        const CardHeaderDiv = document.createElement("div");
        CardHeaderDiv.classList.add("header-container");
        const CardDesDiv = document.createElement("div");
        CardDesDiv.classList.add("description-container");
        const imgDiv = document.createElement("div");
        imgDiv.classList.add("img-section");

        imgDiv.innerHTML = `
            <img class="card-img" src="${arr[i].strThumb}"/>
        `;

        
        CardDesDiv.innerHTML = `
        <h6><b>Name</b>: ${arr[i].strPlayer.slice(0,15)}</h6>
        <h6><b>Country</b>: ${arr[i].strNationality}</h6>
        <h6><b>Team</b>: ${arr[i].strTeam}</h6>
        <h6><b>Sport</b>: ${arr[i].strSport}</h6>
            <div class="icon-bar">
            <h5><a href="${arr[i].strInstagram}"> <i class="fa-brands fa-instagram"></i> </a></h5>
            <h5><a href="${arr[i].strFacebook}"> <i class="fa-brands fa-facebook"></i> </a></h5>
            <h5><a href="${arr[i].strTwitter}"> <i class="fa-brands fa-twitter"></i> </a></h5>
            </div>
            <button id="Select-btn${i}" class="Select-btn card-btn" onclick="AddToTeam('${arr[i].strPlayer}','${arr[i].strNationality}', 'Select-btn${i}')">Select</button> <br>
            <button id="Details-btn${i}" class="Details-btn card-btn" onclick="PlayerDetails('${arr[i].strPlayer}','${arr[i].strNationality}','${arr[i].strGender}','${arr[i].strTeam}','${arr[i].strSport}', 'Details-btn${i}')">Details</button>
        `;
        
        CardHeaderDiv.appendChild(imgDiv);
        CardDiv.appendChild(CardHeaderDiv);
        CardDiv.appendChild(CardDesDiv);
        Container.appendChild(CardDiv);
        
    };
    PlayerContainer.appendChild(Container);
};

const SimilarInput = (players) => {
    const PlayerContainer = document.getElementById("player-container");
    PlayerContainer.innerHTML = `<h2 class="player-title">Players</h2>`;
    const Container = document.createElement("div");
    Container.classList.add("CardSection");
    for(let i=0; i<10; i++){
        // console.log(players[i]);
        const CardDiv = document.createElement("div");
        CardDiv.classList.add("card-container");
        const CardHeaderDiv = document.createElement("div");
        CardHeaderDiv.classList.add("header-container");
        const CardDesDiv = document.createElement("div");
        CardDesDiv.classList.add("description-container");
        const imgDiv = document.createElement("div");
        imgDiv.classList.add("img-section");

        imgDiv.innerHTML = `
            <img class="card-img" src="${players[i].strThumb}"/>
        `;

        CardDesDiv.innerHTML = `
            <h6><b>Name</b>: ${players[i].strPlayer.slice(0,15)}</h6>
            <h6><b>Country</b>: ${players[i].strNationality}</h6>
            <h6><b>Team</b>: ${players[i].strTeam}</h6>
            <h6><b>Sport</b>: ${players[i].strSport}</h6>
            <div class="icon-bar">
            <h5><a href="${players[i].strInstagram}"> <i class="fa-brands fa-instagram"></i> </a></h5>
            <h5><a href="${players[i].strFacebook}"> <i class="fa-brands fa-facebook"></i> </a></h5>
            <h5><a href="${players[i].strTwitter}"> <i class="fa-brands fa-twitter"></i> </a></h5>
            </div>
            <button id="Select-btn${i}" class="Select-btn card-btn" onclick="AddToTeam('${players[i].strPlayer}','${players[i].strNationality}', 'Select-btn${i}')">Select</button> <br>
            <button id="player-dets${i}" class="Details-btn card-btn" onclick="PlayerDetails('${players[i].strPlayer}','${players[i].strNationality}','${players[i].strGender}','${players[i].strTeam}','${players[i].strSport}','player-dets${i}')">Details</button>
        `;

        CardHeaderDiv.appendChild(imgDiv);
        CardDiv.appendChild(CardHeaderDiv);
        CardDiv.appendChild(CardDesDiv);
        Container.appendChild(CardDiv);
    };
    PlayerContainer.appendChild(Container);    
};


const AddToTeam = (name,nationality, btnId) => {
    const totalMember = document.getElementById("count").innerText;
    if(parseInt(totalMember) < 11){
        let count = parseInt(totalMember) + 1;
        document.getElementById("count").innerText = count;

        document.getElementById(btnId).innerText = "Selected";
        
        const MyTeam = document.getElementById("group-container");

        const div = document.createElement("div");
        div.classList.add("player-bio");

        div.innerHTML = `
        <h5>Name: ${name}</h5>
        <h5>Nationality: ${nationality}</h5>
        `;

        MyTeam.appendChild(div);
        document.getElementById(btnId).disabled = true;
        document.getElementById(btnId).style.background = "gray";
    }
    else{
        alert("You Cannot Selected More Then 11 Players.");
    }
};

const PlayerDetails = (name, country, gender, team, sprot, btnId, des) => {
    
    const myModal = new bootstrap.Modal(`#booking-modal`);
    myModal.show();

    document.getElementById("modal-title").innerText = `Name: ${name}`;
    document.getElementById("country").innerText = `Country: ${country}`;
    document.getElementById("team").innerText = `Team: ${team}`;
    document.getElementById("gender").innerText = `Gender: ${gender}`;
    document.getElementById("sport").innerText = `sport: ${sprot}`;
    document.getElementById("des").innerText = `Description: ${name} commonly known as Danny, is a Portuguese former professional footballer who played as an attacking midfielder.`;
}

const searchButton = () => {
    document.getElementById("search-btn").addEventListener("click", (event) => {
        // console.log(continuer);
        const PlayerContainer = document.getElementById("player-container");
        PlayerContainer.innerHTML = "";
        const InputValue = document.getElementById("search-bar").value;
        // console.log("input : ", InputValue);
        // console.log("Hello Brother!");
        fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${InputValue}`)
        .then(res => res.json())
        .then(data => 
            // console.log(data)
            SimilarInput(data.player)
        );
        document.getElementById("search-bar").value = "";
    });
};

// const DisplayPlayers = () =>

DefaultPlayers();
searchButton();