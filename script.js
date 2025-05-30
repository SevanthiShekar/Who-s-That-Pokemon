function capitalize(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function fetchPokemon()
{
    try
    {
        const pokemonName = document.getElementById("pokemonName").value.trim().toLowerCase();
        if(pokemonName == "")
        {
            throw new Error("Enter a pokemon!");
        }
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if(!response.ok)
        {
            throw new Error("Can't fetch that pokemon!");
        }
        const data = await response.json();
        displayImages(data);
        extractData(data);
    }
    catch(error)
    {
        console.log(error);
        displayError(pokemonName.value);
    }
}

function displayImages(data)
{
    const pokeCard = document.getElementById("display");
    pokeCard.classList.remove("error");
    const image1 = document.getElementById("pokemonSprite1");
    const image2 = document.getElementById("pokemonSprite2");
    const url1 = data.sprites.other.showdown.front_shiny;
    const url2 = data.sprites.other.showdown.back_shiny;
    image1.src = "";
    image1.src = url1;
    image2.src = url2;
    image1.style.display = "block";
    image2.style.display = "block";
    image1.classList.add("front-image");
    image2.classList.add("back-image");
}

function extractData(data)
{
    //BASIC INFO
    let name, height, weight, types=[];
    name = data.name;
    height = data.height;
    weight = data.weight;
    const[type1, type2] = [...data.types];
    types.push(type1.type.name);
    if(type2 == undefined)
    {
        types.push(type2);
        types.pop();
    }
    else
    {
        types.push(type2.type.name);
    }

    //ABILITIES
    let abilities = [];
    const[ability1, ability2] = [...data.abilities];
    abilities.push(ability1.ability.name);
    if(ability2 == undefined)
    {
        abilities.push(ability2);
        abilities.pop();
    }
    else
    {
        abilities.push(ability2.ability.name);
    }

    //MOVES
    let moves = [];
    const[move1,move2,move3,move4,move5] = [...data.moves];
    moves.push(move1.move.name);
    moves.push(move2.move.name);
    moves.push(move3.move.name);
    moves.push(move4.move.name);
    moves.push(move5.move.name);

    //STATS
    let stats = [];
    let statsValue = [];
    const[stat1,stat2,stat3,stat4,stat5] = [...data.stats];
    stats.push(stat1.stat.name)
    statsValue.push(stat1.base_stat);
    stats.push(stat2.stat.name)
    statsValue.push(stat2.base_stat);
    stats.push(stat3.stat.name)
    statsValue.push(stat3.base_stat);
    stats.push(stat4.stat.name)
    statsValue.push(stat4.base_stat);
    stats.push(stat5.stat.name)
    statsValue.push(stat5.base_stat);

    const bgImg = displayBackground(types);
    const color = displayBorder(types);
    displayPokemon(name, height, weight, types, abilities, moves, stats, statsValue, bgImg, color);
}

function displayPokemon(name, height, weight, types, abilities, moves, stats, statsValue, bgImg, color)
{
    const card = document.querySelector(".card");
    card.textContent ="";

    const nameDisplay = document.createElement("h1");
    const box1 = document.createElement("div");
    const heightDisplay = document.createElement("h2");
    const weightDisplay = document.createElement("h2");
    const typesDisplay = document.createElement("h2");
    const box2 = document.createElement("div");
    const box3 = document.createElement("div");
    const statsDisplay = document.createElement("h2");
    const abilitiesDisplay = document.createElement("h2");
    const movesDisplay = document.createElement("h2");


    nameDisplay.textContent = name.toUpperCase();
    heightDisplay.textContent = "HEIGHT: "+ height;
    weightDisplay.textContent = "WEIGHT: "+ weight;
    typesDisplay.textContent = "TYPE: "+types.map( type => " "+capitalize(type));
    abilitiesDisplay.textContent = "ABILITIES: "+abilities.map( ability => " "+capitalize(ability));
    movesDisplay.textContent = "MOVES: "+moves.map( move => " "+capitalize(move));
    statsDisplay.textContent = "STATS:";

    nameDisplay.classList.add("name");
    box1.classList.add("box");
    heightDisplay.classList.add("basic-info");
    weightDisplay.classList.add("basic-info");
    typesDisplay.classList.add("basic-info");
    statsDisplay.classList.add("basic-info");
    box2.classList.add("box");
    box3.classList.add("box");
    abilitiesDisplay.classList.add("basic-info");
    movesDisplay.classList.add("basic-info");

    card.appendChild(nameDisplay);
    box1.appendChild(heightDisplay);
    box1.appendChild(weightDisplay);
    card.appendChild(box1);
    card.appendChild(typesDisplay);
    box2.appendChild(statsDisplay);
    for(let i=0; i<stats.length; i++)
        {
            const stat = document.createElement("h2");
            stat.textContent = capitalize(stats[i])+": "+statsValue[i];
            stat.classList.add("basic-info");
            box3.appendChild(stat);
        }
    box2.appendChild(box3);
    card.appendChild(box2);
    abilitiesDisplay.classList.add("basic-info");
    card.appendChild(abilitiesDisplay);
    movesDisplay.classList.add("basic-info");
    card.appendChild(movesDisplay);

    const pokeCard = document.getElementById("display");
    pokeCard.style.backgroundImage = `url(${bgImg})`;
    pokeCard.style.border = "3px outset "+color;
    pokeCard.style.boxShadow = "5px 5px 5px "+color;
    nameDisplay.style.border = "3px outset "+color;
    nameDisplay.style.boxShadow = "3px 3px 5px "+color;
    nameDisplay.style.borderRadius = "10px";
}

function displayBackground(types)
{
    switch(types[0])
    {
        case 'fire':
        {
            return "Images/fire.jpg";
        }
        case 'electric':
        {
            return "Images/electric.png";
        }
        case 'grass':
        {
            return "Images/grass.avif";
        }
        case 'rock':
        {
            return "Images/rock.png";
        }
        case 'water':
        {
            return "Images/water.jpg";
        }
        default:
        {
            return "Images/default.jpg";
        }
    }
}

function displayBorder(types)
{
    switch(types[0])
    {
        case 'fire':
        {
            return "red";
        }
        case 'electric':
        {
            return "yellow";
        }
        case 'grass':
        {
            return "green";
        }
        case 'water':
        {
            return "dodgerblue";
        }
        case 'rock':
        {
            return "brown";
        }
        default:
        {
            return "grey";
        }
    }
}

function displayError(name)
{
    const card = document.querySelector(".card");
    const image1 = document.getElementById("pokemonSprite1");
    const image2 = document.getElementById("pokemonSprite2");
    const pokeCard = document.getElementById("display");
    card.textContent ="";
    image1.style.display = "none";
    image2.style.display = "none";
    pokeCard.style.backgroundImage = "none";
    pokeCard.style.border = "none";
    pokeCard.style.boxShadow = "none";

    const errorMsg = document.createElement("h1");

    const msg1 = `Please enter a pokemon`;
    const msg2 = `Sorry, "${name}" isn't a pokemon`;
    console.log(name);
    name == "" ? errorMsg.textContent = msg1 : errorMsg.textContent = msg2;
    const src = "Images/error.gif";
    pokeCard.style.backgroundImage = `url(${src})`;
    pokeCard.style.backgroundSize = "cover";
    pokeCard.style.backgroundPosition = "center";
    pokeCard.style.border = "3px outset white";
    pokeCard.style.boxShadow = "5px 5px 5px white";

    errorMsg.classList.add("error-msg");
    pokeCard.classList.add("error");

    card.appendChild(errorMsg);
}
