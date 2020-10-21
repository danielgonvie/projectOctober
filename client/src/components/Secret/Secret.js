import React, { Component } from "react";
import "./Secret.scss";
import { Link } from "react-router-dom";

export default class Secret extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    };
  }

  render() {
    //Multi-language
    let text1;
    let text2;
    let text4;
    let text5;
    let text6;
    let text7;
    let text8;
    let text9;
    let text10;
    let text11;
    let text12;
    let text13;

    if (this.props.lang === true) {
      text1 = "Hey, welcome!";
      text2 = "We were waiting for you, ";
      text4 = "Now you have access to all this bad jokes, congratulations!";
      text5 = "Why don’t they play poker in the jungle? Too many cheetahs!";
      text6 =
        "What do you call a can opener that doesn't work? A can't opener!";
      text7 = "You know what the loudest pet you can get is? A trumpet.";
      text8 =
        "Why did the scarecrow win an award? He was outstanding in his field.";
      text9 = "What did the buffalo say when his son left? Bison!";
      text10 = "What do you call a fish with no eye? Fsh!";
      text11 = "A communist joke isn’t funny… … unless everyone gets it.";
      text12 = "Now get back to";
      text13 = "WORK";
    } else {
      text1 = "¡Hey, bienvenido!";
      text2 = "Te estábamos esperando, ";
      text4 = "Ahora tienes acceso a todos estos chistes malos, ¡enhorabuena!";
      text5 = "¿Como se queda un mago después de comer? ¡MAGORDITO!";
      text6 = "-Oye, ¿te suena Juan Bermúdez?   -¡¡Qué va!! ¡Yo me sueno solo!";
      text7 = "-Hola, me llamo Paco. ¿Y tú?   -No, yo no.";
      text8 = "¿Qué es un CERRO? ¡UN NÚMERRO!";
      text9 = "Robinson Crusó… ¡y lo atropellaron!";
      text10 = "¿Qué necesita Batman para entrar en su casa? Estar afuera...";
      text11 = "¡Todos contra la pared! ¡Y la pared perdió!";
      text12 = "Ahora vuelve al";
      text13 = "TRABAJO";
    }

    return (
      <div className="secret-panel">
        <h1>{text1}</h1>
        <p>
          {text2}
          {this.props.user.name}
        </p>
        <img
          className="allowed-gif"
          src="https://media0.giphy.com/media/u4CY9BW4umAfu/giphy.gif?cid=790b76110913e499a138cc3331a858389b84cf6baa66c34d&rid=giphy.gif"
          alt="Party"
        ></img>
        <div className="allowed-jokes">
          <h2 className="jokes-title">{text4}</h2>
          <p className="joke">{text5}</p>
          <p className="joke">{text6}</p>
          <p className="joke">{text7}</p>
          <p className="joke">{text8}</p>
          <p className="joke">{text9}</p>
          <p className="joke"> {text10}</p>
          <p className="joke">{text11}</p>
        </div>
        <h2 className="allowed-end">
          {text12}
          <Link to="/">{text13}</Link>
        </h2>
      </div>
    );
  }
}
