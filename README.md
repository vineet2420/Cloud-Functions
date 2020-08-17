# Cloud-Functions
A collection of methods performed on a Firebase project to diminish the spread of Covid-19

# Event Cleaner:
* Function is part of a larger mobile application desgined to remove database entries every night at 12:00 AM. 
* Effeciently cleans up the database without storing repetitive code on each multiplatform client application.
* Time Complexity: O(n) for reading each node, comparing the time, then performing the delete operation.

# Username Validation:
* HTTP function called each time a user is created to verify the username being requested is unique.
* Iterates through a Usernames node to verify if any key contains the same username. Eliminates the need for repetitive code from each client app, and less constrain on device hardware.
* Time Complexity: O(n) for iterating over n usernames in the node. Best Case: O(1) if the first key is the same username.
