import { observer } from "mobx-react-lite";
import React from "react";
import "./App.scss";
import GeneratorStore from "./GeneratorStore";

function App() {
  return (
    <div className="App">
      <div className="Passwdgen__Wrapper">
        <div className="GeneratedPass__Wrapper">
          <h2>{GeneratorStore.title}</h2>
          <input
            type="text"
            placeholder="32323232323232323232323232323232"
            value={GeneratorStore.generatedPswd}
            onClick={() => GeneratorStore.copyPasswword(GeneratorStore.generatedPswd)}
            readOnly
          />
        </div>
        <div className="Options__Flexbox">
          <div className="Options__Container">
            <div className="Options__Wrapper">
              <h2>Options</h2>
              <ul>
                {GeneratorStore.usableSymbolsArray.map((sym) => {
                  return (
                    <li key={sym.id}>
                      <label className="CheckboxLabel">
                        <input
                          type="Checkbox"
                          className="Checkbox"
                          checked={sym.Use}
                          onChange={() => GeneratorStore.setOption(sym.id)}
                        />
                        <span className="Fakecheckbox"></span>
                        <span className="CheckboxText">{sym.name}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="Options__Container">
            <div className="Options__Wrapper">
              <h2>Password length: {GeneratorStore.generatorLength}</h2>
              <input
                type="range"
                min="3"
                max="32"
                value={GeneratorStore.generatorLength}
                onChange={(event) => {
                  GeneratorStore.setGenLegth(event.target.value);
                  if (GeneratorStore.generateOnChange) {
                    GeneratorStore.generatePassword();
                  }
                }}
              />
              <div className="Buttons">
                <label className="CheckboxLabel2">
                  <input
                    type="Checkbox"
                    className="Checkbox"
                    checked={GeneratorStore.generateOnChange}
                    onChange={() => GeneratorStore.setGenOnChange()}
                  />
                  <span className="Fakecheckbox"></span>
                  <span className="CheckboxText">Generate on Change</span>
                </label>
                <button
                  onClick={() => {
                    GeneratorStore.generatePassword();
                  }}
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(App);
