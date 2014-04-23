/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.AddEditTest.Test_Boolean1_render = function (element, contentItem) {

	// Render our custom control as a checkbox
	itgLs.ui.checkbox.render(element, contentItem, {
		text: contentItem.value ? "This is true" : "This is False",
		checkedCssClassForText: "green-bold",
		uncheckedCssClassForText: "red-small-bold"
	});

	// We will change both Text and CSS when the value changes
	contentItem.dataBind("value", function (newValue) {

		// Make sure the view (html) has been rendered before we try to modify it
		if (contentItem._view.isRendered) {

			// Create new text for displaying, if desired
			var txt = newValue ? "This is True" : "This is False";

			// Call our helper function to set the text
			itgLs.ui.checkbox.setText(contentItem, txt);
		}

	});

};
myapp.AddEditTest.Test_Boolean2_render = function (element, contentItem) {

	// Render our custom control as a checkbox
	itgLs.ui.checkbox.render(element, contentItem, {
		text: contentItem.value ? "My favorite color is green" : "My favorite color is blue",
		checkedCssClassForText: "green-bold",
		uncheckedCssClassForText: "blue-bold"
	});

	// We will change both Text and CSS when the value changes
	contentItem.dataBind("value", function (newValue) {

		// Make sure the view (html) has been rendered before we try to modify it
		if (contentItem._view.isRendered) {

			// Create new text for displaying, if desired
			var txt = newValue ? "My favorite color is green" : "My favorite color is blue";

			// Call our helper function to set the text
			itgLs.ui.checkbox.setText(contentItem, txt);
		}

	});

};
myapp.AddEditTest.Test_Boolean3_render = function (element, contentItem) {
	itgLs.ui.checkbox.render(element, contentItem);
};
myapp.AddEditTest.Test_Boolean4_render = function (element, contentItem) {

	// Render our custom control as a checkbox
	itgLs.ui.checkbox.render(element, contentItem, {
		text: ""
	});

};