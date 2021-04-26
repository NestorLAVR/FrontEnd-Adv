function translatePigLatin(str) {
    var firstConsonant = str.match(/[b-df-hj-np-tv-z]+/);
    str.indexOf(firstConsonant) == 0?
     str = str.replace(firstConsonant, '') + firstConsonant + 'ay':
     str = str + 'way'
    return str;
  }
  
  translatePigLatin("consonant");