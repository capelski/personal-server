window.colorPickerCustom = (function(jscolor, basicModal) {

	function pick(initialColor) {
		return new Promise((resolve, reject) => {
			basicModal.show({
				body: `<p>Choose the color you want the the fractal pictures to be painted in:</p>
						<input id="jscolor" class="jscolor" value="` + initialColor + `">
				`,
				buttons: {
					cancel: {
						title: 'Cancel',
						fn: () => {
							basicModal.close();
							resolve(initialColor);
						}
					},
					action: {
						title: 'Select',
						fn: () => {
							var selectedColor = '#' + document.getElementById('jscolor').value;
							basicModal.close();
							resolve(selectedColor);
						}
					}
				}
			});
			renderColorPicker();
		});
	}

	function renderColorPicker() {
		jscolor.installByClassName('jscolor');
		var mousedownEvent = document.createEvent('MouseEvents');
		mousedownEvent.initEvent('mousedown', true, false);
		document.getElementById('jscolor').dispatchEvent(mousedownEvent);
		document.getElementById('jscolor').style.display = 'none';
		//This is not the fanciest way to do it, but we can grab the color picker as the last element of the body:
		var bodyNodes = Array.from(document.body.childNodes);
		var colorPicker = bodyNodes[bodyNodes.length - 1];
		colorPicker.style.left = 'calc(50% - 120px)';
		colorPicker.style.top = 'calc(50% - 60px)';
		document.getElementsByClassName('basicModal__content')[0].style.height = '300px';
	}

	return {
		pick
	};

})(jscolor, basicModal);