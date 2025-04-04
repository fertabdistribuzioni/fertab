import { useState, useEffect } from "react";
import logo from "../assets/logo/FTD_logoBig.svg";
import callIcon from "../assets/callIcon.svg";
import locationIcon from "../assets/locationIcon.svg";

function HeaderBar() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => { setScrollY(window.scrollY); };
        window.addEventListener("scroll", handleScroll);
        return () => { window.removeEventListener("scroll", handleScroll); };
    }, []);

    const maxScroll = 100; // Scroll massimo per applicare lo scale
    const scaleRatio = Math.max(1 - scrollY / (maxScroll * 4), 0.5); // Limita lo scale tra 1 e 0.5

    return (
        <>
            <nav style={{ transform: `scaleY(${scaleRatio})` }}>
                <img id="navbarLogo" src={logo} alt="Logo" style={{ transform: `scaleX(${scaleRatio})` }} />
            </nav>
            <div id="navContent">
                <h4>Ingrosso&nbsp;articoli di&nbsp;ferramenta e&nbsp;tabaccherie</h4>
                <a href="https://maps.app.goo.gl/H4DNaxgzrRN724LC7" target="_blank" rel="noopener noreferrer">
                    <img className="inlineIcon" src={locationIcon} alt="Ci trovi in:" draggable="false" />
                    C.so&nbsp;Garibaldi&nbsp;n.168, Portici&nbsp;(Na)
                </a>
                <a href="tel:0810487003">
                    <img className="inlineIcon" src={callIcon} alt="Chiama al:" draggable="false" />
                    0810487003
                </a>
                <p>Orario&nbsp;apertura:&nbsp;Lun/Ven 08:30/19:00&nbsp;-&nbsp;Sab&nbsp;08:30/12:00</p>
            </div>
        </>
    );
}

export default HeaderBar;
