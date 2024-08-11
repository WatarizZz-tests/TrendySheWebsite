import React from 'react';
import card1 from "../../assets/card1.png";
import card2 from "../../assets/card2.jpg";
import "./presentationcardsstyle.css";

const PresentationCards = () => {
  return (
    <div className='presentationcards-container'>
      <div className="presentationcards-topdiv">
        <div className="presentationcards-topdiv-left">
            <img src={card1} alt="" className="" />
        </div>
        <div className="presentationcards-topdiv-right">
            <h4 className="">Votre Style Nos Bijoux</h4>
            <p className="">Une variété de designs captivants de charms, bagues, boucles d'oreilles, colliers et une sélection de bracelets pour femmes fabriqués avec des matières premières de qualité telles que l'argent sterling 925, l'argent plaqué or rose et l'argent plaqué or. Une bijouterie en ligne avec les collections les plus uniques, parfaites pour les femmes recherchant des bijoux classiques mais avec des éléments uniques.</p>
        </div>
      </div>
      <div className="presentationcards-bottomdiv">
        <div className="presentationcards-bottomdiv-left">
            <img src={card2} alt="" className="" />
        </div>
        <div className="presentationcards-bottomdiv-right">
        <h4 className="">Chaque piece Raconte Une Histoire</h4>
        <p className="">Choisissez les bijoux selon vos goûts personnels et racontez votre histoire. Créez une combinaison unique qui vous distingue, vous et votre histoire, pour des moments et des souvenirs sans fin.</p>
        </div>
      </div>
    </div>
  )
}

export default PresentationCards
