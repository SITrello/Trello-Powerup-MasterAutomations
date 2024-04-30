// Enable Automations Power-Up for New Boards
window.TrelloPowerUp.initialize({
  'board-buttons': function(t, options){
    return [{
      icon: 'https://example.com/icon.png',
      text: 'Enable All Automations',
      callback: function(t){
        // Enable all available automations for the current board
        enableAllAutomations(t);
      }
    }];
  }
});

// Function to enable all available automations on the current board
function enableAllAutomations(t) {
  // Retrieve all available Butler commands
  t.get('board', 'private', 'commands')
  .then(function(commands){
    // Enable each command on the board
    commands.forEach(function(command) {
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

    // Inform the user that all automations have been enabled
    t.alert({
      message: 'All available automations enabled for this board!',
      display: 'info'
    });
  })
  .catch(function(error){
    console.error('Error getting Butler commands:', error);
  });
}
