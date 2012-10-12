/**
* XVM: Xeovisor Minimo 
* ----------------------------------------------
* Copyright (c) 2012, Xunta de Galicia. All rights reserved.
* Code licensed under the BSD License: 
*   LICENSE.txt file available at the root application directory
*
* @author Instituto Estudos do Territorio, IET
*/

/**
 * @requires XVM.js
 */

/**
 * Reader class reads yaml files and GET petitions and returns object 
 * with their values
 */

XVM.Loader.Reader = function() {

	/**
	 * Parse a YAML file and save response into object
	 * attribute
	 *  
	 * Method
	 * Parameters: 
	 * {String} path to YAML file
	 */
	this.readFromFile = function(path, callBack, context) {
		this._call(path,
			callBack,
			'text', 
			context);
	};
	
	this.loadScript = function(url, callBack, context) {
		$.ajax({
			type : 'GET',
			url : url,
			context : context,
			dataType : 'script',
			success : function(response) {
				callBack(response, this);
			},
			error : function(xhr, textStatus, errorThrown) {
				// TODO when error?
			}
		});
	};
	
	/**
	 * Private method to send AJAX petitions
	 * 
	 * Method
	 * Parameters:
	 * {String} URL 
	 * {Object} with AJAX parameters
	 * 
	 */
	this._call = function(url, callBack, datatype, context) {
		$.ajax({
			type : 'GET',
			url : url,
			context : context,
			dataType : datatype,
			success : function(response) {
				var responseObject = jsyaml.load(response);
				callBack(responseObject, this);
			},
			error : function(xhr, textStatus, errorThrown) {
				// TODO when error?
			}
		});
	};
	
	/**
	 * Reads parameters from URL and saves into context
	 * Needs that context has method *fromGETParameters*
	 * 
	 * Method
	 */
	this.getParamsFromURL = function(context) {
		var qs = XVM.Util.getLocationSearch();
		qs = qs.split("+").join(" ");
		context.fromGETParameters = {};
		var tokens, 
		re = /[?&]?([^=]+)=([^&]*)/g;

		while(tokens = re.exec(qs)) {
			context.fromGETParameters[decodeURIComponent(tokens[1]).toLowerCase()] = decodeURIComponent(tokens[2]);
		}
	};

};
