$('#FindButton').click(function () {
  let text = null;

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
    let textPunctuationLess = $('#InputText').val().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=_`~()]/g,"");
    text = textPunctuationLess.replace(/\s{2,}/g," ").split(" ");
    filterVoid(text, function (filter) {
      count(filter);
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
  console.log(PositifWord);
  let NegatifWord = $('#NegatifWords').val().toLowerCase().replace(/\r?\n|\r/g," ").split(" ");
  console.log(NegatifWord);
  let YesNoWords = $('#YesNoWords').val().toLowerCase().replace(/\r?\n|\r/g," ").split(" ");
  console.log(YesNoWords);
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
  $('#resultPosNeg').html("Nombre de mot positif + nombre de mot Négatif / total" + "</br>" + "(" + PositifCount + " - " + NegatifCount + ") / (" + (PositifCount + NegatifCount) + ")" + " = " + result);
  $('#YesNoRes').html("Nombre de mot incertain / nombre de mot total" + "</br>" + YesNoCount + "/" + text.length + " = " + UNC);
}
