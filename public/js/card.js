

function initDeck () {
  var imageDir = '/images/cards/';
  var deck = [];
  for (var i = 2; i <= 14; i++) {
      var card = {};
      if (i <= 10) {
      card.cardname = i + ' of Hearts';
      card.src = imageDir + i + '_of_hearts.png';
      deck.push(card);
    } else {
      var card = {};
      if (i == 11) {
        card.cardname = "Jack of Hearts";
        card.src = imageDir + 'jack_of_hearts.png';
      } else if (i == 12) {
        card.cardname = "Queen of Hearts";
          card.src = imageDir + 'queen_of_hearts.png';
      } else if (i == 13) {
        card.cardname = "King of Hearts";
          card.src = imageDir + 'king_of_hearts.png';
      } else if (i == 14) {
        card.cardname = "Ace of Hearts";
          card.src = imageDir + 'ace_of_hearts.png';
      }
      deck.push(card);
    }
  }

  for (var i = 2; i <= 14; i++) {
      var card = {};
      if (i <= 10) {
        card.cardname = i + ' of Spades';
        card.src = imageDir + i + '_of_spades.png';
      deck.push(card);
    } else {
      var card = {};
      if (i == 11) {
        card.cardname = "Jack of Spades";
        card.src = imageDir + "jack_of_spades.png";
      } else if (i == 12) {
        card.cardname = "Queen of Spades";
        card.src = imageDir + "queen_of_spades.png";
      } else if (i == 13) {
        card.cardname = "King of Spades";
        card.src = imageDir + "king_of_spades.png";
      } else if (i == 14) {
        card.cardname = "Ace of Spades";
        card.src = imageDir + "ace_of_spades.png";
      }
      deck.push(card);
    }
  }

  for (var i = 2; i <= 14; i++) {
    var card = {};
      if (i <= 10) {
        card.cardname = i + ' of Clubs';
        card.src = imageDir + i + '_of_clubs.png';
      deck.push(card);
    } else {
      var card = {};
      if (i == 11) {
        card.cardname = "Jack of Clubs";
        card.src = imageDir + 'jack_of_clubs.png';
      } else if (i == 12) {
        card.cardname = "Queen of Clubs";
        card.src = imageDir + 'queen_of_clubs.png';
      } else if (i == 13) {
        card.cardname = "King of Clubs";
        card.src = imageDir + 'king_of_clubs.png';
      } else if (i == 14) {
        card.cardname = "Ace of Clubs";
        card.src = imageDir + 'ace_of_clubs.png';
      }
      deck.push(card);
    }
  }

  for (var i = 2; i <= 14; i++) {
    var card = {};
      if (i <= 10) {
      card.cardname = i + ' of Diamonds';
      card.src = imageDir + i + '_of_diamonds.png'
      deck.push(card);
    } else {
      var card = {};
      if (i == 11) {
        card.cardname = "Jack of Diamonds";
        card.src = imageDir + "jack_of_diamonds.png";
      } else if (i == 12) {
        card.cardname = "Queen of Diamonds";
        card.src = imageDir + "queen_of_diamonds.png";
      } else if (i == 13) {
        card.cardname = "King of Diamonds";
        card.src = imageDir + "king_of_diamonds.png";
      } else if (i == 14) {
        card.cardname = "Ace of Diamonds";
        card.src = imageDir + "ace_of_diamonds.png";
      }
      deck.push(card);
    }
  }
  return deck;
  }
