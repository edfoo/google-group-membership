/*
  To create a web app with the HTML service, your code must include
  a doGet() function that tells the script how to serve the page. The
  function must return an HtmlOutput object.
  See https://developers.google.com/apps-script/guides/html/
*/
function doGet() {
  return HtmlService.createTemplateFromFile("index.html").evaluate();
}
/*
 Not used, but present in case an include function is added to index.html
*/
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}
/*
  Fetch the list of groups that the requesting user is a member
  of, place them in an array and return it to the client.
*/
function listGroups() {
  
  var groupArray = [];
  var groups = GroupsApp.getGroups().sort(function(a,b) {return (a.getEmail() > b.getEmail()) ? 1 : ((b.getEmail() > a.getEmail) ? -1 : 0);} );
  
  for (var i = 0; i < groups.length; i++) {
  
    // Some users are members of groups on other Google domains, ignore those domains
    group_address = groups[i].getEmail().toString();
    if (group_address.indexOf("your_domain_name") > -1) {
      var users = groups[i].getUsers();
      item = {}
      item["email"] = groups[i].getEmail();
      item["count"] = users.length
      groupArray.push(item);
    }
    
  }
  return groupArray;
}
/*
  Fetch the list of user email addresses that the requesting user is a member
  of and return it to the client.
*/
function listUsers(groupName) {
  
  var userArray = [];
  var users = GroupsApp.getGroupByEmail(groupName).getUsers().sort();
  
  for (var i = 0; i < users.length; i++) {
    item = {}
    item["email"] = users[i].getEmail();
    userArray.push(item);
  }
  
  return userArray;
}

/*
  List all the members of a group. This method replaces 'listUsers(groupName)' above.
*/
function getAllMembers(group) {
  
  Logger.log(group)
  
  var memberPageToken, memberPage;
  var members = [];
  do {
    memberPage = AdminDirectory.Members.list(group, {
      maxResults: 200,
      pageToken: memberPageToken
    });
    var pageMembers = memberPage.members;
    if (pageMembers) {
      for (var j =0; j < pageMembers.length; j++) {
        //Logger.log(pageMembers[j].email);
        members.push(pageMembers[j].email);
      }
    }
    memberPageToken = memberPage.nextPageToken;
  } while (memberPageToken);
  return members;
}



function check_group() {
  /*listUsers('everyone@your_domain_name.com');*/
  getAllMembers_('everyone@your_domain_name.com');
}

/*
  Use the AdminSDK API to fetch the list of all groups in all
  organisations on the domain, place them in an array and return
  it to the requesting client.
*/
function listAllGroups() {
  
  var groupArray = [];
  var pageToken, page;
  do {
    page = AdminDirectory.Groups.list({
      customer: 'my_customer',
      maxResults: 150,
      pageToken: pageToken
    });
  var groups = page.groups;
  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      var group = groups[i];
      item = {}
      item["email"] = group.email;
      groupArray.push(item);
    }
  } else {
    Logger.log('No users found.');
  }
  pageToken = page.nextPageToken;
    } while (pageToken);
  
  return groupArray;
}
