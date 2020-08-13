# Cloud-Functions
A collection of methods performed on a Firebase project to diminish the spread of Covid-19

# Event Cleaner:
* Function is part of a larger mobile application desgined to remove database entries every night at 12:00 AM. 
* Effeciently cleans up the database without storing repetitive code on each multiplatform client application
* Time Complexity: O(n) for reading each node, comparing the time, then performing the delete operation.
