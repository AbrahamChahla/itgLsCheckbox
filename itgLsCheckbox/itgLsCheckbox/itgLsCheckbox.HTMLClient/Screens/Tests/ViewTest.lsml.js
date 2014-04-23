/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewTest.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.Test.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.Test." + name, function (value) {
        contentItem.screen.details.displayName = value;
    });
}

