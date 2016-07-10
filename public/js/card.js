

function initDeck () {
  var deck = [];
  var card;
  for (var i = 1; i <= 14; i++) {
      if (i < 10) {
      card = i + ' of Hearts';
      deck.push(card);
    } else {
      if (i == 11) {
        card = "Jack of Hearts";
      } else if (i == 12) {
        card = "Queen of Hearts";
      } else if (i == 13) {
        card = "King of Hearts";
      } else if (i == 14) {
        card = "Ace of Hearts";
      }
      deck.push(card);
    }
  }

  for (var i = 1; i <= 14; i++) {
      if (i < 10) {
      card = i + ' of Spades';
      deck.push(card);
    } else {
      if (i == 11) {
        card = "Jack of Spades";
      } else if (i == 12) {
        card = "Queen of Spades";
      } else if (i == 13) {
        card = "King of Spades";
      } else if (i == 14) {
        card = "Ace of Spades";
      }
      deck.push(card);
    }
  }

  for (var i = 1; i <= 14; i++) {
      if (i < 10) {
      card = i + ' of Clubs';
      deck.push(card);
    } else {
      if (i == 11) {
        card = "Jack of Clubs";
      } else if (i == 12) {
        card = "Queen of Clubs";
      } else if (i == 13) {
        card = "King of Clubs";
      } else if (i == 14) {
        card = "Ace of Clubs";
      }
      deck.push(card);
    }
  }

  for (var i = 1; i <= 14; i++) {
      if (i < 10) {
      card = i + ' of Diamonds';
      deck.push(card);
    } else {
      if (i == 11) {
        card = "Jack of Diamonds";
      } else if (i == 12) {
        card = "Queen of Diamonds";
      } else if (i == 13) {
        card = "King of Diamonds";
      } else if (i == 14) {
        card = "Ace of Diamonds";
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
