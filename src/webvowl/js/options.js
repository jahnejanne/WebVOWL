module.exports = function () {
	var options = {},
		data,
		graphContainerSelector,
		classDistance = 200,
		datatypeDistance = 120,
		loopDistance = 100,
		charge = -500,
		gravity = 0.025,
		linkStrength = 1,
		height = 600,
		width = 800,
		selectionModules = [],
		filterModules = [],
		segmentsModule,
		pickAndPinModule,
		minMagnification = 0.95,
		maxMagnification = 4,
		compactNotation = false,
		scaleNodesByIndividuals = false,
		exportWithGraphChanges = true,
		paused = true,
		datatypeFilterEnabled = true,
		objectPropertyFilterEnabled = false,
		forceFullLabels = false,
		labelMaxTextLineLength = 45,
		cardinalityVisible = true,
		cardinalityPlacement = "PROPERTY";


	options.charge = function (p) {
		if (!arguments.length) return charge;
		charge = +p;
		return options;
	};

	options.classDistance = function (p) {
		if (!arguments.length) return classDistance;
		classDistance = +p;
		return options;
	};

	options.compactNotation = function (p) {
		if (!arguments.length) return compactNotation;
		compactNotation = p;
		return options;
	};

	options.data = function (p) {
		if (!arguments.length) return data;
		data = p;
		return options;
	};

	options.datatypeDistance = function (p) {
		if (!arguments.length) return datatypeDistance;
		datatypeDistance = +p;
		return options;
	};

	options.filterModules = function (p) {
		if (!arguments.length) return filterModules;
		filterModules = p;
		return options;
	};

	options.segmentsModule = function (p) {
		if (!arguments.length) return segmentsModule;
		segmentsModule = p;
		return options;
	};
	
	options.pickAndPinModule = function (p) {
		if (!arguments.length) return pickAndPinModule;
		pickAndPinModule = p;
		return options;
	};

	options.graphContainerSelector = function (p) {
		if (!arguments.length) return graphContainerSelector;
		graphContainerSelector = p;
		return options;
	};

	options.gravity = function (p) {
		if (!arguments.length) return gravity;
		gravity = +p;
		return options;
	};

	options.height = function (p) {
		if (!arguments.length) return height;
		height = +p;
		return options;
	};

	options.linkStrength = function (p) {
		if (!arguments.length) return linkStrength;
		linkStrength = +p;
		return options;
	};

	options.loopDistance = function (p) {
		if (!arguments.length) return loopDistance;
		loopDistance = p;
		return options;
	};

	options.minMagnification = function (p) {
		if (!arguments.length) return minMagnification;
		minMagnification = +p;
		return options;
	};

	options.maxMagnification = function (p) {
		if (!arguments.length) return maxMagnification;
		maxMagnification = +p;
		return options;
	};

	options.scaleNodesByIndividuals = function (p) {
		if (!arguments.length) return scaleNodesByIndividuals;
		scaleNodesByIndividuals = p;
		return options;
	};

	options.selectionModules = function (p) {
		if (!arguments.length) return selectionModules;
		selectionModules = p;
		return options;
	};

	options.width = function (p) {
		if (!arguments.length) return width;
		width = +p;
		return options;
	};

	options.exportWithGraphChanges = function (p) {
		if (!arguments.length) return exportWithGraphChanges;
		exportWithGraphChanges = p;
		return options;
	};

	options.paused = function (p) {
		if (!arguments.length) return paused;
		paused = p;
		return options;
	};	
	
	options.datatypeFilterEnabled = function (p) {
		if (!arguments.length) return datatypeFilterEnabled;
		datatypeFilterEnabled = p;
		return options;
	};
	
	options.objectPropertyFilterEnabled = function (p) {
		if (!arguments.length) return objectPropertyFilterEnabled;
		objectPropertyFilterEnabled = p;
		return options;
	};
	
	options.forceFullLabels = function (p) {
		if (!arguments.length) return forceFullLabels;
		forceFullLabels = p;
		return options;
	};

	options.labelMaxTextLineLength = function (p) {
		if (!arguments.length) return labelMaxTextLineLength;
		labelMaxTextLineLength = p;
		return options;
	};

	options.cardinalityVisible = function (p) {
		if (!arguments.length) return cardinalityVisible;
		cardinalityVisible = p;
		return options;
	};

	options.cardinalityPlacement = function (p) {
		if (!arguments.length) return cardinalityPlacement;
		cardinalityPlacement = p;
		return options;
	};

	options.rewriteFrom = function (otherOptions) {
		rewriteFrom(otherOptions, options);
	};

	function rewriteFrom(srcOptions, destOptions) {
		var srcKeys = Object.keys(srcOptions);
		var i;
		var optionKey;

		for(i = 0; i < srcKeys.length; i++) {
			optionKey = srcKeys[i];

			if(typeof destOptions[optionKey] === 'function') {
				destOptions[optionKey](srcOptions[optionKey]);
			}
		}
	}

	return options;
};
