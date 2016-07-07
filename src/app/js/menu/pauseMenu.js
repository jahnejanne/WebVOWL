/**
 * Contains the logic for the pause and resume button.
 *
 * @param graph the associated webvowl graph
 * @returns {{}}
 */
module.exports = function (graph) {

	var pauseMenu = {},
		pauseButton;


	/**
	 * Adds the pause button to the website.
	 */
	pauseMenu.setup = function () {
		pauseButton = d3.select("#pause-button")
			.datum({paused: getDefaultValue()})
			.on("click", function (d) {
				graph.paused(!d.paused);
				d.paused = !d.paused;
				updatePauseButton();
			});

		// Set these properties the first time manually
		updatePauseButton();
	};

	function updatePauseButton() {
		updatePauseButtonClass();
		updatePauseButtonText();
	}

	function updatePauseButtonClass() {
		pauseButton.classed("paused", function (d) {
			return d.paused;
		});
	}

	function updatePauseButtonText() {
		if (pauseButton.datum().paused) {
			pauseButton.text("Resume");
		} else {
			pauseButton.text("Pause");
		}
	}

	function getDefaultValue() {
		return graph.options().paused();
	}

	pauseMenu.reset = function () {
		pauseButton.datum().paused = getDefaultValue();
		graph.paused(getDefaultValue());
		updatePauseButton();
	};


	return pauseMenu;
};
