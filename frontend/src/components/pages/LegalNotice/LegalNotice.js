import React from "react";

const titleStyle = {
    fontSize: '1.5em',
    marginBottom: 20
}

const paraStyle = {
    lineHeight: 1.8,
    marginBottom: 20
}

const LegalNotice = () => {

    return (
        <>
            <h1 style={{marginBottom: 40}}>Mentions légales</h1>
            <p style={titleStyle}>Identité</p>
            <p style={paraStyle}><strong>Nom du site web</strong> : leQuiz.io<br/>
                <strong>Adresse</strong> : https://lequiz.io<br/>
                <strong>Responsables de publication</strong> :<br/>
                Alexis LEJEUNE<br/>
                Emile CALIXTE<br/>
                contact@lequiz.io<br/>
                <strong>Hébergement</strong> :<br/>
                Ce site est hébergé sur l'offre Cloud de Microsoft (Azure).<br/>
                Il est géographiquement localisé dans le centre d'hébergement de
                Microsoft en France (région Centre).<br/>
                Pour plus d’informations, veuillez vous référer aux liens suivants :<br/>
                <a href="https://www.microsoft.com/fr-fr/trust-center/privacy"
                   target="_blank"
                >
                    La confidentialité chez Microsoft
                </a>
                <br/>
                <a href="https://azure.microsoft.com/fr-fr/support/legal/"
                   target="_blank"
                >
                    Mentions légales de Microsoft Azure
                </a>
            </p>
            <p style={titleStyle}>Conditions d’utilisation</p>
            <p style={paraStyle}>
                L’utilisation du présent site implique l’acceptation pleine et entière des conditions générales
                d’utilisation décrites ci-après.<br/> Ces conditions d’utilisation sont susceptibles d’être modifiées
                ou complétées à tout moment.
            </p>
            <p style={titleStyle}>Informations</p>
            <p style={paraStyle}>
                Les informations et documents du site sont présentés à titre indicatif, n’ont pas de
                caractère exhaustif, et ne peuvent engager la responsabilité des responsables de publication du site.<br/>
                Les responsables de publication du site ne peut être tenu responsable des dommages directs
                et indirects consécutifs à l’accès au site.
            </p>
            <p style={titleStyle}>Interactivité</p>
            <p style={paraStyle}>
                Les utilisateurs du site peuvent y déposer du contenu, apparaissant sur le site dans des espaces dédiés.<br/>
                Le contenu déposé reste sous la responsabilité de leurs auteurs, qui en assument pleinement
                l’entière responsabilité juridique.<br/>
                Les responsables de publication du site se réserve néanmoins le droit de retirer sans préavis et sans
                justification tout contenu déposé par les utilisateurs<br/>
                qui ne satisferait pas à la charte déontologique du site ou à la législation en vigueur.
            </p>
            <p style={titleStyle}>Propriété intellectuelle</p>
            <p style={paraStyle}>
                Sauf mention contraire, tous les éléments accessibles sur le site (textes, images, graphismes, logo,
                icônes, sons, logiciels, etc.)
                restent la propriété exclusive de leurs<br/>  auteurs,en ce qui concerne les droits de propriété
                intellectuelle ou les droits d’usage. Toute reproduction, représentation, modification, publication,
                adaptation de tout<br/>
                ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite,
                sauf autorisation écrite préalable de l’auteur.<br/>
                Toute exploitation non autorisée du site ou de l’un quelconque des éléments qu’il contient est considérée
                comme constitutive d’une contrefaçon et poursuivie.<br/>
                Les marques et logos reproduits sur le site sont déposés par les sociétés qui en sont propriétaires.
            </p>
            <p style={titleStyle}>Liens</p>
            <p style={paraStyle}>
                <strong>Liens sortants</strong><br/>
                Les responsables de publication du site décline toute responsabilité et n’est pas engagé par le
                référencement via des liens hypertextes, de ressources tierces<br/> présentes sur le réseau Internet,
                tant en ce qui concerne leur contenu que leur pertinence.<br/><br/>
                <strong>Liens entrants</strong><br/>
                Les responsables de publication du site autorise les liens hypertextes vers l’une des pages de ce site,
                à condition que ceux-ci ouvrent une nouvelle fenêtre<br/>
                et soient présentés de manière non équivoque afin d’éviter :<br/>
                    <li style={{marginLeft: 30}}>tout risque de confusion entre le site citant et les responsables de publication du site</li>
                    <li style={{marginLeft: 30}}>ainsi que toute présentation tendancieuse, ou contraire aux lois en vigueur.</li>
                Les responsables de publication du site se réserve le droit de demander la suppression d’un lien
                s’il estime que le site source ne respecte pas les règles ainsi définies.
            </p>
            <p style={titleStyle}>Confidentialité</p>
            <p style={paraStyle}>
                Tout utilisateur dispose d’un droit d’accès, de rectification et d’opposition aux données personnelles
                le concernant, en effectuant sa demande écrite et signée, accompagnée d’une preuve d’identité.<br/>
                Les responsables de publication peuvent être contactés à cette adresse : contact@lequiz.io.
            </p>
            <p style={titleStyle}>Crédits</p>
        </>
    )
}

export default LegalNotice;
