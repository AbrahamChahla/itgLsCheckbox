#itgLsCheckbox
This quick tutorial will show you how to turn a LightSwitch boolean property into a checkbox.

You can download the code and sample project from our repository at **[GitHub](https://www.github.com/dwm9100b/itgLsCheckbox)**.  
You'll find the Stylesheet and JavaScript for this tutorial in the Assets folder..

And... we created a [video] on how to use the library if that suits your learning style better.

##Project Setup	
1. Create a new Visual Studio LightSwitch HTML Client
2. Create a new Table named Test with the following properties
	* Boolean1, Boolean, not required
	* Boolean2, Boolean, not required
	* Boolean3, Boolean, not required
	* Boolean4, Boolean, not required
3. Create the associated Browse/Add/Edit screens for your table
4. Save and build your solution
5. Run your app, add some records
6. Close the app, return to Visual Studio
7. Right click on the HTML Client project Content folder
8. Add existing item, navigate to the Assets folder and add **itgLsCheckbox.css**
9. Right click on the HTML Client project Scripts folder
10. Add existing item, navigate to the Assets folder and add **itgLsCheckbox.js**
11. Add both to your default.htm in their corresponding sections
12. Open up the Add/Edit screen
13. Change the screen to not Show As Dialog, or not
14. Delete everything under the Details tab
15. Now under the Details tab create the following structure
	<ol style="list-style-type: lower-alpha">
		<li>Columns Layout - Group
			<ol style="list-style-type: lower-roman">
				<li>Rows Layout - Col1, width fit to content, min width 100
					<ul>
						<li>Boolean1, change to custom control</li>
						<li>Boolean2, change to custom control</li>
						<li>Boolean3, change to custom control</li>
						<li>Boolean4, change to custom control</li>
					</ul>
				</li>
				<li>Rows Layout - Col2, width fit to content, min width 100
					<ul>
						<li>Boolean1, change to flip switch</li>
						<li>Boolean2, change to flip switch</li>
						<li>Boolean3, change to flip switch</li>
						<li>Boolean4, change to flip switch</li>
					</ul>
				</li>
				<li>Rows Layout - Col3, width min of 100, max width 200
					<ul>
						<li>Boolean1, change to text box</li>
						<li>Boolean2, change to text box</li>
						<li>Boolean3, change to text box</li>
						<li>Boolean4, change to text box</li>
					</ul>
				</li>
			</ol>
		</li>
	</ol>
16. Save and build your solution

##Edit Custom Controls

1. In the Properties tab for each of the controls in Rows Layout - Col1
	* Boolean1, Description:  Hello World!
	* Boolean2, Description:  My favorite color is blue
	* Boolean3, Description:  I like water
	* Boolean4, Description:  Leave blank
3. Again for each of the controls in Rows Layout - Col1
4. In the Properties tab, click on the Edit Render Code
5. Once you've done all 4, go into the associated JavaScript code behind file
6. For each of the render methods, add the following code

	```
	itgLs.ui.checkbox.render(element, contentItem);
	```
7. Save and build your solution
8. Run your application
9. Navigate to your add/edit screen
10. You should see a column with checkboxes, one with flip switches, and one with textboxes
11. Start clicking around, you'll notice they all get updated no matter where the data changes
12. Notice how you can have the top label and text as different and showing at the same time
13. Now for each custom control go change the Label Position property to **"none"**
14. Go rerun your app
15. Hmmm… notice number 4 has text.  Here is the order of how we get the text for a control
	* Text property passed in the options object of the function (overrides all)
	* Description field of the control properties
	* Display Name field of the control properties (only if the Label Position is set to None)

##Adding Custom CSS

1. Open up the file: user-customization.css
2. Add the following to the end of the file

	```
	/* These are used for testing our checkboxes */
	.red-small-bold {
		color: red;
		font-size: 10px !important;
		font-weight: bold;
	}
	
	.green-bold {
		color: green;
		font-weight: bold;
	}
	
	.blue-bold {
		color: blue;
		font-weight: bold;
	}
	```
3. Save the file


##Customizing Boolean1

1. Open up your JavaScript code behind file for your Add/Edit screen
2. We are going to customize the rendering of Boolean1
3. The following properties can be passed as options to the render method
	* text - Text to display to the right of the checkbox itself
	* checkedCssClassForText - A CSS class to be used on the text when the box is checked
	* uncheckedCssClassForText - A CSS class to be used on the text when the box is unchecked
	* onChange - function to run when the checkbox is clicked and changed
4. There are no dependencies between options.  You can pass all, a single, or none.
5. Lets make Boolean1 do some fancy stuff when its checked/unchecked
6. Change the itgLs.ui.checkbox.render function with the following code

	```
	// Render our custom control as a checkbox
	itgLs.ui.checkbox.render(element, contentItem, {
		text: contentItem.value ? "This is true" : "This is False",
		checkedCssClassForText: "green-bold",
		uncheckedCssClassForText: "red-small-bold"
	});
	```
7. The code is only for the initial rendering of the control.  So for example this is setting the default text to display based on the initial value of the contentItem.  Which will override the Description property of the control.
8. The CSS Classes we added will persist and be used as such until changed
9. Now add some dataBind code for when the actual data changes, right under our render code

	```
	// We will change both Text and CSS when the value changes
	contentItem.dataBind("value", function(newValue) {
	
		// Make sure the view (html) has been rendered before we try to modify it
		if (contentItem._view.isRendered) {
	
			// Create new text for displaying, if desired
			var txt = newValue ? "This is True" : "This is False";
	
			// Call our helper function to set the text
			itgLs.ui.checkbox.setText(contentItem, txt);
		}
	
	});
	```
10. Pretty explanatory with the comments so I won't repeat here
11. Save, build and run your solution
12. Click on the checkbox, click on the flip switch, change the textbox value to 1 or 0 or true or false
13. Notice how not only the text changes, but also the CSS kicks in.

##Customizing Boolean2

1. Open up your JavaScript code behind file for your Add/Edit screen
2. We are going to customize the rendering of Boolean2
3. Remember, the following properties can be passed as options to the render method
	* text - Text to display to the right of the checkbox itself
	* checkedCssClassForText - A CSS class to be used on the text when the box is checked
	* uncheckedCssClassForText - A CSS class to be used on the text when the box is unchecked
	* onChange - function to run when the checkbox is clicked and changed
4. And remember, there are no dependencies between options.  Pass all, a single, or none.
5. Change the itgLs.ui.checkbox.render function with the following code

	```
	// Render our custom control as a checkbox
	itgLs.ui.checkbox.render(element, contentItem, {
		text: contentItem.value ? "My favorite color is green" : "My favorite color is blue",
		checkedCssClassForText: "green-bold",
		uncheckedCssClassForText: "blue-bold"
	});
	```
6. The code is only for the initial rendering of the control.  So for example this is setting the default text to display based on the initial value of the contentItem.  This will override the Description property of the control.
7. The CSS Classes we added will persist and be used as such until changed
8. Now add some dataBind code for when the actual data changes

	```
	// We will change both Text and CSS when the value changes
	contentItem.dataBind("value", function(newValue) {
	
		// Make sure the view (html) has been rendered before we try to modify it
		if (contentItem._view.isRendered) {
	
			// Create new text for displaying, if desired
			var txt = newValue ? "My favorite color is green" : "My favorite color is blue";
	
			// Call our helper function to set the text
			itgLs.ui.checkbox.setText(contentItem, txt);
		}
	
	});
	```
9. Pretty explanatory with the comments so, again, I won't repeat here
10. Save, build and run your solution
11. Click on the checkbox, click on the flip switch, change the textbox value to 1 or 0 or true or false
12. Notice the new changes when clicked!

##Customizing Boolean3

Ha! We are going to do nothing to Boolean3.  
This will demonstrate how you can easily render a simple checkbox.

##Customizing Boolean4

1. Open up your JavaScript code behind file for your Add/Edit screen
2. We are going to customize the rendering of Boolean4
3. Change the itgLs.ui.checkbox.render function with the following code

	```
	// Render our custom control as a checkbox
	itgLs.ui.checkbox.render(element, contentItem, {
		text: ""
	});
	```
5. This simple code will create a checkbox with no labels. Remember the passed text property overrides all
6. Save, build and run your solution
7. Click on the checkbox, click on the flip switch, change the textbox value to 1 or 0 or true or false

##Final Thoughts

1. You can also have a no label checkbox without passing an empty text property by the following method
	* No text in the controls Description property
	* A single space for the Display Name property for the control
2. Notice resizing the browser works as expected
3. Remove the other labels from the other controls, notice alignment is as expected
4. Works as expected on IE and Chrome
5. Has not been tested yet on IOS
6. There is additional functionality for updating the text and CSS
	* setText(contentItem, text, classToAdd, classToRemove)
	* classToAdd and classToRemove are optional
	* addCssClassForText(contentItem, cssClass)
	* removeCssClassForText(contentItem, cssClass)
	* initializeCss(element, css)
