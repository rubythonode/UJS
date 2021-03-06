/**
 * Create class.
 */
global.CLASS = METHOD(function(m) {
	'use strict';

	var
	// instance count
	instanceCount = 0,

	// get instance id.
	getInstanceId;

	m.getInstanceId = getInstanceId = function() {

		instanceCount += 1;

		return instanceCount - 1;
	};

	return {

		run : function(define) {
			//REQUIRED: define

			var
			// funcs
			funcs,

			// preset.
			preset,

			// init.
			init,

			// params.
			_params,

			// after init.
			afterInit,

			// cls.
			cls = function(params, funcs) {
				//OPTIONAL: params
				//OPTIONAL: funcs

				var
				// inner (like Java's protected.)
				inner = {},

				// self (like Java's public.)
				self = {};

				// set type.
				self.type = cls;

				// check is instance of.
				self.checkIsInstanceOf = function(checkCls) {

					var
					// target cls
					targetCls = cls;

					// check moms.
					while (targetCls !== undefined) {

						if (targetCls === checkCls) {
							return true;
						}

						targetCls = targetCls.mom;
					}

					return false;
				};

				// set id.
				self.id = getInstanceId();

				// run inner init.
				params = innerInit(inner, self, params, funcs);

				// run inner after init.
				innerAfterInit(inner, self, params, funcs);

				return self;
			},

			// inner init.
			innerInit,

			// inner after init.
			innerAfterInit;

			// set type.
			cls.type = CLASS;

			cls.innerInit = innerInit = function(inner, self, params, funcs) {
				//OPTIONAL: params
				//OPTIONAL: funcs

				var
				// mom (parent class)
				mom,

				// temp params
				tempParams,

				// param value
				paramValue,

				// extend.
				extend = function(params, tempParams) {

					EACH(tempParams, function(value, name) {

						if (params[name] === undefined) {
							params[name] = value;
						} else if (CHECK_IS_DATA(params[name]) === true && CHECK_IS_DATA(value) === true) {
							extend(params[name], value);
						}
					});
				};

				// init params.
				if (_params !== undefined) {

					// when params is undefined
					if (params === undefined) {
						params = _params(cls);
					}

					// when params is data
					else if (CHECK_IS_DATA(params) === true) {

						tempParams = _params(cls);

						if (tempParams !== undefined) {
							extend(params, tempParams);
						}
					}

					// when params is value
					else {
						paramValue = params;
						params = _params(cls);
					}
				}

				// preset.
				if (preset !== undefined) {

					mom = preset(params, funcs);

					if (mom !== undefined) {

						cls.mom = mom;

						// when mom's type is CLASS
						if (mom.type === CLASS) {
							mom.innerInit(inner, self, params, funcs);
						}

						// when mon's type is OBJECT
						else {
							mom.type.innerInit(inner, self, params, funcs);
						}
					}
				}

				// init object.
				if (init !== undefined) {
					init(inner, self, paramValue === undefined ? params : paramValue, funcs);
				}

				return params;
			};

			// when define is function
			if ( typeof define === 'function') {
				funcs = define(cls);
			}

			// when define is function set
			else {
				funcs = define;
			}

			// init funcs.
			if (funcs !== undefined) {
				preset = funcs.preset;
				init = funcs.init;
				_params = funcs.params;
				afterInit = funcs.afterInit;
			}

			cls.innerAfterInit = innerAfterInit = function(inner, self, params, funcs) {
				//OPTIONAL: params
				//OPTIONAL: funcs

				var
				// mom
				mom = cls.mom;

				// when mom exists, run mom's after init.
				if (mom !== undefined) {

					// when mom's type is CLASS
					if (mom.type === CLASS) {
						mom.innerAfterInit(inner, self, params, funcs);
					}

					// when mon's type is OBJECT
					else {
						mom.type.innerAfterInit(inner, self, params, funcs);
					}
				}

				// run after init.
				if (afterInit !== undefined) {
					afterInit(inner, self, params, funcs);
				}
			};

			return cls;
		}
	};
});
