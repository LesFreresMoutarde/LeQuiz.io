import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import {app} from "../../../App";

const NotFound = () => {

    useEffect(() => {
        app.showBackArrow(false);
    }, []);

    return (
        <div className="text-center">
            <h1 className="mb2">Page introuvable</h1>
            <p className="mb2">Nous n'avons pas trouvé le contenu demandé.</p>
            <p><Link to="/">Retour à l'accueil</Link></p>
        </div>
    )
}

export default NotFound;
