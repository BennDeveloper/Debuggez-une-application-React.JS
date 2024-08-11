import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  
   // Correction dr l'ordre des evenements
  const byDateAsc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );

  // Fonction pour mettre à jour l'image
  const nextCard = () => {
    if (byDateAsc && byDateAsc.length > 0) {
      setIndex((prevIndex) => (prevIndex < byDateAsc.length - 1 ? prevIndex + 1 : 0));
    }
  };

  useEffect(() => {
    const timer = setTimeout(nextCard, 5000); // Utiliser setTimeout pour définir la durée
    return () => clearTimeout(timer); // Annuler le minuteur lors du démontage du composant ou lors du changement de index
  }, [index, byDateAsc]); // Ajouter byDateAsc comme dépendance

  return (
    <div className="SlideCardList">
      {byDateAsc?.map((event, idx) => (
        <div key={event.id}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateAsc.map((_, radioIdx) => (
                <input
                  key={byDateAsc[radioIdx].id}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  onChange={() => setIndex(radioIdx)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;