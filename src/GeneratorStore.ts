import { makeAutoObservable, runInAction } from "mobx";

type SymbolsOBJ = {
  id: number;
  name: string;
  Use: boolean;
  symbs: string[];
};

class GeneratorStore {
  title: string = "Password Generator";
  usableSymbolsArray: SymbolsOBJ[] = [
    {
      id: 1,
      name: "Uppercase",
      Use: true,
      symbs: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
    },
    {
      id: 2,
      name: "Lowercase",
      Use: true,
      symbs: [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ],
    },
    {
      id: 3,
      name: "Numbers",
      Use: true,
      symbs: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    },
    {
      id: 4,
      name: "Symbols",
      Use: true,
      symbs: ["!", "@", "#", "$", "%", "&", "*", ">", "<", "?"],
    },
  ];
  generatorLength: number = 12;
  symbolsArray: string[] = [];
  generatedPswd: string = "";
  generateOnChange: boolean = true;

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  constructor() {
    makeAutoObservable(this);
  }

  setOption(id: number) {
    this.usableSymbolsArray[id - 1].Use = !this.usableSymbolsArray[id - 1].Use;
  }

  checkUsableSymbols() {
    this.symbolsArray = [];
    this.usableSymbolsArray.map((syms) =>
      syms.Use ? this.symbolsArray.push(...syms.symbs) : null
    );
  }

  generatePassword() {
    this.checkUsableSymbols();
    if (this.symbolsArray.length > 0) {
      this.generatedPswd = "";
      for (let i = 0; i < this.generatorLength; i++) {
        this.generatedPswd +=
          this.symbolsArray[this.getRandomInt(this.symbolsArray.length)];
      }
      this.setTitle("Click on the password to copy it");
    } else {
      this.setTitle("Please, include at least one option");
    }
  }

  setGenLegth(value: string) {
    console.log(value);

    this.generatorLength = parseInt(value);
  }

  setGenOnChange() {
    this.generateOnChange = !this.generateOnChange;
  }

  async setTitle(string: string) {
    this.title = string;
    runInAction(() => {
      setTimeout(() => {
        this.setBackTitle();
      }, 3000);
    });
  }

  setBackTitle(value?: string) {
    this.title = value || "Password Generator";
  }

  copyPasswword(value: string) {
    if (this.generatedPswd.length != 0) {
      navigator.clipboard.writeText(value);
      this.setTitle("Copied!");
    } else {
      this.setTitle("Generate a password before copying");
    }
  }
}

export default new GeneratorStore();
