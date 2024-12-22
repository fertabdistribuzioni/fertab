import React, { useState, useEffect, useRef } from 'react';

function handleRedirection(link) {
    window.open(link, '_blank');
}

function ProductCard({ productImg, productName, productDescription, productPrice, productAmount, prodLink }) {
    const [isTextLong, setIsTextLong] = useState(false); 
    const [isExpanded, setIsExpanded] = useState(false);
    const descriptionRef = useRef(null);

    const checkIfTextIsLong = () => {
        if (descriptionRef.current) {
            const isLong = descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight;
            setIsTextLong(isLong);  // Imposta lo stato se il testo è lungo
        }
    };

    useEffect(() => {
        checkIfTextIsLong();  // Verifica se il testo è lungo al caricamento del componente
    }, [productDescription]);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const handleImageClick = () => {
        if (isExpanded) {
            setIsExpanded(false);
        }
    };

    return (
        <div className={`prodCard ${isExpanded ? 'expanded' : ''}`}>
            <img src={productImg} alt="Immagine prodotto" onClick={handleImageClick} />
            <div className="prodInfo">
                <h3>{productName}</h3>
                <p className='prodDescription' ref={descriptionRef}>{productDescription}</p>
                {isTextLong && !isExpanded && ( <a onClick={toggleDescription}>Mostra più</a> )}
                {isExpanded && ( <a onClick={toggleDescription}> Mostra meno </a> )}
                <div className="prodBuy">
                    <div className="prodBuyInfo">
                        <h4>{productPrice}</h4>
                        <p className="smallText">{productAmount}</p>
                    </div>
                    <button onClick={() => handleRedirection(prodLink)}>Acquista</button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
