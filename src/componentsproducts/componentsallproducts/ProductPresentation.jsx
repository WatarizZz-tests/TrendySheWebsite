import React from 'react';
import { useParams } from 'react-router-dom';
import "./productspresentationstyle.css";
import dummyDataPresentation from '../../dummyDataPresentation';

const ProductPresentation = () => {
  const { category } = useParams();
  const presentationData = dummyDataPresentation.find(item => item.category === category);

  return (
    <div className='container-NecklacesPresentation'>
      <div className="necklacespresentation-img">
        {presentationData && <img src={presentationData.image} alt={`des ${category}`} />}
      </div>
      <div className="necklacespresentation-separation"/>
      <div className="necklacespresentation-p">
        {presentationData && <p>{presentationData.text}</p>}
      </div>
    </div>
  );
}

export default ProductPresentation;
