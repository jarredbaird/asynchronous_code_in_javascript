const BASE_URL = "http://numbersapi.com/";

$("#set-fav").on("click", function (event) {
  event.preventDefault();
  $("#fav-num-cur").text($("#fav-num-val").val());
  $("#fav-num-val").val(null);
});

$("#add-field").on("click", function (event) {
  event.preventDefault();
  let newId = 1 + parseInt($("#multi-span").children().last().attr("id"));
  $("#multi-span").append(
    $("<br>"),
    $("<label>").attr("for", newId).text(`Number ${newId} `),
    $("<input>").attr({ id: newId, type: "number", name: "fav-num" })
  );
});

$("#remove-field").on("click", function (event) {
  event.preventDefault();
  $("#multi-span").children().last().remove();
  $("#multi-span").children().last().remove();
  $("#multi-span").children().last().remove();
});

$("#set-multi-num").on("click", function (event) {
  event.preventDefault();
  $("#multi-num-cur").empty();
  $("#multi-span")
    .find("input")
    .each(function () {
      if ($(this).val()) {
        $("#multi-num-cur").append($("<li>").text($(this).val()));
      }
    });
});

$("#fav-facts-submit").on("click", async function (event) {
  event.preventDefault();
  $("#fav-list").empty();
  for (let i = 0; i < 4; i++) {
    $("#fav-list").append(
      $("<li>").text(await getNumFact($("#fav-num-cur").text()))
    );
  }
});

$("#multi-fact-submit").on("click", async function (event) {
  event.preventDefault();
  $("#multi-list").empty();
  let reqArgs = "";
  $("#multi-num-cur")
    .children()
    .each(function () {
      reqArgs += `${$(this).text()},`;
    });

  let reqStr = reqArgs.substr(0, reqArgs.length - 1);
  let response = await getNumFact(reqStr);
  for (let numFact in response) {
    $("#multi-list").append($("<li>").text(response[numFact]));
  }
});

async function getNumFact(num) {
  let response = await fetch(`${BASE_URL}${num}?json`).then((response) =>
    response.json()
  );
  if (response.text) {
    return response.text;
  } else {
    return response;
  }
}
