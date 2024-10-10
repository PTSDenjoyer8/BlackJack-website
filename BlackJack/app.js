const pachet = [
  { name: 2, color: "rosu", icon: "", value: 2 },
  { name: 2, color: "trifoi", icon: "", value: 2 },
  { name: 2, color: "negru", icon: "", value: 2 },
  { name: 2, color: "romb", icon: "", value: 2 },
  { name: 3, color: "rosu", icon: "", value: 3 },
  { name: 3, color: "trifoi", icon: "", value: 3 },
  { name: 3, color: "romb", icon: "", value: 3 },
  { name: 3, color: "mac", icon: "", value: 3 },
  { name: 4, color: "rosu", icon: "", value: 4 },
  { name: 4, color: "trifoi", icon: "", value: 4 },
  { name: 4, color: "romb", icon: "", value: 4 },
  { name: 4, color: "mac", icon: "", value: 4 },
  { name: 5, color: "rosu", icon: "", value: 5 },
  { name: 5, color: "trifoi", icon: "", value: 5 },
  { name: 5, color: "romb", icon: "", value: 5 },
  { name: 5, color: "mac", icon: "", value: 5 },
  { name: 6, color: "rosu", icon: "", value: 6 },
  { name: 6, color: "trifoi", icon: "", value: 6 },
  { name: 6, color: "romb", icon: "", value: 6 },
  { name: 6, color: "mac", icon: "", value: 6 },
  { name: 7, color: "rosu", icon: "", value: 7 },
  { name: 7, color: "trifoi", icon: "", value: 7 },
  { name: 7, color: "romb", icon: "", value: 7 },
  { name: 7, color: "mac", icon: "", value: 7 },
  { name: 8, color: "rosu", icon: "", value: 8 },
  { name: 8, color: "trifoi", icon: "", value: 8 },
  { name: 8, color: "romb", icon: "", value: 8 },
  { name: 8, color: "mac", icon: "", value: 8 },
  { name: 9, color: "rosu", icon: "", value: 9 },
  { name: 9, color: "trifoi", icon: "", value: 9 },
  { name: 9, color: "romb", icon: "", value: 9 },
  { name: 9, color: "mac", icon: "", value: 9 },
  { name: 10, color: "rosu", icon: "", value: 10 },
  { name: 10, color: "trifoi", icon: "", value: 10 },
  { name: 10, color: "romb", icon: "", value: 10 },
  { name: 10, color: "mac", icon: "", value: 10 },
  { name: "J", color: "rosu", icon: "", value: 10 },
  { name: "J", color: "trifoi", icon: "", value: 10 },
  { name: "J", color: "romb", icon: "", value: 10 },
  { name: "J", color: "mac", icon: "", value: 10 },
  { name: "Q", color: "rosu", icon: "", value: 10 },
  { name: "Q", color: "trifoi", icon: "", value: 10 },
  { name: "Q", color: "romb", icon: "", value: 10 },
  { name: "Q", color: "mac", icon: "", value: 10 },
  { name: "K", color: "rosu", icon: "", value: 10 },
  { name: "K", color: "trifoi", icon: "", value: 10 },
  { name: "K", color: "romb", icon: "", value: 10 },
  { name: "K", color: "mac", icon: "", value: 10 },
  { name: "A", color: "rosu", icon: "", value: 11, optionalValue: [1, 11] },
  { name: "A", color: "trifoi", icon: "", value: 11, optionalValue: [1, 11] },
  { name: "A", color: "romb", icon: "", value: 11, optionalValue: [1, 11] },
  { name: "A", color: "mac", icon: "", value: 11, optionalValue: [1, 11] },
];

const blackjackStandardRules = {
  minTotal: 17,
  maxTotal: 21,
};

var runda = 0;
let idDealer;
let totalulMaxim = -1;

function shuffleArray(pachet) {
  for (var i = pachet.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = pachet[i];
    pachet[i] = pachet[j];
    pachet[j] = temp;
  }
}
let noOfPlayers = document.getElementById("numarPlayeri");
const playerObjs = [];

function startGame() {
  document.querySelector(".start").classList.add("hidden");
  document.querySelector(".inputStart").classList.add("hidden");
  shuffleArray(pachet);
  let numOfPlayers = noOfPlayers.value;
  for (let i = 0; i < numOfPlayers; i++) {
    playerObjs.push({
      playerId: i,
      cards: [],
      total: 0,
      stopped: false,
      status: "unknow",
    });
    document.getElementById("buttons").innerHTML +=
      "<h1 id='playerCards" +
      i +
      "' class='players_cards' data-id-playerCards='" +
      i +
      "'>Your Cards: </h1>";
    document.getElementById("buttons").innerHTML +=
      "<button class='draw_btn' data-id='" + i + "'>Draw card</button>";
    document.getElementById("buttons").innerHTML +=
      "<button class='stop_btn' data-id-stop='" + i + "'>Stop</button>";
    idDealer = i + 1;
  }
  playerObjs.push({
    playerId: idDealer,
    cards: [],
    total: 0,
    stopped: false,
    status: "unknow",
  });
  for (let j = 1; j <= 2; j++) {
    for (let a = 0; a <= noOfPlayers.value; a++) {
      let carteNoua = pachet.pop();
      playerObjs[a].cards.push(carteNoua);
      playerObjs[a].total += carteNoua.value;
    }
  }
  console.log(playerObjs);
  for (let j = 0; j <= 1; j++) {
    for (let a = 0; a < noOfPlayers.value; a++) {
      document.getElementById("playerCards" + a).textContent +=
        playerObjs[a].cards[j].name + " ";
    }
  }
  for (let i = 0; i <= numOfPlayers; i++) {
    if (playerObjs[i].total == 21 || playerObjs[i].total == 22) {
      playerObjs[i].status = "winner";
      playerObjs[i].stopped = true;
      totalulMaxim = 21;
    }
  }

  console.log(playerObjs);
  addPlayerButtonsEvListeners();
  addPlayerStopButtonsEvListeners();
}

let btns = document.getElementsByClassName("draw_btn");
const addPlayerButtonsEvListeners = function () {
  for (let i = 0; i < btns.length; i++) {
    const btn = btns[i];
    btn.addEventListener("click", (e) => {
      const playerId = e.target.getAttribute("data-id");
      assignCardsToPlayer(playerId, pachet.pop());
      console.log(playerObjs);
    });
  }
};

const assignCardsToPlayer = function (playerId, card) {
  console.log(runda, "runda la care suntem");
  for (let i = 0; i < playerObjs.length; i++) {
    const player = playerObjs[i];
    if (player.playerId == playerId && player.stopped == false && runda == i) {
      player.cards.push(card);
      player.total += card.value;
      document.getElementById("playerCards" + playerId).textContent +=
        card.name + " ";
      runda++;
      console.log(runda, "runda la care suntem dupa ce s a luat carte");
      if (player.total > blackjackStandardRules.maxTotal) {
        player.stopped = true;
        player.status = "loser";
      }
    }
    if (runda == idDealer) {
      if (playerObjs[idDealer].total < blackjackStandardRules.minTotal) {
        const player = playerObjs[idDealer];
        player.cards.push(card);
        player.total += card.value;
      }
      runda = 0;
    }
  }
  var numarDeStopuri = 0;
  for (i = runda; i <= playerObjs.length; i++) {
    if (i == idDealer) {
      if (playerObjs[idDealer].total < blackjackStandardRules.minTotal) {
        const player = playerObjs[idDealer];
        player.cards.push(card);
        player.total += card.value;
      }
      i = 0;
    }
    if (playerObjs[i].stopped == false) {
      runda = i;
      console.log("player ", i, "este la rand in for verificare");
      break;
    }
    if (numarDeStopuri == playerObjs.length - 1) {
      if (playerObjs[idDealer].total < blackjackStandardRules.minTotal) {
        do {
          const player = playerObjs[idDealer];
          player.cards.push(card);
          player.total += card.value;
        } while (playerObjs[idDealer].total >= blackjackStandardRules.minTotal);
      }
      playerObjs[idDealer].stopped = true;
      showTheWinner();
      break;
    }
    numarDeStopuri++;
    console.log(numarDeStopuri, "numar de stopuri");
  }
};

let stopBtns = document.getElementsByClassName("stop_btn");

const addPlayerStopButtonsEvListeners = function () {
  for (let i = 0; i < stopBtns.length; i++) {
    const btnTemporal = stopBtns[i];
    btnTemporal.addEventListener("click", (e) => {
      if (playerObjs[i].stopped == false) {
        console.log(runda, "a apasat stop");
        runda++;
        console.log(runda, "suntem la runda asta");
        const playerId = e.target.getAttribute("data-id-stop");
        playerStopCardsDraw(playerId);
        console.log(playerObjs);
      }
    });
  }
  var numarDeStopuri = 0;
  for (i = runda; i < playerObjs.length; i++) {
    if (i == idDealer) {
      if (playerObjs[idDealer].total < blackjackStandardRules.minTotal) {
        const player = playerObjs[idDealer];
        player.cards.push(card);
        player.total += card.value;
      }
      i = 0;
    }
    if (playerObjs[i].stopped == false) {
      runda = i;
      console.log("player ", i, "este la rand in for verificare");
      break;
    }
    if (numarDeStopuri == playerObjs.length - 1) {
      if (playerObjs[idDealer].total < blackjackStandardRules.minTotal) {
        do {
          const player = playerObjs[idDealer];
          player.cards.push(card);
          player.total += card.value;
        } while (playerObjs[idDealer].total >= blackjackStandardRules.minTotal);
      }
      playerObjs[idDealer].stopped = true;
      showTheWinner();
      break;
    }
    numarDeStopuri++;
    console.log(numarDeStopuri, "numar de stopuri");
  }
};
const playerStopCardsDraw = function (playerId) {
  for (let i = 0; i < playerObjs.length; i++) {
    const player = playerObjs[i];
    if (
      player.playerId == playerId &&
      player.total > blackjackStandardRules.minTotal
    ) {
      player.stopped = true;
    }
  }
};

const showTheWinner = function () {
  let atLeastOneWinner = 0;
  document.querySelector(".winningPhase").classList.remove("hidden");
  for (let i = 0; i <= playerObjs.length; i++) {
    if (playerObjs[i].total <= blackjackStandardRules.maxTotal) {
      if (playerObjs[i].total > totalulMaxim) {
        totalulMaxim = playerObjs[i].total;
      }
    }
  }
  for (let i = 0; i <= playerObjs.length; i++) {
    if (playerObjs[i].total == totalulMaxim) {
      playerObjs[i].status = "winner";
      document.getElementById("castigatori").textContent +=
        playerObjs[i].playerId;
      atLeastOneWinner++;
    } else {
      playerObjs[i].status = "loser";
    }
  }
  if (atLeastOneWinner == 0) {
    document.getElementById("castigatori").textContent =
      "toti playerii au pierdut";
  }
};
