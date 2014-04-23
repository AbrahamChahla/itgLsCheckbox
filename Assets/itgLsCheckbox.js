// ============================================================================================
// itgLsCheckbox.js
// Convert a boolean to a checkbox control
// Control in the designer should be changed to a Custom Control
// Based on the work of the following folks, many thanks go out to them:
//		http://jewellambert.com/using-jquery-mobile-radio-buttons-in-lightswitch/
//		http://blogs.msdn.com/b/lightswitch/archive/2013/07/15/extending-screens-for-multi-select-in-the-lightswitch-html-client-mike-droney.aspx
//
//
// options = { 
//		text: Text you want to display to the right of the checkbox
//		textCssClass: CSS Class you want to have the text displayed as
//		cssClass: Parent CSS Class you want for the checkbox
//		onChange: UDF that the system will use when the control is clicked, changed
//			parameters: isChecked (true/false), eventObject
//	}
//
// For most of folks, using the contentItem.dataBind is a better way of working with
// value changes based on the checkbox vs the onChange.  Use the onChange when you are
// working with a Screen Property and want to update dissimilar data field.  But then again
// you can still use the contentItem.dataBind.  So the onChange may go away.
//
// ============================================================================================
// There can be a lot more error checking, but this is free... so figure it out! :)
// ============================================================================================


// Does our namespace exist
window.itgLs = window.itgLs || {};
window.itgLs.ui = window.itgLs.ui || {};


(function () {


	// ============================================================================================
	// Render/initialize a LS Custom Control to be a checkbox
	// ============================================================================================
	var render = function (element, contentItem, options) {

		// Make a spot for our data
		contentItem.itgLs = contentItem.itgLs || {};
		contentItem.itgLs.checkbox = contentItem.itgLs.checkbox || {};

		// Shortcut to our data in the contentItem
		var ckBox = contentItem.itgLs.checkbox;

		// Stuff the passed options into our contentItem properties
		options = options || {};
		ckBox.cssClass = options.cssClass || "itgLs-checkbox";
		ckBox.checkedCssClassForText = options.checkedCssClassForText;
		ckBox.uncheckedCssClassForText = options.uncheckedCssClassForText;
		ckBox.text = options.text;

		// Make sure we have a default change handler, we pass a boolean for checked/unchecked
		ckBox.onChange = options.onChange || function (isChecked) {
			contentItem.value = isChecked;
		};

		// Create a unique ID for our control, we don't consistently know the pageId until later, so we can't use that
		ckBox.controlId = contentItem.screen.details._modelId + "-" + contentItem.name;

		// We use the following to create our accompaning label/text, if any
		// 1. text property in passed options takes priority, pass an empty string for no label
		// 2. if no text property, look at the description field of the contentItem
		// 3. if no description text, use displayName, only if label position is None
		if (ckBox.text === undefined) {
			if (contentItem.description == undefined) {
				ckBox.text = contentItem.properties.attachedLabelPosition == "None" ? contentItem.displayName : "";
			} else {
				ckBox.text = contentItem.description;
			}
		}

		// Make sure we're all trimmed up
		ckBox.text = ckBox.text.trim();

		// Create the HTML for the Wrapper, Input and Label controls
		var $container = $('<div class="msls-clear msls-vauto">');
		var $checkBoxInput = $('<input type="checkbox" id="' + ckBox.controlId + '" />');
		var $label = $('<label for="' + ckBox.controlId + '">' + ckBox.text + '</label>');

		// Add our checkbox and label to the container, then the container to the element
		$checkBoxInput.appendTo($container);
		$label.appendTo($container);
		$container.appendTo(element);

		// Add the passed cssClass to the parent, else we use the default
		if (ckBox.cssClass) $(element).addClass(ckBox.cssClass);

		// if there is no text to display, tell the parent, make sure there is a space for the label, for sizing
		if (ckBox.text == "") {
			$label[0].innerHTML = "&nbsp;";
			$(element).addClass("noLabelCheckbox");
		}

		// Make sure our events don't bubble up
		$checkBoxInput.on('click', function(eventObj) {
			 eventObj.stopPropagation();
		});
		$label.on('click', function (eventObj) {
			eventObj.stopPropagation();
		});

		// Add the UDF to the change event of the checkbox, passed values: checked or not, event obj
		$checkBoxInput.change(function (eventObj) {
			ckBox.onChange($checkBoxInput[0].checked, eventObj);
		});

		// Now lets add the container to our contentItem for the ability to reference later
		ckBox.container = $container;


		// ============================================================================================
		// Make sure our styles get applied before the page is shown
		// ============================================================================================
		$(document).one('pagebeforeshow', function () {
			updateTextClasses(contentItem);
		});


		// ============================================================================================
		// Lets do a dataBind so the UI gets updated if underlying value changes
		// ============================================================================================
		contentItem.dataBind("value", function (isChecked) {

			// Stuff our HTML input control with the new value
			$checkBoxInput[0].checked = isChecked;

			// Make sure the control has been rendered, then refresh the UI
			if (contentItem._view.isRendered) {
				$checkBoxInput.checkboxradio("refresh");
				updateTextClasses(contentItem);
			}

		});

	};


	// ============================================================================================
	// Helper function to update the classes of our label/text
	// ============================================================================================
	var updateTextClasses = function (contentItem) {

		// Shortcut to our data in the contentItem
		var ckBox = contentItem.itgLs.checkbox;

		// Do we have our text element, if not go find it, once
		if (ckBox.btnTextElement == undefined)
			ckBox.btnTextElement = $(ckBox.container).parent().find(".ui-btn-text");

		// Update the text css as defined previously
		if (contentItem.value) {
			$(ckBox.btnTextElement).removeClass(ckBox.uncheckedCssClassForText);
			$(ckBox.btnTextElement).addClass(ckBox.checkedCssClassForText);
		} else {
			$(ckBox.btnTextElement).removeClass(ckBox.checkedCssClassForText);
			$(ckBox.btnTextElement).addClass(ckBox.uncheckedCssClassForText);
		}

	};


	// ============================================================================================
	// Helper function to change the text of the control, optional css classes to add/remove
	// ============================================================================================
	var setText = function (contentItem, text, classToAdd, classToRemove) {

		// Shortcut to our data
		var ckBox = contentItem.itgLs.checkbox;

		// Do we have our text element, if not go find it, once
		if (ckBox.btnTextElement == undefined)
			ckBox.btnTextElement = $(ckBox.container).parent().find(".ui-btn-text");

		if (ckBox.btnTextElement.length > 0) {
			ckBox.btnTextElement[0].innerHTML = text;

			if (classToRemove)
				$(ckBox.btnTextElement).removeClass(classToRemove);

			if (classToAdd)
				$(ckBox.btnTextElement).addClass(classToAdd);
		}
	};


	// ============================================================================================
	// Helper function to add a css class for the text of the control
	// ============================================================================================
	var addCssClassForText = function (contentItem, cssClass) {

		// Shortcut to our data
		var ckBox = contentItem.itgLs.checkbox;

		// Do we have our text element, if not go find it, once
		if (ckBox.btnTextElement == undefined)
			ckBox.btnTextElement = $(ckBox.container).parent().find(".ui-btn-text");

		if (ckBox.btnTextElement.length > 0)
			$(ckBox.btnTextElement).addClass(cssClass);

	};


	// ============================================================================================
	// Helper function to remove a css class for the text of the control
	// ============================================================================================
	var removeCssClassForText = function (contentItem, cssClass) {

		// Shortcut to our data
		var ckBox = contentItem.itgLs.checkbox;

		// Do we have our text element, if not go find it, once
		if (ckBox.btnTextElement == undefined)
			ckBox.btnTextElement = $(ckBox.container).parent().find(".ui-btn-text");

		if (ckBox.btnTextElement.length > 0)
			$(ckBox.btnTextElement).removeClass(cssClass);

	};


	// ============================================================================================
	// Helper function to initialize a checkbox elements styles, we have to wait for all to be rendered
	// ============================================================================================
	var initializeCss = function (element, css) {
		
		$(document).one('pagebeforeshow', function () {
			$("div", element).css(css);
		});

	}


	// ============================================================================================
	// What are we going to expose 
	// ============================================================================================
	window.itgLs.ui.checkbox = {
		render: render,
		setText: setText,
		initializeCss: initializeCss,
		addCssClassForText: addCssClassForText,
		removeCssClassForText: removeCssClassForText,
		updateTextClasses: updateTextClasses

	};

}());
