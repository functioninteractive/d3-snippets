// TODO: Selection frame two-way
// TODO: Hook for code executed when selection frame is active

var SelectionFrame = function (obj) {
	if (!obj.$svg || !obj.svg) {
		console.warn('Parameters missing');
		return;
	}
	this.svg = obj.svg;
	this.$svg = obj.$svg;
	this.addEvents();
};
/**
 * Adds events necessary to let the selection frame show up / hide
 *
 * @method addEvents
 */
 SelectionFrame.prototype.addEvents = function () {	
	var me = this;
	this.svg.on('mousedown', function () {
		var pt = me.$svg[0].createSVGPoint();
		pt.x = d3.event.clientX;
		pt.y = d3.event.clientY;
		me.addSelectionFrame(
			pt.matrixTransform(me.$svg[0].getScreenCTM().inverse())
		);
	});
	this.svg.on('mouseup', function () {
		me.removeSelectionFrame();
	});
	this.svg.call(this.changeSelectionFrame());
};
/**
 * Change the size of the selection frame on drag
 *
 * @method changeSelectionFrame
 */
SelectionFrame.prototype.changeSelectionFrame = function () {
	var me = this;
	return d3.behavior.drag()
		.on('drag', function () {
			svg.select('.selectionFrame')
				.attr('width', function () {
					return Number(me.svg.select('.selectionFrame').attr('width')) + Number(d3.event.dx);
				})
				.attr('height', function () {
					return Number(me.svg.select('.selectionFrame').attr('height')) + Number(d3.event.dy);
				});
		});
};
/**
 * adds a selection frame to the svg
 *
 * @method addSelectionFrame
 * @param {Object} position
 */
SelectionFrame.prototype.addSelectionFrame = function (position) {
	this.svg.append('rect')
		.attr({
			rx: 0,
			ry: 0,
			class: 'selectionFrame',
			x: position.x,
			y: position.y,
			width: 0,
			height: 0,
			fill: '#08ceaa',
			stroke: '#08ceaa',
			'fill-opacity': 0.3
		});
};
SelectionFrame.prototype.removeSelectionFrame = function () {
	this.svg.select('.selectionFrame').remove();
};