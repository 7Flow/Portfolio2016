var filters = {} || filters;
(function() {

	filters.ColorChannel = {
		RED: 0,
		GREEN: 1,
		BLUE: 2,
		ALPHA: 3
	};

	filters.Point = function(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	};

	filters.DisplacementMap = function(source, map, target, point, scaleX, scaleY, channelX, channelY) {
		this.source = source;
		this.map = map;
		this.target = target;
		this.sourceCtx = this.source.getContext("2d");
		this.mapCtx = this.map.getContext("2d");
		this.targetCtx = this.target.getContext("2d");
		this.point = point || new filters.Point();
		this.scaleX = scaleX || 0;
		this.scaleY = scaleY || 0;
		this.channelX = channelX || filters.ColorChannel.RED;
		this.channelY = channelY || filters.ColorChannel.RED;
		if (this.channelX != 0 && this.channelX != 1 && this.channelX != 2 && this.channelX != 3) this.channelX = filters.ColorChannel.RED;
		if (this.channelY != 0 && this.channelY != 1 && this.channelY != 2 && this.channelY != 3) this.channelY = filters.ColorChannel.RED;

        this.resize();
	};

	var p = filters.DisplacementMap.prototype;

	p.draw = function()
    {
        var targetDataX = new ImageData( new Uint8ClampedArray(this.sourceData.data), this.source.width, this.source.height );
        var targetDataY = new ImageData( new Uint8ClampedArray(this.sourceData.data), this.source.width, this.source.height );

		var colorValue,
			ratio,
			pixelShift,
			sourcePosition,
			targetPosition,
			x,
			y,
		    i;

        for (i=0; i<this.pixelsLength; ++i) {
			x = ((i % this.map.width) + this.point.x) | 0;
			y = (((i / this.map.width) | 0) + this.point.y) | 0;
			colorValue = this.mapData.data[i*4+this.channelX];
			ratio = (colorValue / 0xFF * 2) -1;
			pixelShift = (ratio * this.scaleX | 0);
			sourcePosition = (this.source.width * y) + x;
			targetPosition = (this.target.width * y) + x + pixelShift;
			this.setPixels(targetDataX, targetPosition, this.sourceData, sourcePosition);
		}

        for (i=0; i<this.pixelsLength; ++i) {
			x = ((i % this.map.width) + this.point.x) | 0;
			y = (((i / this.map.width) | 0) + this.point.y) | 0;
			colorValue = this.mapData.data[i*4+this.channelY];
			ratio = (colorValue / 0xFF * 2) -1;
			pixelShift = (ratio * this.scaleY | 0);
			sourcePosition = (this.source.width * y) + x;
			targetPosition = (this.target.width * (y + pixelShift)) + x;
			this.setPixels(targetDataY, targetPosition, targetDataX, sourcePosition);
		}

		this.targetCtx.putImageData(targetDataY, 0, 0);
	};

	p.setPixels = function(target, pos, source, i) {
		target.data[i*4] = source.data[pos*4];
		target.data[i*4+1] = source.data[pos*4+1];
		target.data[i*4+2] = source.data[pos*4+2];
		target.data[i*4+3] = source.data[pos*4+3];
	};

    p.resize = function()
    {
        this.sourceData = this.sourceCtx.getImageData(0, 0, this.source.width, this.source.height);
        this.mapData = this.mapCtx.getImageData(0, 0, this.map.width, this.map.height);
        this.pixelsLength = this.mapData.data.length / 4;
    }

})();