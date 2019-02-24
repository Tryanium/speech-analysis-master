$('#FindButton').click(function () {
  let PositifWord = $('#PositifWords').val().toLowerCase().split(" ");
  let NegatifWord = $('#NegatifWords').val().toLowerCase().split(" ");
  let textPunctuationLess = $('#InputText').val().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=_`~()]/g,"");
  let text = textPunctuationLess.replace(/\s{2,}/g," ").split(" ");
  let PositifCount = 0;
  let NegatifCount = 0;
  text.forEach(function (mot) {
    if(jQuery.inArray(mot, PositifWord ) != -1) {
      PositifCount += 1;
    }
    if(jQuery.inArray(mot, NegatifWord ) != -1) {
      NegatifCount += 1;
    }
  });
  let result = (PositifCount - NegatifCount) / (PositifCount + NegatifCount);
  $('#result').html("Nombre de mot positif + nombre de mot Négatif / total" + "</br>" + "(" + PositifCount + " - " + NegatifCount + ") / (" + (PositifCount + NegatifCount) + ")" + " = " + result);
});
