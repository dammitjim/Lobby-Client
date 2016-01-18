# Lobby [![Build Status](https://travis-ci.org/jimah/Lobby.svg)](https://travis-ci.org/jimah/Lobby)

A Twitch player based on Electron. Currently a work in progress.

## Features

* Parallel stream viewing.
* Chat integration per stream.
* Native menubar integration (followed streams).
* Desktop notifications when streamers go live.

## How to use

* 'npm install'
* 'npm start'
* You will need to log in with your twitch account to access features such as followed streams.
* You will need an auth.json in your root, 3 keys: ["client_id", "client_secret", "redirect_url"], you can get these from the twitch developer tools.
