// Enable Automations Power-Up for New Boards
window.TrelloPowerUp.initialize({
  'board-buttons': function(t, options){
    return [{
      icon: 'https://example.com/icon.png',
      text: 'Enable Automations',
      callback: function(t){
        // Enable all automations for the current board
        enableAllAutomations(t);
      }
    }];
  }
});

// Function to enable all automations on the current board
function enableAllAutomations(t) {
  // Retrieve the board ID
  var boardId = t.getContext().board;

  // Get all available Butler commands
  t.get('board', 'private', 'commands')
  .then(function(commands){
    // Filter out only the enabled commands
    var enabledCommands = commands.filter(function(command){
      return command.enabled;
    });

    // Enable each enabled command on the board
    enabledCommands.forEach(function(command) {
      t.set('board', 'private', 'rules', {
        command: command.text,
        time: 'immediately'
      })
      .then(function(){
        console.log('Automation enabled:', command.text);
      })
      .catch(function(error){
        console.error('Error enabling automation:', error);
      });
    });

    // Inform the user that automations have been enabled
    t.alert({
      message: 'Automations enabled for this board!',
      display: 'info'
    });
  })
  .catch(function(error){
    console.error('Error getting Butler commands:', error);
  });
}
