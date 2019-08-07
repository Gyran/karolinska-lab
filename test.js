const u = new URL('http://www.1177.se/Stockholm/Hitta-vard/Stockholm/Kontakt/Laboratoriet-Bagarmossen-Karolinska-Universitetslaboratoriet/')

u.protocol = 'https';

console.log('u', u);

const getLabInfo = require('./get-lab-info');

const doit = async () => {
  const url = 'https://www.karolinska.se/for-patienter/alla-mottagningar-och-avdelningar-a-o/funktion-karolinska-universitetslaboratoriet/lnp/sodra-stockholm/laboratoriet-bagarmossen/';
  const labInfo = await getLabInfo(url);

  console.log(labInfo);
};

doit();
