'use strict'

const utils = require('./lib/utils')

const str = `La saison d’activités 2016-2017 commence, notre rencontre mensuelle des contributeurs est toujours au rendez-vous. Le format évolue : cette année, nous troquons la rencontre informelle autour d’un verre par une rencontre de travail ayant pour but d’améliorer directement les données d’OpenStreetMap.
En groupe, nous pourrons ainsi mener à bien les tâches de notre choix (n’oubliez pas, on contribue à OpenStreetMap parce qu’on aime ça) : importer de données de la Ville, de Canvec, répondre aux appels de HOT et Missing Maps… et pourquoi pas réaliser nos propres projets ? Débutants, vous êtes les bienvenus ! Nous serons présents pour vous montrer comment contribuer à l’aide d’iD, l’éditeur de données en ligne et facile à utiliser, ou de JOSM. Dans tous les cas, prenez votre ordinateur portable avec vous, la salle dans laquelle nous nous trouverons n’est pas équipée de machines de prêt.
La première rencontre le mercredi 5 octobre dès 18h30 à la Grande bibliothèque de BAnQ, au 475 boulevard de Maisonneuve est (métro Berri-UQÀM). Nous serons présents dans la salle 2.181 : au second étage en sortant des ascenseurs, continuez tout droit jusqu’aux vitres, la salle sera dans le couloir à votre droite.
L’atelier est gratuit et ouvert à tous. Pour des questions d’organisation de cette première édition, nous aurons besoin d’avoir une estimation du nombre de participants, merci d’indiquer votre présence en répondant via ce sondage.`

const str2 = `La saison d’activités 2016-2017 commence, notre rencontre mensuelle des contributeurs est toujours au rendez-vous. Le format évolue : cette année, nous troquons la rencontre informelle autour d’un verre par une rencontre de travail ayant pour but d’améliorer directement les données d’OpenStreetMap.
En groupe, nous pourrons ainsi mener à bien les tâches de notre choix (n’oubliez pas, on contribue à OpenStreetMap parce qu’on aime ça) : importer de données de la Ville, de Canvec, répondre aux appels de HOT et Missing Maps… et pourquoi pas réaliser nos propres projets ? Débutants, vous êtes les bienvenus ! Nous serons présents pour vous montrer comment contribuer à l’aide d’iD, l’éditeur de données en ligne et facile à utiliser, ou de JOSM. Dans tous les cas, prenez votre ordinateur portable avec vous, la salle dans laquelle nous nous trouverons n’est pas équipée de machines de prêt.

La première rencontre le mercredi 5 octobre dès 18h30 à la Grande bibliothèque de BAnQ, au 475 boulevard de Maisonneuve est (métro Berri-UQÀM). Nous serons présents dans la salle 2.181 : au second étage en sortant des ascenseurs, continuez tout droit jusqu’aux vitres, la salle sera dans le couloir à votre droite.
L’atelier est gratuit et ouvert à tous. Pour des questions d’organisation de cette première édition, nous aurons besoin d’avoir une estimation du nombre de participants, merci d’indiquer votre présence en répondant via ce sondage.`

const x = utils.autoParagraphs(str)
console.log(x)

const x2 = utils.autoParagraphs(str2)
console.log(x2)

const x3 = utils.forceParagraphs(str2)
console.log(x3)
