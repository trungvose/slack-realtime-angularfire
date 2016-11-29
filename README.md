# slack-realtime-angularfire

This is the clone of Slack chat app with realtime support. Using Firebase and AngularJS.

## Demo

[https://fireslack-realtime.firebaseapp.com/](https://fireslack-realtime.firebaseapp.com/)

[![Clone Slack app with realtime support by Firebase](https://img.youtube.com/vi/KWfekG00GIo/0.jpg)](https://www.youtube.com/watch?v=KWfekG00GIo)

### How to test

1. Login to the FireSlack using at least 2 account in 2 different browsers. Or in the same browser but one is in normal, one is in incognito/private mode. 
2. Click into one user or one channel and start typing.
3. You can see the message appear in another browser as well.

### User for Testing

> user1@gmail.com - abcde12345-
> 
> user2@gmail.com - abcde12345-
> 
> user3@gmail.com - abcde12345-
> 
> user4@gmail.com - abcde12345-

## Feature

- Sign up for an account
- Join/create channels to chat in
- Have a user profile
- Direct message other users
- See who's online

## Build & Development

Node.js and npm are essential to Angular development.

1. Install the npm packages described in the package.json: `npm install`
2. Run `npm install -g bower grunt-cli` to install Bower and Grunt.
3. Install the npm packages described in the bower.json: `bower install`
4. Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

## Reference

This project was originally based on the tutorial [Learn to build a Real-Time Slack clone with AngularFire](https://thinkster.io/angularfire-slack-tutorial#getting-started), but was modified for Firebase 3 and AngularFire 2