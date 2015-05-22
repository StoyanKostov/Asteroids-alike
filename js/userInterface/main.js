define([], function() {
	// Command design pattern
	//http://www.adobe.com/devnet/archive/html5/articles/javascript-design-patterns-pt3-proxy-observer-command.html
	//http://www.dofactory.com/javascript/command-design-pattern
	//

	//Participants
	// Client -- In sample code: the Client 
    //     references the Receiver object
    // Receiver -- In sample code: Calculator
    //     knows how to carry out the operation associated with the command
    //     (optionally) maintains a history of executed commands
    // Command -- In sample code: Command
    //     maintains information about the action to be taken
    // Invoker -- In our sample code: the user pushing the buttons
    //     asks to carry out the request

	function Client(updateIntervalTimeOut){
		var self = this;


		return self;
	}

	Client.prototype.start = function(callBack){
		
	}

    return Client;
});