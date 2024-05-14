
var dragObject = new function () {
	var me = this;

	var targetNode;
	var eventNoticeNode, dragEventNoticeNode;

	var dataTransferCommentString;

	me.init = function () {

		if (EventHelpers.hasPageLoadHappened(arguments)) {
			return;
		}


		targetNode = document.getElementById('dropTarget');
		eventNoticeNode = document.getElementById('eventNotice');
		dragEventNoticeNode = document.getElementById('dragEventNotice');

		/* These are events for the draggable objects */
		var dragNodes = cssQuery('[draggable=true]');
		for (var i = 0; i < dragNodes.length; i++) {
			var dragNode = dragNodes[i]
			EventHelpers.addEvent(dragNode, 'dragstart', dragStartEvent);
		}

		/* These are events for the object to be dropped */
		EventHelpers.addEvent(targetNode, 'dragover', dragOverEvent);
		EventHelpers.addEvent(targetNode, 'drop', dropEvent);
	}




	function dragStartEvent(e) {
		e.dataTransfer.setData('Text', this.outerHTML
		);
	}


	function dragOverEvent(e) {
		EventHelpers.preventDefault(e);
	}


	function dropEvent(e) {
		this.innerHTML += e.dataTransfer.getData('Text');
		EventHelpers.preventDefault(e);
		cssQuery("[draggable=true]")[0].remove()
	}

}

// fixes visual cues in IE and Chrome 3.0 and lower.
DragDropHelpers.fixVisualCues = true;

EventHelpers.addPageLoadEvent('dragObject.init');