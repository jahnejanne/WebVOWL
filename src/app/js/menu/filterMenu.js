/**
 * Contains the logic for connecting the filters with the website.
 *
 * @param graph required for calling a refresh after a filter change
 * @returns {{}}
 */
module.exports = function (graph) {

	var filterMenu = {},
		checkboxData = [],
		menuElement = d3.select("#filterOption a"),
		nodeDegreeContainer = d3.select("#nodeDegreeFilteringOption"),
		degreeSlider,
		addedTagFilter;


	/**
	 * Connects the website with graph filters.
	 * @param datatypeFilter filter for all datatypes
	 * @param objectPropertyFilter filter for all object properties
	 * @param subclassFilter filter for all subclasses
	 * @param disjointFilter filter for all disjoint with properties
	 * @param setOperatorFilter filter for all set operators with properties
	 * @param nodeDegreeFilter filters nodes by their degree
	 */
	filterMenu.setup = function (datatypeFilter, objectPropertyFilter, subclassFilter, disjointFilter, setOperatorFilter, nodeDegreeFilter, tagFilter) {
		menuElement.on("mouseleave", function () {filterMenu.highlightForDegreeSlider(false);});

		addFilterItem(datatypeFilter, "datatype", "Datatype properties", "#datatypeFilteringOption");
		addFilterItem(objectPropertyFilter, "objectProperty", "Object properties", "#objectPropertyFilteringOption");
		addFilterItem(subclassFilter, "subclass", "Solitary subclasses", "#subclassFilteringOption");
		addFilterItem(disjointFilter, "disjoint", "Class disjointness", "#disjointFilteringOption");
		addFilterItem(setOperatorFilter, "setoperator", "Set operators", "#setOperatorFilteringOption");

		addedTagFilter = addTagFilter(tagFilter, "tag", "Tags", "#tagFilteringOption");

		addNodeDegreeFilter(nodeDegreeFilter, nodeDegreeContainer);
	};


	function addFilterItem(filter, identifier, pluralNameOfFilteredItems, selector) {
		var filterContainer,
			filterCheckbox;

		filterContainer = d3.select(selector)
			.append("div")
			.classed("checkboxContainer", true);

		filterCheckbox = filterContainer.append("input")
			.classed("filterCheckbox", true)
			.attr("id", identifier + "FilterCheckbox")
			.attr("type", "checkbox")
			.property("checked", filter.enabled());

		// Store for easier resetting
		checkboxData.push({checkbox: filterCheckbox, defaultState: filter.enabled()});

		filterCheckbox.on("click", function () {
			// There might be no parameters passed because of a manual
			// invocation when resetting the filters
			var isEnabled = filterCheckbox.property("checked");
			filter.enabled(isEnabled);
			graph.update();
		});

		filterContainer.append("label")
			.attr("for", identifier + "FilterCheckbox")
			.text(pluralNameOfFilteredItems);
	}

	function addTagFilter(filter, identifier, pluralNameOfFilteredItems, selector) {

		function addOrRemoveTagFromFilter(label, shouldAdd){
			filter[shouldAdd? "addTag" : "removeTag"](label);
			graph.update();
		}

		function addNextTagCheckbox(tagId, tag){
			var tagCheckbox;
			var checkboxContainer;

			checkboxContainer = mainTagCheckboxContainer
				.append("div")
				.classed("checkboxContainer", true);

			tagCheckbox = checkboxContainer
				.append("input")
				.classed("tagFilterCheckbox", true)
				.attr("id", tagId)
				.attr("type", "checkbox")
				.on("click", function () {
					var isEnabled = tagCheckbox.property("checked");
					addOrRemoveTagFromFilter(tag, isEnabled);
				});

			checkboxContainer
				.append("label")
				.attr("for", tagId)
				.text(tag);

			return tagCheckbox;
		}

		var mainTagCheckboxContainer;
		var addTagContainer;
		var newTagInput;
		var addTagBtn;

		addFilterItem(filter, identifier, pluralNameOfFilteredItems, selector);

		addTagContainer = d3.select(selector)
			.append("div")
			.classed("addTagContainer", true);

		newTagInput = addTagContainer
			.append("input")
			.classed("newTagInput", true)
			.attr("type", "text");

		addTagBtn = addTagContainer
			.append("button")
			.classed("addTagBtn", true);

		mainTagCheckboxContainer = d3.select(selector)
			.append("div")
			.classed("mainTagCheckboxContainer", true);



		addTagBtn.on("click", function() {
			var tag = newTagInput.property("value");
			var tagId = tag + "tagCheckbox";
			var tagCheckbox = d3.select("#" + tagId);

			if(!filter.enabled() || !tag) {
				return true;
			}

			tag = String.prototype.toLowerCase.apply(tag);
			newTagInput.property("value", "");

			if(tagCheckbox.empty()) {
				tagCheckbox = addNextTagCheckbox(tagId, tag);
			}

			addOrRemoveTagFromFilter(tag, true);
			tagCheckbox.property("checked", true);
		});

		return {
			reset: function () {
				filter.reset();
				mainTagCheckboxContainer.html("");
			}
		}
	}

	function addNodeDegreeFilter(nodeDegreeFilter, container) {
		nodeDegreeFilter.setMaxDegreeSetter(function (maxDegree) {
			degreeSlider.attr("max", maxDegree);
			setSliderValue(degreeSlider, Math.min(maxDegree, degreeSlider.property("value")));
		});

		nodeDegreeFilter.setDegreeGetter(function () {
			return +degreeSlider.property("value");
		});

		nodeDegreeFilter.setDegreeSetter(function (value) {
			setSliderValue(degreeSlider, value);
		});

		var sliderContainer,
			sliderValueLabel;

		sliderContainer = container.append("div")
			.classed("distanceSliderContainer", true);

		degreeSlider = sliderContainer.append("input")
			.attr("id", "nodeDegreeDistanceSlider")
			.attr("type", "range")
			.attr("min", 0)
			.attr("step", 1);

		sliderContainer.append("label")
			.classed("description", true)
			.attr("for", "nodeDegreeDistanceSlider")
			.text("Degree of collapsing");

		sliderValueLabel = sliderContainer.append("label")
			.classed("value", true)
			.attr("for", "nodeDegreeDistanceSlider")
			.text(0);

		degreeSlider.on("change", function () {
			graph.update();
		});

		degreeSlider.on("input", function () {
			var degree = degreeSlider.property("value");
			sliderValueLabel.text(degree);
		});
	}

	function setSliderValue(slider, value) {
		slider.property("value", value).on("input")();
	}

	/**
	 * Resets the filters (and also filtered elements) to their default.
	 */
	filterMenu.reset = function () {
		checkboxData.forEach(function (checkboxData) {
			var checkbox = checkboxData.checkbox,
				enabledByDefault = checkboxData.defaultState,
				isChecked = checkbox.property("checked");

			if (isChecked !== enabledByDefault) {
				checkbox.property("checked", enabledByDefault);
				// Call onclick event handlers programmatically
				checkbox.on("click")();
			}
		});

		addedTagFilter.reset();
		
		setSliderValue(degreeSlider, 0);
		degreeSlider.on("change")();
	};

	filterMenu.highlightForDegreeSlider = function (enable) {
		if (!arguments.length) {
			enable = true;
		}
		menuElement.classed("highlighted", enable);
		nodeDegreeContainer.classed("highlighted", enable);
	};


	return filterMenu;
};
