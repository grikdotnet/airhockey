### Entities

* Table surface with a grid of X,Y coordinates
* Dot - logical point with X,Y coordinates on a surface
* Side (wall)
* Hole
* Striker
* Puck
* Game
* Player - a human
* Client - a browser or mobile app
* Tick - a time quant to detect the motion of a Striker
* Sequence - an incremental int sent along with every clinet event to the server

### Data types:
`playerId`, `gameId` - UUID

`X`,`Y`,`speed`,`time`,`angle`, `sequence` - int

### Events:

* Hello: `{"hello":playerId}`
* Join game: `{"join": gameId}`
* Start: `{"start":[gameId, playerId1, playerId2]}`
* End: `{"end":[gameId]}`
* Striker motion: `{"motion":[X1,Y1,X2,Y2,time], "sequence": sequence}`
  X1,Y1 are initial coordinates
  X2,Y2 are new coordinates
  T is milliseconds
* Collision of a striker with a puck
  `{"hit":[X,Y,angle,speed],"sequence": sequence}`
  X,Y - coordinates of a puck
  angle - angle of the new vector of the puck motion
  speed - speed pixels/sec
* Goal: `{"goal":playerId,"sequence": sequence}`
  playerId - the ID of the player the hole belongs to


A collision of a puck with a side is not an event, it is a computable vector of a puck motion.

### Data flow sequence

1. Client connects
1. Client sends a "Hello" event
   - server responds with OK
1. Client sends "join", 
   - server responds with OK 
   - client draws a Table
1. Server sends "start"
   - client starts tracking Puck movements
1. A striker changes position on a surface from a dot [X1,Y1] to another dot [X2,Y2].
   - once per [tick] ms client detects position change
   - sequence is incremented
   - Client sends the "motion" event to the server
   - Server does not respond to the "motion" messages
1. Server buffers motion events from a Client
   - duting N milliseconds "motion" events are kept in a server
   - if a motion leads to sending a puck to another part of a table the buffered motion events are sent to another player instantly  
1. Another client receives the pack of the motion events and draws them on a screen
