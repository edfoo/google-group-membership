# google-group-membership
## Overview
Google Apps Scripting project to list the group membership of a domain hosted by Google.

## Background
I am the administrator of a domain we host with Google. G-suite doesn't provide a Google Groups read-only role
except via the API (without installing Groups for Business). That's why I wrote this.

## Requirements
```dud
- A domain hosted with Google
- Administative access to the domain
- Google AdminSDK API enabled
- Google API enabled
- A custom admin role with Group Read access
```

## How to use
- Create a new [Google Script](https://www.google.com/script/start/) and add the two files index.html and Code.gs
- Change Code.gs to reflect your domain name instead of "YOURDOMAINNAME"
- Deploy as web app

## Improvements
There is a long list of how this project can be improved. Seeing as I wrote it (a) myself and (b) a while back, I'll most likely only scratch the surface, but it's a start.
- Changing Code.gs to return JSON instead of writing data to a JavaScript array
- Making a single call to Google to fetch all data and populating the elements using JavaScript instead of polling the servers every time the radio button is changed.
- Search-while-you-type functionality
- If possible, moving the CSS to its own file
- many many more
