let cards = []
let sum = 0
let hasBlackjack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")

let player = {
    name: "Per",
    chips: 200
}
let playerEl = document.getElementById("player-el")
//playerEl.textContent = player.name + ": $" + player.chips

function getRandomCard(){
    let ranNum = Math.floor(Math.random()*13)+1
    if(ranNum === 1 && sum <= 10){
        return 11
    }else if(ranNum > 10){
        return 10
    }else{
        return ranNum
    }
}

function startGame(){
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard+secondCard
    isAlive = true
    renderGame()
}

function renderGame(){
    //render out all cards
    cardsEl.textContent = "Cards: "
    for(let i = 0; i < cards.length; i++){
        cardsEl.textContent += cards[i] + " "
    }

    sumEl.textContent = "Sum: " + sum
    //add another dialogue for dealer win
    if (sum < 21){
        message = "Do you want to draw a new card?"
    } else if (sum === 21){
        message = "Woohoo! You've got Blackjack!"
        hasBlackjack = true
    } else{
        message = "Bust! You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}

function newCard(){
    if(isAlive === true && hasBlackjack === false){
        let changed = false
        let card = getRandomCard()
        cards.push(card)
        sum += card
        //decide if a new or existing A is worth 1 or 11
        while(sum > 21){
            for(let i = 0; i < cards.length; i++){
                if(cards[i] === 11){
                    cards[i] = 1
                    sum -= 10
                    changed = true
                }
            }
            if(!changed){
                break
            }
        }
        renderGame()
    }
}

// generate dealer's cards