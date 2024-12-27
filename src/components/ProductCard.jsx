import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

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
            setIsTextLong(isLong);
        }
    };

    useEffect(() => {
        checkIfTextIsLong();
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
            <img src={productImg} loading="lazy" alt="Immagine prodotto" onClick={handleImageClick} />
            <div className="prodBody">
                <div className="prodInfo">
                    <h4>{productName}</h4>
                    <p className='prodDescription' ref={descriptionRef}>{productDescription}</p>
                </div>
                <div className="prodBottom">
                    {isTextLong && !isExpanded && ( <button className="textButton" onClick={toggleDescription}>Mostra più</button> )}
                    {isExpanded && ( <button className="textButton" onClick={toggleDescription}>Mostra meno</button> )}
                    <div className="prodBuy">
                        <div className="prodBuyInfo">
                            <h4>{productPrice}€</h4>
                            {productAmount === "1" ? "Al pezzo" : `${productAmount} pezzi`}
                        </div>
                        <button onClick={() => handleRedirection(prodLink)}>Acquista</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

ProductCard.propTypes = {
    productImg: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    productDescription: PropTypes.string.isRequired,
    productPrice: PropTypes.string.isRequired,
    productAmount: PropTypes.string.isRequired,
    prodLink: PropTypes.string.isRequired,
}

export default ProductCard
