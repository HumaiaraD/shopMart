let xp = 0;
let money = 100;
let store = " ";
let inventory = ["Water"];
let toteBagCount = 0;

const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const button4 = document.querySelector('#button4');
const text = document.querySelector('#text');
const moneyText = document.querySelector('#money-text');
const xpText = document.querySelector('#xp-text');
const storeStat = document.querySelector('#storeStats');
const inStore = document.querySelector('#in-store');
const toteBag = document.querySelector('#tote-bag');

const locations = [
    {
        name: "Town Square",
        'button text': ["Go buy groceries", "Go to restaurant", "Chit-chat with friend", "Walk around market"],
        'button functions': [goGrocery, goRestaurant, chitChat, walkAround],
        text: "You are in town square. Shop around."
    },
    {
        name: "Grocery",
        'button text': ["Buy Vegetables($30)", "Buy Poultry($30)", "Buy Dairy($30)", "Go to Town Square"],
        'button functions': [buyVeggie, buyPoultryMeat, buyDairy, goTown],
        text: "You enter groceries."
    },
    {
        name: "Restaurant",
        'button text': ["Browse menu", "Buy food ($40)", "Give remarks", "Go to Town Square"],
        'button functions': [browseMenu, buyFood, complainCompliment, goTown],
        text: "You are now at the Restaurant."
    },
    {
        name: "Chit Chat",
        'button text': ["Catch-up on life", "Ask to loan some money", "walk around market", "Go to Town Square"],
        'button functions': [chat, askLoan, walkAround, goTown],
        text: "You saw a friend and now you want to talk."
    },
    {
        name: "Restart",
        'button text': ["Restart", "Restart", "Loan from friend", "Go to Town Square"],
        'button functions': [resetGame, resetGame, askLoan, goTown],
        text: "Since you're running low on money. Restart."
    }
    
]

//initialize buttons 
button1.onclick = goGrocery;
button2.onclick = goRestaurant;
button3.onclick = chitChat;
button4.onclick = walkAround;

function update(location) {
    storeStat.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button4.innerText = location["button text"][3];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    button4.onclick = location["button functions"][3];
    text.innerHTML = location.text;
}

function goTown(){
    update(locations[0]);
}

function goGrocery() {
    update(locations[1]);
    storeStat.style.display = "block";
    inStore.innerText = "Grocery Store";
}

function goRestaurant() {
    update(locations[2]);
    storeStat.style.display = "block";
    inStore.innerText = "Restaurant";
}

function chitChat() {
    update(locations[3]);
}

function walkAround() {
    xp += 5;
    xpText.innerText = xp;
    text.innerHTML = "You take a walk around the market. You feel refreshed. You see familiar faces. Food smells amazing. What a wonderful day."
}

function updateStats() {
    moneyText.innerText = `$${money}`;
    xpText.innerText = xp;
    toteBag.innerText = toteBagCount;
}

function buyVeggie() {
    if(money >= 30) {
        money -= 30;
        xp += 5
        toteBagCount += 1;
        updateStats();
        inventory.push("Vegetables");
        storeStat.style.display = "block";
        text.innerHTML = "You bought some vegetables!"
        
        if (money < 30){
            resetGame();
        }
        
    } else {
        text.innerHTML = "You don't have enough money to buy vegetables."
    }
}
function buyPoultryMeat() {
    if(money >= 30) {
        money -= 30;
        xp += 5;
        toteBagCount += 1;
        updateStats();
        inventory.push("Poultry/meat");
        text.innerHTML = "You bought some red-meat and chicken."

        if (money < 30){
            update(locations[4]);
        }

    } else {
        text.innerHTML = "You don't have enough money."
    }
}
function buyDairy() {
    if(money >= 30) {
        money -= 30;
        xp += 5;
        toteBagCount += 1;
        inventory.push("Dairy");
        updateStats();
        text.innerHTML = "You bought milk, cheese, and yogurt."

        if (money < 30){
            update(locations[4])
        }
        
    } else {
        text.innerHTML = "You don't have enough money."
    }
}
function browseMenu() {
    xp += 1;
    xpText.innerText = xp;
    text.innerHTML = "You enter the restaurant and realise the delicious smell came from here. You are browsing the menu."
}

function buyFood() {
    if(money >= 40) {
        money -= 40;
        xp += 5;
        toteBagCount += 1;
        inventory.push("Takeaway");
        updateStats();
        text.innerHTML = "You bought some food. You will take home and eat. y.a."
        
        if (money < 30){
            update(locations[4]);
        }
        
    } else {
        text.innerHTML = "You don't have enough cash."
    }
}
function complainCompliment() {
    const remark = ["Complain","Compliment","Quarrel"];
    const randomRemark = remark[Math.floor(Math.random() * remark.length)];
    if (randomRemark === "Complain"){
        xp -= 2;
        updateStats();
        return text.innerHTML = "Your store has hygiene issues."
    } else if (randomRemark === "Compliment"){
        xp += 2;
        updateStats();
        return text.innerHTML = "Wow, your food smells mouth-watering."
    }
    else if (randomRemark === "Quarrel"){
        xp -= 5;
        updateStats();
        return text.innerHTML = "You guys are garbage. Your food looks awful. You should upgrade your restaurant instead of selling this bullshit."
    }
}
function chat() {
    xp += 2;
    xpText.innerText = xp;
    text.innerHTML = "You saw a friend and catch-up on each other's lives";
}

let hasLoaned = false;

function askLoan() {
    if (hasLoaned){
        text.innerText = "You can only loan once. Thank you!"
        return;
    }

    const help = ["Yes", "No", "Maybe"];
    const loan = help[Math.round(Math.random() * help.length)];
    if (loan === "Yes"){
        money += 50;
        xp += 5;
        updateStats();
        hasLoaned = true;
        text.innerHTML = "friend: OF course. Here take $50." + "<br>" + 
        "You: Thank you so much! I will return it." 
        

    }
    else if (loan === "No") {
        text.innerHTML = "Friend: I can't right now."
        xp -= 1;
        updateStats();
        hasLoaned = true;
    }
    else if (loan === "Maybe") {
        money += 15;
        xp += 2;
        updateStats();
        hasLoaned = true;
        text.innerHTML = "Friend: I only loan this much." + "<br>" +
        "You : Aww! I appreciate it. Thanks."
        
    }
}

function resetGame(){
    money = 100;
    xp = 0;
    toteBagCount = 0;
    inventory = ["Water"];
    updateStats();
    update(locations[0]);
}

