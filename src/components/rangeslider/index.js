/**
* Copyright 2012-2016, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

'use strict';


var Plots = require('../../plots/plots');

var createSlider = require('./create_slider');
var supplyLayoutDefaults = require('./defaults');


module.exports = {
    draw: draw,
    supplyLayoutDefaults: supplyLayoutDefaults
};

function draw(gd, minStart, maxStart) {
    if(!gd._fullLayout.xaxis) return;

    var fullLayout = gd._fullLayout,
        sliderContainer = fullLayout._infolayer.selectAll('g.range-slider'),
        options = fullLayout.xaxis.rangeslider;


    if(!options || !options.visible) {
        sliderContainer.data([])
            .exit().remove();

        Plots.autoMargin(gd, 'range-slider');

        return;
    }


    var height = (fullLayout.height - fullLayout.margin.b - fullLayout.margin.t) * options.thickness,
        offsetShift = Math.floor(options.borderwidth / 2);

    if(sliderContainer[0].length === 0) createSlider(gd, minStart, maxStart);

    Plots.autoMargin(gd, 'range-slider', {
        x: 0, y: 0, l: 0, r: 0, t: 0,
        b: height + fullLayout.margin.b + fullLayout.xaxis._boundingBox.height,
        pad: 15 + offsetShift * 2
    });
}
