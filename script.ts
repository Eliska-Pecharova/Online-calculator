// Získám referenci na displej kalkulačky
const display = document.getElementById("display") as HTMLDivElement;
// Získám všechna tlačítka kalkulačky
const buttons = document.querySelectorAll(".calculator-buttons button");

// Proměnné pro aktuální vstup a poslední výsledek
let currentInput = "";
let lastResult = "";

// Pro každé tlačítko nastavím událost kliknutí
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    switch (value) {
      case "AC":
        // Vymaže vše – vstup i výsledek
        currentInput = "";
        lastResult = "";
        updateDisplay("0");
        break;

      case "=":
        // Pokusím se vyhodnotit výraz
        try {
          // Nahrazuju vizuální znaky za operátory
          const result = eval(
            currentInput.replace(/×/g, "*").replace(/÷/g, "/")
          );
          lastResult = result.toString();
          updateDisplay(lastResult);
          currentInput = lastResult; // umožní další výpočty
        } catch {
          // Pokud je výraz neplatný
          updateDisplay("Error");
          currentInput = "";
        }
        break;

      case "±":
        // Změní znaménko aktuálního čísla
        if (currentInput) {
          if (currentInput.startsWith("-")) {
            currentInput = currentInput.slice(1);
          } else {
            currentInput = "-" + currentInput;
          }
          updateDisplay(currentInput);
        }
        break;

      case "%":
        // Vypočítá procento z aktuálního čísla
        if (currentInput) {
          const percent = parseFloat(currentInput) / 100;
          currentInput = percent.toString();
          updateDisplay(currentInput);
        }
        break;

      default:
        // Přidá hodnotu tlačítka do vstupu
        currentInput += value;
        updateDisplay(currentInput);
        break;
    }
  });
});

// Funkce pro aktualizaci displeje
function updateDisplay(value: string) {
  display.textContent = value;
}
