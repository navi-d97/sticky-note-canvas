# web-app which allows users to arrange sticky notes on a canvas.

## Features

-> Add a sticky note anywhere on the screen.  
-> Drag and drop a sticky note to a new location.  
-> Delete a sticky note.  
-> Set the text contained in a sticky note (either at creation or after).  
-> Clear the canvas of all sticky notes.  
-> Color: Add ability to change the color of a sticky note.  
-> Collaboration: Share the link of the canvas with a peer. Both peers can edit the same canvas in real-time.  
-> Persistence: Persist the state of the board when it is modified and restore it when the user opens the same link again.  

## live demo
http://ec2-50-17-162-1.compute-1.amazonaws.com/

## api repository

https://github.com/navi-d97/sticky-note-api

## tech-stack
-> React - (for front-end app)  
-> Node, Express - (for backend)  
-> socket.io - (for realtime update)  
-> mongodb Atlas - (for DB storage)  
-> aws EC2 - for hosting server and front-end app  
-> nginx - for hosting static front-end  
