db = require('../models/dbModels');
const yaml = require('js-yaml');
const fs = require('fs');

(async () => {

    const transaction = await db.sequelize.transaction();

    const types = [
        {
            name: 'classic',
            label: 'Classique'
        }
    ];

    const categories = [
        {
            name: 'geographie',
            label: 'Géographie'
        },
        {
            name: 'divers',
            label: 'Divers'
        },
        {
            name: 'histoire',
            label: 'Histoire'
        },
        {
            name: 'sport',
            label: 'Sport'
        },
        {
            name: 'jeu-video',
            label: 'Jeu-vidéo'
        },
        {
            name: 'musique',
            label: 'Musique'
        },
        {
            name: 'internet',
            label: 'Internet'
        }
    ];

    const tags = [
        {
            name: 'moto-gp',
            label: 'Moto GP'
        },
        {
            name: 'asie',
            label: 'Asie'
        },
        {
            name: 'ville',
            label: 'Ville'
        },
        {
            name: 'inde',
            label: 'Inde'
        },
        {
            name: 'scoutisme',
            label: 'Scoutisme'
        },
        {
            name: 'uk',
            label: 'Royaume-Uni'
        },
        {
            name: 'personnalite',
            label: 'Personnalité'
        },
        {
            name: 'armee',
            label: 'Armée'
        },
        {
            name: 'jeu_societe',
            label: 'Jeu de société'
        },
        {
            name: 'vegetal',
            label: 'Végétal'
        },
        {
            name: 'poison',
            label: 'Poison'
        },
        {
            name: 'grece',
            label: 'Grèce'
        },
        {
            name: 'antiquite',
            label: 'Antiquité'
        },
        {
            name: 'athenes',
            label: 'Athènes'
        },
        {
            name: 'france',
            label: 'France'
        },
        {
            name: 'europe',
            label: 'Europe'
        },
        {
            name: 'vosges',
            label: 'Vosges'
        },
        {
            name: 'grand_est',
            label: 'Grand Est'
        },
        {
            name: 'litterature',
            label: 'Littérature'
        },
        {
            name: 'la_fontaine',
            label: 'Jean de La Fontaine'
        },
        {
            name: 'astronomie',
            label: 'Astronomie'
        },
        {
            name: 'football',
            label: 'Football'
        },
        {
            name: 'fifa_world_cup',
            label: 'Coupe du monde de la FIFA'
        },
        {
            name: 'corse',
            label: 'Corse'
        },
        {
            name: 'chanson_francaise',
            label: 'Chanson française'
        },
        {
            name: 'afrique',
            label: 'Afrique'
        },
        {
            name: 'pays',
            label: 'Pays'
        },
        {
            name: 'ile',
            label: 'Île'
        },
        {
            name: 'urss',
            label: 'URSS'
        },
        {
            name: '20_eme_siecle',
            label: 'XXème siècle'
        },
        {
            name: 'amerique_nord',
            label: 'Amérique du Nord'
        },
        {
            name: 'usa',
            label: 'États-Unis'
        },
        {
            name: 'catastrophe_naturelle',
            label: 'Catastrophe naturelle'
        },
        {
            name: 'egypte',
            label: 'Égypte'
        },
        {
            name: 'chanson_britannique',
            label: 'Chanson britannique'
        },
        {
            name: 'beatles',
            label: 'The Beatles'
        },
        {
            name: 'mediterranee',
            label: 'Mer Méditerranée'
        },
        {
            name: 'chine',
            label: 'Chine'
        },
        {
            name: 'drapeau',
            label: 'Drapeau'
        },
        {
            name: 'gentile',
            label: 'Gentilé'
        },
        {
            name: 'departement',
            label: 'Département'
        },
        {
            name: 'marseille',
            label: 'Marseille'
        },
        {
            name: 'bd',
            label: 'Bande dessinée'
        },
        {
            name: 'alcool',
            label: 'Alcool'
        },
        {
            name: 'monument',
            label: 'Monument'
        },
        {
            name: 'nouvelle-zelande',
            label: 'Nouvelle-Zélande'
        },
        {
            name: 'oceanie',
            label: 'Océanie'
        },
        {
            name: 'amerique_sud',
            label: 'Amérique du Sud'
        },
        {
            name: 'volcan',
            label: 'Volcan'
        },
        {
            name: 'italie',
            label: 'Italie'
        },
        {
            name: 'jordanie',
            label: 'Jordanie'
        },
        {
            name: 'cambodge',
            label: 'Cambodge'
        },
        {
            name: 'montagne',
            label: 'Montagne'
        },
        {
            name: 'belgique',
            label: 'Belgique'
        },
        {
            name: 'statue',
            label: 'Statue'
        },
        {
            name: 'foret',
            label: 'Forêt'
        },
        {
            name: 'droit',
            label: 'Droit'
        },
        {
            name: 'pays-bas',
            label: 'Pays-bas'
        },
        {
            name: 'region',
            label: 'Région'
        },
        {
            name: 'religion',
            label: 'Religion'
        },
        {
            name: 'vatican',
            label: 'Vatican'
        },
        {
            name: 'catholicisme',
            label: 'Catholicisme'
        },
        {
            name: 'shintoisme',
            label: 'Shintoïsme'
        },
        {
            name: 'desert',
            label: 'Désert'
        },
        {
            name: 'mongolie',
            label: 'Mongolie'
        },
        {
            name: 'australie',
            label: 'Australie'
        },
        {
            name: 'animal',
            label: 'Animal'
        },
        {
            name: 'espagne',
            label: 'Espagne'
        },
        {
            name: 'mer',
            label: 'Mer'
        },
        {
            name: 'caraibes',
            label: 'Caraïbes'
        },
        {
            name: 'guyane',
            label: 'Guyane'
        },
        {
            name: 'cartographie',
            label: 'Cartographie'
        },
        {
            name: 'symbole',
            label: 'Symbole'
        },
        {
            name: 'judaisme',
            label: 'Judaïsme'
        },
        {
            name: 'mariage',
            label: 'Mariage'
        },
        {
            name: 'ocean',
            label: 'Océan'
        },
        {
            name: 'turquie',
            label: 'Turquie'
        },
        {
            name: 'detroit',
            label: 'Détroit'
        },
        {
            name: 'monarque',
            label: 'Monarque'
        },
        {
            name: 'bourbon',
            label: 'Maison de Bourbon'
        },
        {
            name: 'troisieme_republique',
            label: 'Troisième République'
        },
        {
            name: 'christianisme',
            label: 'Christianisme'
        },
        {
            name: 'pape',
            label: 'Pape'
        },
        {
            name: 'paris',
            label: 'Paris'
        },
        {
            name: '11_eme_siecle',
            label: 'XIème siècle'
        },
        {
            name: '19_eme_siecle',
            label: 'XIXème siècle'
        },
        {
            name: '16_eme_siecle',
            label: 'XVIème siècle'
        },
        {
            name: 'uefa_champions_league',
            label: 'Ligue des champions de l\'UEFA'
        },
        {
            name: '5_eme_siecle',
            label: 'Vème siècle'
        },
        {
            name: 'guerre',
            label: 'Guerre'
        },
        {
            name: 'revolution',
            label: 'Révolution'
        },
        {
            name: 'peuple',
            label: 'Peuple'
        },
        {
            name: 'second_empire',
            label: 'Second Empire'
        },
        {
            name: '15_eme_siecle',
            label: 'XVème siècle'
        },
        {
            name: 'bateau',
            label: 'Bâteau'
        },
        {
            name: 'mythologie',
            label: 'Mythologie'
        },
        {
            name: 'divinite',
            label: 'Divinité'
        },
        {
            name: 'russie',
            label: 'Russie'
        },
        {
            name: 'islam',
            label: 'Islam'
        },
        {
            name: 'prehistoire',
            label: 'Préhistoire'
        },
        {
            name: 'portugal',
            label: 'Portugal'
        },
        {
            name: 'nazisme',
            label: 'Nazisme'
        },
        {
            name: 'japon',
            label: 'Japon'
        },
        {
            name: 'president',
            label: 'Président'
        },
        {
            name: 'carthage',
            label: 'Carthage'
        },
        {
            name: 'oeuvre',
            label: 'Œuvre'
        },
        {
            name: 'merovingiens',
            label: 'Mérovingiens'
        },
        {
            name: 'empire',
            label: 'Empire'
        },
        {
            name: 'ww2',
            label: 'Seconde guerre mondiale'
        },
        {
            name: 'ww1',
            label: 'Première guerre mondiale'
        },
        {
            name: '18_eme_siecle',
            label: 'XVIIIème siècle'
        },
        {
            name: 'economie',
            label: 'Économie'
        },
        {
            name: '14_eme_siecle',
            label: 'XIVème siècle'
        },
        {
            name: 'autriche',
            label: 'Autriche'
        },
        {
            name: '8_eme_siecle',
            label: 'VIIIème siècle'
        },
        {
            name: 'societal',
            label: 'Sociétal'
        },
        {
            name: 'rome',
            label: 'Rome'
        },
        {
            name: '10_eme_siecle',
            label: 'Xème siècle'
        },
        {
            name: 'vikings',
            label: 'Vikings'
        },
        {
            name: 'allemagne',
            label: 'Allemagne'
        },
        {
            name: 'f1',
            label: 'Formule 1'
        },
        {
            name: 'basket-ball',
            label: 'Basket-ball'
        },
        {
            name: 'nba',
            label: 'NBA'
        },
        {
            name: 'sport_mecanique',
            label: 'Sport mécanique'
        },
        {
            name: 'real-madrid',
            label: 'Real Madrid'
        },
        {
            name: 'tennis',
            label: 'Tennis'
        },
        {
            name: 'bresil',
            label: 'Brésil'
        },
        {
            name: 'ping-pong',
            label: 'Tennis de table'
        },
        {
            name: 'jo',
            label: 'Jeux Olympiques'
        },
        {
            name: 'record',
            label: 'Record'
        },
        {
            name: 'boxe',
            label: 'Boxe'
        },
        {
            name: 'ballon-d-or',
            label: 'Ballon d\'Or'
        },
        {
            name: 'judo',
            label: 'Judo'
        },
        {
            name: 'equipe',
            label: 'Équipe'
        },
        {
            name: 'rock',
            label: 'Rock'
        },
        {
            name: 'producteur_musique',
            label: 'Producteur de musique'
        },
        {
            name: 'compositeur',
            label: 'Compositeur'
        },
        {
            name: 'baseball',
            label: 'Baseball'
        },
        {
            name: 'lotr',
            label: 'Le Seigneur des Anneaux'
        },
        {
            name: 'vetement',
            label: 'Vêtement'
        },
        {
            name: 'handball',
            label: 'Handball'
        },
        {
            name: 'champions_league_handball',
            label: 'Ligue des champions Handball'
        },
        {
            name: 'cyclisme',
            label: 'Cyclisme'
        },
        {
            name: 'tour_de_france',
            label: 'Tour de France'
        },
        {
            name: 'surf',
            label: 'Surf'
        },
        {
            name: 'rallye',
            label: 'Rallye'
        },
        {
            name: 'course',
            label: 'Course'
        },
        {
            name: 'sport_hippique',
            label: 'Sport Hippique'
        },
        {
            name: 'nhl',
            label: 'NHL'
        },
        {
            name: 'hockey_sur_glace',
            label: 'Hockey sur glace'
        },
        {
            name: 'mma',
            label: 'Mixed Martial Arts'
        },
        {
            name: 'ufc',
            label: 'UFC'
        },
        {
            name: 'six_nations',
            label: 'Tournoi des Six Nations'
        },
        {
            name: 'voile',
            label: 'Voile'
        },
        {
            name: 'nautisme',
            label: 'Nautisme'
        },
        {
            name: 'ski',
            label: 'Ski'
        },
        {
            name: 'television',
            label: 'Télévision'
        },
        {
            name: 'reseau_social',
            label: 'Réseau social'
        },
        {
            name: 'application',
            label: 'Application'
        },
        {
            name: 'twitter',
            label: 'Twitter'
        },
        {
            name: 'youtube',
            label: 'Youtube'
        },
        {
            name: 'automobile',
            label: 'Automobile'
        },
        {
            name: 'site_web',
            label: 'Site web'
        },
        {
            name: 'twitch',
            label: 'Twitch'
        },
        {
            name: 'technologie',
            label: 'Technologie'
        },
        {
            name: 'informatique',
            label: 'Informatique'
        },
        {
            name: 'publicite',
            label: 'Publicité'
        },
        {
            name: 'scolarite',
            label: 'Scolarité'
        },
        {
            name: 'campagne_politique',
            label: 'Campagne politique'
        },
        {
            name: 'meme_internet',
            label: 'Mème Internet'
        },
        {
            name: 'retro',
            label: 'Rétro'
        },
        {
            name: 'tik-tok',
            label: 'Tik-Tok'
        },
        {
            name: 'entreprise',
            label: 'Entreprise'
        },
        {
            name: 'nom_de_domaine',
            label: 'Nom de domaine'
        },
        {
            name: 'browser_game',
            label: 'Jeu par navigateur'
        },
        {
            name: 'sante',
            label: 'Santé'
        },
        {
            name: 'buzz',
            label: 'Buzz'
        },
        {
            name: 'facebook',
            label: 'Facebook'
        },
        {
            name: 'film',
            label: 'Film'
        },
        {
            name: 'acronyme-sigle',
            label: 'Acronyme et sigle'
        },
        {
            name: 'piratage',
            label: 'Piratage'
        },
        {
            name: 'organisme',
            label: 'Organisme'
        },
        {
            name: 'anglicisme',
            label: 'Anglicisme'
        },
        {
            name: 'pop',
            label: 'Pop'
        },
        {
            name: 'langage',
            label: 'Langage'
        },
        {
            name: 'chanteur',
            label: 'Chanteur'
        },
        {
            name: 'genre_musical',
            label: 'Genre musical'
        },
        {
            name: 'ost',
            label: 'OST'
        },
        {
            name: 'reggae',
            label: 'Reggae'
        },
        {
            name: 'album_musical',
            label: 'Album de musique'
        },
        {
            name: 'zouk',
            label: 'Zouk'
        },
        {
            name: 'eurovision',
            label: 'Eurovision'
        },
        {
            name: 'nintendo',
            label: 'Nintendo'
        },
        {
            name: 'nintendo_ds',
            label: 'Nintendo DS'
        },
        {
            name: 'wii',
            label: 'Wii'
        },
        {
            name: 'minecraft',
            label: 'minecraft'
        },
        {
            name: 'sandbox',
            label: 'sandbox'
        },
        {
            name: 'fps',
            label: 'FPS'
        },
        {
            name: 'dystopie',
            label: 'Dystopie'
        },
        {
            name: 'metier',
            label: 'Métier'
        },
        {
            name: 'mario',
            label: 'Mario'
        },
        {
            name: 'antagoniste',
            label: 'Antagoniste'
        },
        {
            name: 'beat_them_all',
            label: 'Beat them all'
        },
        {
            name: 'ps2',
            label: 'Playstation 2'
        },
        {
            name: 'jeu_gestion',
            label: 'Jeu de gestion'
        },
        {
            name: 'ea_games',
            label: 'EA Games'
        },
        {
            name: 'tps',
            label: 'TPS'
        },
        {
            name: 'ps3',
            label: 'Playstation 3'
        },
        {
            name: 'album_bd',
            label: 'Album de bande dessinée'
        },
        {
            name: 'poker',
            label: 'Poker'
        },
        {
            name: 'patois-argot',
            label: 'Patois et argot'
        },
        {
            name: 'verne',
            label: 'Verne'
        },
        {
            name: 'roman',
            label: 'Roman'
        },
        {
            name: 'stephen_king',
            label: 'Stephen King'
        },
        {
            name: 'circulation',
            label: 'Circulation'
        },
        {
            name: 'autoroute',
            label: 'Autoroute'
        },
        {
            name: 'physiologie',
            label: 'Physiologie'
        },
        {
            name: 'protestantisme',
            label: 'Protestantisme'
        },
        {
            name: 'pologne',
            label: 'Pologne'
        },
        {
            name: 'rnb',
            label: 'RnB'
        },
        {
            name: 'communisme',
            label: 'Communisme'
        },
        {
            name: 'groupe_musique',
            label: 'Groupe de musique'
        },
        {
            name: 'chanson_americaine',
            label: 'Chanson américaine'
        },
        {
            name: 'variete_francaise',
            label: 'Variété française'
        },
        {
            name: 'star_wars',
            label: 'Star Wars'
        },
        {
            name: 'dj',
            label: 'DJ'
        },
        {
            name: 'house',
            label: 'House'
        },
        {
            name: 'label_musical',
            label: 'Label de musique'
        },
        {
            name: 'accessoire_jv',
            label: 'Accessoire de jeu vidéo'
        },
        {
            name: 'dlc',
            label: 'DLC'
        },
        {
            name: 'wow',
            label: 'World of Warcraft'
        },
        {
            name: 'rockstar_games',
            label: 'Rockstar Games'
        },
        {
            name: 'zombie',
            label: 'Zombie'
        },
        {
            name: 'steampunk',
            label: 'Steampunk'
        },
        {
            name: 'jeu_plateforme',
            label: 'Jeu de plateforme'
        },
        {
            name: 'microsoft',
            label: 'Microsoft'
        },
        {
            name: 'rts',
            label: 'RTS'
        },
        {
            name: 'psx',
            label: 'Playstation'
        },
        {
            name: 'pokemon',
            label: 'Pokemon'
        },
        {
            name: 'gameboy',
            label: 'Game Boy'
        },
        {
            name: 'collectionneur',
            label: 'Collectionneur'
        },
        {
            name: 'postal',
            label: 'Postal'
        },
        {
            name: 'cuisine',
            label: 'Cuisine'
        },
        {
            name: 'latin',
            label: 'Latin'
        },
        {
            name: 'parc_attractions',
            label: 'Parc d\'attractions'
        },
        {
            name: 'fruit',
            label: 'Fruit'
        },
        {
            name: 'signalisation',
            label: 'Signalisation'
        },
        {
            name: 'medecine',
            label: 'Médecine'
        },
        {
            name: 'cosmetique',
            label: 'Cosmétique'
        },
        {
            name: 'calendrier',
            label: 'Calendrier'
        },
        {
            name: 'trophee',
            label: 'Trophée'
        },
        {
            name: 'vs_fighting',
            label: 'Versus Fighting'
        },
        {
            name: 'opera',
            label: 'Opéra'
        },
        {
            name: 'nu-metal',
            label: 'Nu metal'
        },
        {
            name: 'solfege',
            label: 'Solfège'
        },
        {
            name: 'instrument_musique',
            label: 'Instrument de musique'
        },
        {
            name: 'mmorpg',
            label: 'MMORPG'
        },
        {
            name: 'rpg',
            label: 'RPG'
        },
        {
            name: 'mmorts',
            label: 'MMORTS'
        },
        {
            name: 'personnage_jv',
            label: 'Personnage de jeu vidéo'
        },
        {
            name: 'jeu_aventure',
            label: 'Jeu d\'aventure'
        },
        {
            name: 'assassins_creed',
            label: 'Assassin\'s Creed'
        },
        {
            name: 'sega',
            label: 'Sega'
        },
        {
            name: 'indy_game',
            label: 'Indy game'
        },
        {
            name: 'mgs',
            label: 'Metal Gear Solid'
        },
        {
            name: 'ps4',
            label: 'Playstation 4'
        },
        {
            name: 'dreamcast',
            label: 'Dreamcast'
        },
        {
            name: 'ville_fictive',
            label: 'Ville fictive'
        },
        {
            name: 'resident_evil',
            label: 'Resident Evil'
        },
        {
            name: 'point_and_click',
            label: 'Point and click'
        },
        {
            name: 'philosophie',
            label: 'Philosophie'
        },
        {
            name: 'citation',
            label: 'Citation'
        },
        {
            name: 'proverbe',
            label: 'Proverbe'
        },
        {
            name: 'festival',
            label: 'Festival'
        },
        {
            name: 'radio',
            label: 'Radio'
        },
        {
            name: 'genealogie',
            label: 'Généalogie'
        },
        {
            name: 'astrologie',
            label: 'Astrologie'
        },
        {
            name: 'expression',
            label: 'Expression'
        },
        {
            name: 'bacterie',
            label: 'Bactérie'
        },
        {
            name: 'mathematiques',
            label: 'Mathématiques'
        },
        {
            name: 'fleuve',
            label: 'Fleuve'
        },
        {
            name: 'rugby',
            label: 'Rugby'
        },
        {
            name: 'biopic',
            label: 'Biopic'
        },
        {
            name: 'mascotte',
            label: 'Mascotte'
        },
        {
            name: 'sony',
            label: 'Sony'
        },
        {
            name: 'valve',
            label: 'Valve'
        },
        {
            name: 'oenologie',
            label: 'Œnologie'
        },
        {
            name: 'soul',
            label: 'Soul'
        },
        {
            name: 'influenceur',
            label: 'Influenceur'
        },
        {
            name: 'danse',
            label: 'Danse'
        },
        {
            name: 'ecologie',
            label: 'Écologie'
        },
        {
            name: 'metal',
            label: 'Metal'
        },
        {
            name: 'dubstep',
            label: 'Dubstep'
        },
        {
            name: 'tube_ete',
            label: 'Tube de l\'été'
        },
        {
            name: 'jeu_video',
            label: 'Jeu-vidéo'
        },
        {
            name: 'smartphone',
            label: 'Smartphone'
        },
        {
            name: 'jeu_infiltration',
            label: 'Jeu d\'infiltration'
        },
        {
            name: 'cod',
            label: 'Call of Duty'
        },
        {
            name: 'arcade',
            label: 'Arcade'
        },
        {
            name: 'console',
            label: 'Console'
        },
        {
            name: 'moba',
            label: 'MOBA'
        },
        {
            name: 'studio_jv',
            label: 'Studio de jeux vidéo'
        },
        {
            name: 'xbox360',
            label: 'Xbox 360'
        },
        {
            name: 'jeu_sport',
            label: 'Jeu de sport'
        },
        {
            name: 'protagoniste',
            label: 'Protagoniste'
        },
        {
            name: 'gamecube',
            label: 'Gamecube'
        },
        {
            name: 'ninja',
            label: 'Ninja'
        },
        {
            name: 'xbox',
            label: 'Xbox'
        },
        {
            name: 'the_elder_scrolls',
            label: 'The Elder Scrolls'
        },
        {
            name: 'jeu_carte',
            label: 'Jeu de cartes'
        },
        {
            name: 'boisson',
            label: 'Boisson'
        },
        {
            name: 'ceremonie',
            label: 'Céremonie'
        },
        {
            name: 'patisserie',
            label: 'Pâtisserie'
        },
        {
            name: 'alien',
            label: 'Alien'
        },
        {
            name: 'rap',
            label: 'Rap'
        },
        {
            name: 'musique_classique',
            label: 'Musique classique'
        },
        {
            name: 'open_world',
            label: 'Open world'
        },
        {
            name: 'tintin',
            label: 'Tintin'
        },
        {
            name: 'monnaie',
            label: 'Monnaie'
        },
        {
            name: 'ferroviaire',
            label: 'Ferroviaire'
        },
    ]

    try {
        for (const type of types) {
            const newType = await db.QuestionType.create({
                name: type.name,
                label: type.label
            })
        }

        for (const category of categories) {
            const newCategory = await db.Category.create({
                name: category.name,
                label: category.label
            })
        }

        for (const tag of tags) {
            const newTag = await db.Tag.create({
                name: tag.name,
                label: tag.label
            })
        }

        const questionFiles = await fs.promises.readdir('./scripts/questions');

        for (const questionFile of questionFiles) {
            const questionsInJSON = yaml.load(await fs.promises.readFile(`./scripts/questions/${questionFile}`, 'utf-8'));

            for (const question of questionsInJSON) {
                const newQuestion = await db.Question.create({
                    content: question.content,
                    isHardcore: question.isHardcore,
                    status: question.status,
                    answer: question.answer
                })

                for (const type of question.types) {
                    const completeType = await db.QuestionType.findAll({
                        where: {
                            name: type
                        }
                    })
                    await newQuestion.addType(completeType)
                }

                for (const category of question.categories) {
                    const completeCategory = await db.Category.findAll({
                        where: {
                            name: category
                        }
                    })
                    await newQuestion.addCategory(completeCategory);
                }

                if (question.hasOwnProperty('tags')) {
                    for (const tag of question.tags) {
                        const completeTag = await db.Tag.findAll({
                            where: {
                                name: tag
                            }
                        })
                        await newQuestion.addTag(completeTag);
                    }
                }
            }
        }

        await transaction.commit();
    } catch (error) {
        console.error(error);
        await transaction.rollback();
    }
})()
