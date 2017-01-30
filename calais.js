'use strict'

// self
const utils = require('./lib/utils')

const str = `Contribuez à l’enrichissement de Wikisource, une bibliothèque numérique mondiale, par l’édition de textes québécois en format wiki. Encadrement et formation offerts sur place gratuitement!

Non seulement nous vous donnerons un aperçu du projet et de ses objectifs lors de ces ateliers, mais nous vous montrerons sur place à faire la correction des textes et de la mise-en-page, et ainsi, vous pourrez contribuer à ce grand projet de diffusion de notre patrimoine littéraire national à l’échelle mondiale grâce à l’interface de Wikisource... Venez passer 30 minutes, 1 heure ou bien 3 heures! L’important, c’est de trouver une tâche qui vous intéresse et dans laquelle vous vous sentez à l’aise. Chaque mois, nous aurons comme objectif de publier un livre complet lors de ces ateliers.

En collaboration avec Wikimédia Canada`

const str2 = `ConFoo is a multi-technology conference for web developers.

150 presentations by popular international speakers.
Focused on pragmatic solutions for web developers.
Great content and amazing experience.`

utils.calais(str2)
  .then((x) => {
    console.log(x.headers)
    console.log(JSON.stringify(x.body, null, '  '))
  })
  .catch(console.error)
