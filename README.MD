# Personal CLI Scripts with node.js and #!

Een Node js script, uit te voeren in bash terminal. In een eenvoudig systeem, nooit meer cli commands hoeven maken met bash, maar nu met NodeJs, hoe cool is dat!

Met dit script kan je in je bash terminal snel je basis genereren voor een lit-webcomponent, cli-command: `jj generate lit [component-name]`
Uiteraard kan je dit script uitbreiden met een variant voor React/Vue/Angular/anything

Het genereert de volgende bestanden met de juiste naamvoering:

file | omschrijving
---|---
`[naam].ts` | Voor rollup de root van het component;
`components/[naam]/index.ts` | Index van je component;
`components/[naam]/[naam].ts` | Hét Lit component;
`components/[naam]/[naam].stories.ts` | De basis setup voor een compenent in Storybook;
`components/[naam]/[naam].test.ts` | De basis setup e2e met Playwright, vanuit Storybook.

> Het script checkt of je wel in een folder staat met een **components** folder, anders word je gevraag dat te crëeeren of te aborten.

> Het script het een vrij degelijke help functie: `jj -h` of `jj -help`


## Motivation

Voor eigen projecten ben ik niet zo lang geleden begonen om mijn repo's in een **mono-repo** te zetten. Eerst heel eenvoudig het concept, alleen met Yarn, maar al snel kwam ik met **Nx van Nrwl** in aanraking. Na dat uitgebreid te hebben getest, met verschillende frameworks te hebben gecombineerd, was **mijn conclusie** dat mijn aandacht vooral verschoven was naar het maken van Nx.generators en Nx.executors, en daarmee veel nog meer tijd kwijt met het schrijven van secundare code, **totale over kill** dus.

Nx heb ik weer laten vallen, ingeruild voor **Turborepo**, ik ben helemaal gelukkig, tot nu toe... Alleen het concept van generators is nog wel bij me blijven hangen, en daar is natuurlijk een fantastische simpele oplossing voor: **Shahbang scripts!** Of #! scripts.

Het is relatief snel op te zetten, geen complexe api, en het levert je een grote mate van consistentie en snelheid op bij heel veel repetatieve taken.

## Installatie

* Clone deze repo in je home folder (windows): `C:/Users/[username]`, rename de folder van deze repo naar `.js`
* Voeg de line in `.zshrc` toe aan je eigen config, of aan je `.bashrc` file, te vinden in (Windows) `C:/Users/[username]`
* In de `.js` installeer de **node_modules**: `npm install`
* Nou zou je vanaf ieder pad in je bash terminal het **jj** script moeten kunnen uitvoeren. test: `jj -h`, voor de help functie

> Je kan uiteraard het script van naam veranderen, nieuwe scripts toevoegen: de naam van je script (zonder extensie) is gelijk de naam van cli command

## Coolness

Wat dit zo cool maakt is natuurklijk de `#!` line boven aan het script

```js
#!/usr/bin/env -S NODE_PATH='C:/Users/jorne/.js/node_modules' ESM_OPTIONS='{cache:false,await:true}' node -r esm -r globals
```

code | omschrijving
---|---
`#!/usr/bin/env` | de basis om vanauit bash een script uit te voeren
`-S` | ehh, niet zeker, maar volgens mij geef je met deze flag aan dat je env-variables aan je script toevoegt
`NODE_PATH='C:/Users/jorne/.js/node_modules'` | het pad naar je node modules die worden gebruikt bij dit script
`ESM_OPTIONS='{cache:false,await:true}'` | als cache aan staat laat het op de plek waar je dit uitvoert cache-files achter; met `await` kan je root awaits uitvoeren.
`node` | geeft aan dat je dit met node uitvoert, uiteraard
`-r esm` | dat het esm modules zijn: gebruik van imports en exports
`-r globals` | handigheidje om node-modules te gebuiken als extentie van wat je standaart krijg met Node.js. Door globals te importeren kan je alles wat daarin de index geexporteert wordt in al je cli scripts gebruiken, super slik. 

## ToDo

* Ondanks dat dit een presoonlijke set van scripts is, lijkt het me cool om via git gists (of gewoon een repo) dit als een npx script te kunnen gebruiken, misschien wel binnen een organisatie.