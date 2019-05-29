function prepareRosterSheetTable(element, teamId, mode, statsbookPeriod) {
	
	/* Values supported for mode:
	 * copyToStatsbook: Only roster cells for IGRF.
	 */
	
	'use strict';
	$(initialize);

	var alternateName = "operator";
	var tbody;

	function initialize() {

		var table = $('<table cellpadding="0" cellspacing="0" border="1">').addClass('Roster Team').addClass("AlternateName_" + alternateName).appendTo(element);
		var thead = $('<thead>').appendTo(table);
		$('<tr>').appendTo(thead)
			.append($('<td colspan=2 id=head>').text('Team ' + teamId));
		$('<tr>').appendTo(thead)
			.append($('<td>').text('Skater #'))
			.append($('<td>').text('Skater Name'));
		tbody = $('<tbody>').appendTo(table);

		WS.Register(['ScoreBoard.Team(' + teamId + ').Name'], function () { teamNameUpdate(); });
		WS.Register(['ScoreBoard.Team(' + teamId + ').AlternateName(' + alternateName + ')'], function () { teamNameUpdate(); });

		WS.Register(['ScoreBoard.Team(' + teamId + ').Color'], function (k, v) {
			element.find('#head').css('background-color', WS.state['ScoreBoard.Team(' + teamId + ').Color(' + alternateName + '_bg)'] || '');
			element.find('#head').css('color', WS.state['ScoreBoard.Team(' + teamId + ').Color(' + alternateName + '_fg)'] || '');
		});
		WS.Register(['ScoreBoard.Team('+teamId+').Skater'], function (k, v) { skaterUpdate(teamId, k, v); });
	}

	function teamNameUpdate() {
		var head = element.find('#head');
		var teamName = WS.state['ScoreBoard.Team(' + teamId + ').Name'];

		if (WS.state['ScoreBoard.Team(' + teamId + ').AlternateName(' + alternateName + ')'] != null) {
			teamName = WS.state['ScoreBoard.Team(' + teamId + ').AlternateName(' + alternateName + ')']
		}

		head.text(teamName);
	}


	function skaterUpdate(t, k, v) {
		if (k.Skater == null) return;
		
		var prefix = 'ScoreBoard.Team(' + t + ').Skater(' + k.Skater + ')';
		var row = tbody.children('tr.Skater[id=' + k.Skater + ']');
		if (k.parts[3] == 'Number') {
			// New skater, or number has been updated.
			if (v == null) {
				row.remove();
				return;
			}
			if (row.length == 0) {
				row = $("<tr>").appendTo(tbody).addClass("Skater").attr("id", k.Skater)
					.append($("<td>").addClass("Number"))
					.append($("<td>").addClass("Name"));
			}
			row.attr("number", String(v));
			tbody.children().sort(function(a, b){return $(a).attr("number") > $(b).attr("number") ? 1 : -1}).appendTo(tbody);
		}
		row.attr("flags", WS.state[prefix + ".Flags"]);
		var name = WS.state[prefix + ".Name"];
		var number = String(WS.state[prefix + ".Number"]);
		// Use Unicode's Combining Long Stroke Overlay so strikethrough
		// will copy to the statsbook.
		if (row.attr("flags") == "ALT" || row.attr("flags") == "BC") {
			var n = "";
			for (var i = 0; i<name.length; i++) {
				n += name[i] + "\u0336";
			}
			name = n;
			n = "";
			for (var i = 0; i<number.length; i++) {
				n = n + number[i] + "\u0336";
			}
			number = n;
		}
		row.children(".Name").text(name);
		row.children(".Number").text(number);
	}
}

//# sourceURL=views\roster-sheet.js
