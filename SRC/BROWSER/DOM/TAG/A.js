/**
 * A class
 */
global.A = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'a'
		};
	},

	init : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.href
		//OPTIONAL: params.target
		//OPTIONAL: params.style

		var
		// href
		href,
		
		// target
		target,
		
		// style
		style,
		
		// set href.
		setHref, 

		// tap.
		tap;

		// init params.
		if (params !== undefined) {
			href = params.href;
			target = params.target;
			style = params.style;
		}

		self.setHref = setHref = function(href) {
			inner.setAttr({
				name : 'href',
				value : href
			});
		};

		if (href !== undefined) {
			setHref(href);
		}

		if (target !== undefined) {
			inner.setAttr({
				name : 'target',
				value : target
			});
		}

		if (style === undefined || style.cursor === undefined) {
			self.addStyle({
				cursor : 'pointer'
			});
		}

		if (style === undefined || style.textDecoration === undefined) {
			self.addStyle({
				textDecoration : 'underline'
			});
		}

		self.tap = tap = function() {

			EVENT.fireAll({
				node : self,
				name : 'tap'
			});
		};
	},

	afterInit : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.href
		//OPTIONAL: params.c

		var
		// href
		href,

		// children
		children;

		// init params.
		if (params !== undefined) {
			href = params.href;
			children = params.c;
		}

		if (children === undefined && href !== undefined) {
			self.append(href);
		}
	}
});
