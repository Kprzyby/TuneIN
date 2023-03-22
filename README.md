# TuneIN - app for artists
App for musicians and other artists to interact with each other.

## Table of contents
* [Introduction](#introduction)
* [Used technologies](#used-technologies)
* [Features](#features)
* [Project state](#project-state)

## Introduction
TuneIN is an app for artists (mainly targeted at musicians) to interact with each other by talking though chat or a video call. Users can also publish offers for online
tutorship in their field of art. What's more users can create their own catalogs with their favourite songs.

## Used technologies
* NET 6.0
* C#
* Swagger
* Azure Communication Services
* Entity Framework Core 7.0.0
* React
* Next.js
* Socket.IO

## Features
### User management
* Creating an account
* Confirming an account by email
* Loggin in
* Loggin out
* Reseting the password by email
* Changing the password
* Editing information about the user
* Loading information about the user

### Tutorship offers
* Posting an tutorship offer
* Editing information about the offer
* Removing the offer from the app
* Loading information about a single tutorship offer
* Loading all tutorship offers (paging, filtering and sorting included)
* Loading all tutorship offers that the user posted (paging included)

### Chat
* Creating a chat between any number of users
* Sending messages to the chat
* Loading all chats that the user is part of (paging for chats and messages in the chats included)
* Loading a singular chat (paging for messages included)
* Loading more messages for a specified chat (with a continuation token)

## Project state
Project is still in development. In the future we are going to work on implementing video calls and catalogs with songs.
