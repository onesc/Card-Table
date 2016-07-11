

function initDeck () {
  var imageDir = '/images/cards/';
  var deck = [];
  for (var i = 1; i <= 14; i++) {
      var card = {};
      if (i <= 10) {
      card.name = i + ' of Hearts';
      card.src = imageDir + i + '_of_hearts';
      deck.push(card);
    } else {
      var card = {};
      if (i == 11) {
        card.name = "Jack of Hearts";
        card.src = imageDir + 'jack_of_hearts';
      } else if (i == 12) {
        card.name = "Queen of Hearts";
          card.src = imageDir + 'queen_of_hearts';
      } else if (i == 13) {
        card.name = "King of Hearts";
          card.src = imageDir + 'king_of_hearts';
      } else if (i == 14) {
        card.name = "Ace of Hearts";
          card.src = imageDir + 'ace_of_hearts';
      }
      deck.push(card);
    }
  }

  for (var i = 1; i <= 14; i++) {
      var card = {};
      if (i < 10) {
        card.name = i + ' of Spades';
        card.src = imageDir + i + '_of_spades';
      deck.push(card);
    } else {
      var card = {};
      if (i == 11) {
        card.name = "Jack of Spades";
        card.src = imageDir + "jack_of_spades";
      } else if (i == 12) {
        card.name = "Queen of Spades";
        card.src = imageDir + "queen_of_spades";
      } else if (i == 13) {
        card.name = "King of Spades";
        card.src = imageDir + "king_of_spades";
      } else if (i == 14) {
        card.name = "Ace of Spades";
        card.src = imageDir + "ace_of_spades";
      }
      deck.push(card);
    }
  }

  for (var i = 1; i <= 14; i++) {
    var card = {};
      if (i < 10) {
        card.name = i + ' of Clubs';
        card.src = imageDir + i + '_of_clubs';
      deck.push(card);
    } else {
      var card = {};
      if (i == 11) {
        card.name = "Jack of Clubs";
        card.src = imageDir + 'jack_of_clubs';
      } else if (i == 12) {
        card.name = "Queen of Clubs";
        card.src = imageDir + 'queen_of_clubs';
      } else if (i == 13) {
        card.name = "King of Clubs";
        card.src = imageDir + 'king_of_clubs';
      } else if (i == 14) {
        card.name = "Ace of Clubs";
        card.src = imageDir + 'ace_of_clubs';
      }
      deck.push(card);
    }
  }

  for (var i = 1; i <= 14; i++) {
    var card = {};
      if (i < 10) {
      card.name = i + ' of Diamonds';
      card.src = imageDir + i + '_of_diamonds'
      deck.push(card);
    } else {
      var card = {};
      if (i == 11) {
        card.name = "Jack of Diamonds";
        card.src = imageDir + "jack_of_diamonds";
      } else if (i == 12) {
        card.name = "Queen of Diamonds";
        card.src = imageDir + "queen_of_diamonds";
      } else if (i == 13) {
        card.name = "King of Diamonds";
        card.src = imageDir + "king_of_diamonds";
      } else if (i == 14) {
        card.name = "Ace of Diamonds";
        card.src = imageDir + "ace_of_diamonds";
      }
      deck.push(card);
    }
  }
  return deck;
  }


function shuffle(deck){
    for(var j, x, i = deck.length; i; j = parseInt(Math.random() * i), x = deck[--i], deck[i] = deck[j], deck[j] = x) ;
    return deck;
}

function drawCard(deck) {
  card = deck.pop();
  return card;
}


var deck = initDeck();
console.log(deck);
