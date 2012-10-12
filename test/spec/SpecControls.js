/**
* XVM: Xeovisor Minimo 
* ----------------------------------------------
* Copyright (c) 2012, Xunta de Galicia. All rights reserved.
* Code licensed under the BSD License: 
*   LICENSE.txt file available at the root application directory
*
*/

/**
 * XVM.Loader.Config tests
 */

describe('Control tests', function() {
	
	var fakeResponse = {'controls' : 
		['FakeMousePosition']
	}
	
	var fakeContext = jasmine.createSpyObj('controls', ['_loadControls'])
	
	fakeContext._loadControls(fakeResponse.controls, fakeContext);
	fakeContext.CONTROLSFOLDER = 'spec/aux'
	fakeContext.controls = new Array();
	fakeContext.reader = new XVM.Loader.Reader();
	
	var reader = new XVM.Loader.Reader();
	var controls;
	beforeEach(function() {
		spyOn(reader, 'readFromFile')
		controls = new XVM.Loader.Controls(reader);
	});
	
	it('Initializes sets reader into controls class', function() {
		expect(controls.reader).toEqual(reader);
	});
	
	it('Control read from reader', function() {
		controls.readControls();
		expect(reader.readFromFile).toHaveBeenCalled();
	});	
	
	it('Callback do anything', function() {
		controls._readControlCallbacks(fakeResponse, fakeContext);
		expect(0).toEqual(1);
		// TODO 
	});
})
