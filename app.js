const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 15;
const MONSTER_ATTACK_VALUE = 16;
const HEAL_VALU = 13;

const enteredValue = prompt("Maximum life for you and monster", "100");

let chosenMaxLife = parseInt(enteredValue);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert("You would be dead but the bonus life saved you!!");
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("you won!!");
    reset();
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("you lose!!");
    reset();
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert("match draw!!");
    reset();
  }
}

function attackType(mode) {
  const damage = dealMonsterDamage(mode);
  currentMonsterHealth -= damage;
  endRound();
}

function attackHandler() {
  attackType(ATTACK_VALUE);
}

function strongAttackHandler() {
  attackType(STRONG_ATTACK_VALUE);
}

function healHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALU) {
    alert("you can't heal ,more than your max health");
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALU;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  endRound();
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healHandler);
