Capstone Project Summary
This project is a 3D action‑adventure prototype built using Three.js, created as my high‑school capstone. The entire game runs in a custom environment rendered in WebGL, with a third‑person character, animated monsters, item pickups, and basic combat and stamina systems.

Core Features

Custom 3D world generation  
The game builds a terrain plane and procedurally places trees and ground objects using randomized coordinates and distance‑checking logic to avoid overlap.

Fully animated player character  
A GLTF model is loaded with multiple animation states (idle, walk, run, roll, attack, hit, death).
A custom switchAction() system blends animations smoothly using Three.js’s AnimationMixer.

Third‑person camera system  
The camera dynamically follows the player with positional offsets and rotates based on the character’s orientation.

Character movement & controls

  WASD movement

  Shift to sprint

  Mouse click to attack

  Rotation based on key input

  Boundary checking to keep the player inside the map

Monster AI  
Monsters load with walk and attack animations and use simple pathfinding:

  Rotate toward the player

  Move forward when within range

  Switch to attack animation when close

  Return to idle/walk when far away

  Play death animation when defeated

Combat system (raycasting)  
Attacks use a Raycaster to detect monsters in front of the player.
A damage system tracks hits per monster and triggers death after enough hits.

Health & stamina bars

  Health decreases when monsters attack

  Stamina decreases when the player attacks

  Stamina regenerates over time

  Warnings appear when stamina is too low

  Bars update visually through DOM manipulation

Item pickups  
Health and stamina potions spawn randomly.
Pressing E or R picks them up and refills the corresponding bar.

Inventory tab  
Press B to open and Esc to close a simple inventory UI.

Game loop  
A custom animate() function handles:

  Camera updates

  Movement

  Monster AI

  Animation updates

  Item respawns

  Rendering
