$('#FindButton').click(function () {
  let text = null;
  NumberOfSyllable = 0;
  console.log($("#uploadFile").val());
  if($("#uploadFile").val()) {
    $.post('pdf', { name: "John", time: "2pm" },  function (data) {
      let pdf = data;
      let textPunctuationLess = data.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=_`~()]/g,"");
      text = textPunctuationLess.replace(/\s{2,}/g," ").split(" ");
      filterVoid(text, function (filter) {
        count(filter);
      });
    });

  } else {
    console.log("No file upload");
    let text = $('#InputText').val().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=_`~()]\s{2,}/g," ").trim().split(" ");
    console.log(text);
    //replace(/\s{2,}/g," ")
    filterVoid(text, function (TextFiltered) {
      $.post('syllable', {text: TextFiltered}, function (NumberOfSyllableTotal) {
        NumberOfSyllable = NumberOfSyllableTotal;
        count(TextFiltered);
      });
    });
  }


});

function filterVoid(array, callback) {
  var filtered = array.filter(function (el) {
    return el != "";
  });
  callback(filtered);
}

function count(text) {
  let PositifWord = $('#PositifWords').val().toLowerCase().replace(/\r?\n|\r/g," ").split(" ");
  console.log("POSITIF : ", PositifWord);
  let NegatifWord = $('#NegatifWords').val().toLowerCase().replace(/\r?\n|\r/g," ").split(" ");
  console.log("NEGATIF : ", NegatifWord);
  let YesNoWords = $('#YesNoWords').val().toLowerCase().replace(/\r?\n|\r/g," ").split(" ");
  console.log("INCERTAIN :", YesNoWords);
  let PositifCount = 0;
  let NegatifCount = 0;
  let YesNoCount = 0;

  text.forEach(function (mot) {
    if(jQuery.inArray(mot, PositifWord ) != -1) {
      PositifCount += 1;
    }
    if(jQuery.inArray(mot, NegatifWord ) != -1) {
      NegatifCount += 1;
    }
    if(jQuery.inArray(mot, YesNoWords) != -1) {
      YesNoCount += 1;
    }
  });

  let result = (PositifCount - NegatifCount) / (PositifCount + NegatifCount);
  let UNC = YesNoCount / text.length;
  $('#resultPosNeg').html("Nombre de mot positif - nombre de mot Négatif / total" + "</br>" + "(" + PositifCount + " - " + NegatifCount + ") / (" + (PositifCount + NegatifCount) + ")" + " = " + result);
  $('#YesNoRes').html("Nombre de mot incertain / nombre de mot total" + "</br>" + YesNoCount + "/" + text.length + " = " + UNC);
  $('#syllable').html("Nombre de syllable total : " + NumberOfSyllable);
  readability(text.length ,NumberOfSyllable);
}

function readability(words, syllables) {
  let sentences = $('#InputText').val().match(/[\w|\)][.?!](\s|$)/g).length + 1; //Permet d'avoir le nombre de phrase (+1 car ça compte le nombre de letter . whitespace)
  console.log("WORDS : ", words);
  console.log("sentences :", sentences);
  let total = 206.835 - 1.015*(words/sentences) - 84.6 * (syllables/words);
  console.log("readability : " , total);
}
