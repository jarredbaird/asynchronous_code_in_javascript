async function getNewDeck() {
  let response = await fetch(
    "http://deckofcardsapi.com/api/deck/new/shuffle/"
  ).then((response) => response.json());
  return response;
}
let deck;

getNewDeck().then((response) => {
  debugger;
  deck = response;
});
$("button").on("click", async function (event) {
  event.preventDefault();
  let newCard = await drawCard(deck.deck_id);
  $("#cards").append(
    $("<img>").attr("src", newCard.image).css("position", "absolute")
  );
});

async function drawCard(deckid) {
  let response = await fetch(
    `http://deckofcardsapi.com/api/deck/${deckid}/draw/?count=1`
  ).then((response) => response.json());
  console.log(response);
  return response.cards[0];
}
