---
title: "Dijkstra's Shortest Path"
description: "Dijkstra's shortest path."
navigation: false
date: "2021-03-02 02:31:20"
img: "/img/algorithms/dijkstras-shortest-path.png"
tags:
  - Algorithm
---

Implementation of the shortest path algorithm, invented by Dijkstra.

![dijkstra's shortest path](/img/algorithms/dijkstras-shortest-path.png "dijkstra's shortest path")

```python
#!/usr/bin/python

import os
import time

# List of all the cities
cities = [
	"Ab'Dendriel",
	"Ankrahmun",
	"Carlin",
	"Darashia",
	"Edron",
	"Liberty Bay",
	"Port Hope",
	"Roshamuul",
	"Oramond",
	"Svargrond",
	"Thais",
	"Venore",
	"Yalahar",
	"Krailos",
	"Issavi",
	"Cormaya",
]

# Possible boat fares
fares = [
	[None, None,   80, None,   70, None, None, None, None, None,  130,   90,  160, None, None, None], #  Ab'Dendriel
	[None, None, None,  100,  160,   90,   80, None, None, None, None,  150,  230, None, None, None], #  Ankrahmun
	[  80, None, None, None,  110, None, None, None, None,  110,  110,  130,  185, None, None, None], #  Carlin
	[None,  100, None, None, None,  200,  180, None, None, None, None,   60,  210,  110,  130, None], #  Darashia
	[  70,  160,  110, None, None,  170,  150, None, None, None,  160,   40, None,  100, None,   20], #  Edron
	[None,   90, None,  200,  170, None,   50, None, None, None,  180,  180,  275, None, None, None], #  Liberty Bay
	[None,  110, None,  180,  150,   50, None, None, None, None,  160,  160,  260, None, None, None], #  Port Hope
	[None, None, None, None, None, None, None, None, None, None,  210, None, None, None, None, None], #  Roshamuul
	[None, None, None, None,  110, None,  200, None, None, None,  150,  130, None,   60,  120, None], #  Oramond
	[None, None, 110,  None, None, None, None, None, None, None,  180,  150, None, None, None, None], #  Svargrond
	[ 130, None,  110, None,  160,  180,  160,  210,  150,  180, None,  170,  200, None, None, None], #  Thais
	[  90, 150,   130,   60,   40,  180,  160, None, None,  150,  170, None,  185,  110,  130, None], #  Venore
	[ 160, 230,   185,  210, None,  275,  260, None, None, None,  200,  185, None, None, None, None], #  Yalahar
	[None, None, None,  110,  100, None, None, None,   60, None, None,  110, None, None,   70, None], #  Krailos
	[None, None, None,   80, None, None, None, None,  100, None, None,   80, None,   80, None, None], #  Issavi
	[None, None, None, None,   20, None, None, None, None, None, None, None, None, None, None, None], #  Cormaya
]

# Say phrase
def say(string):
	time.sleep(0.2)
	os.system('xdotool key Return')
	os.system('xdotool keydown Alt')
	os.system('xdotool type "' + string + '"')
	os.system('xdotool keyup Alt')
	os.system('xdotool key Return')

# Say fare
def typeFare(city):
	say("hi")
	time.sleep(1.0)
	say(city)
	say("yes")

def dijkstraShortestPath(sourceVertex):
	explored = []
	unexplored = []

	# Setup vertices
	for i, fare in enumerate(fares[sourceVertex]):
		unexplored.append([i, None, None])

		# Set the source vertex distance to 0
		if i == sourceVertex:
			unexplored[-1][1] = 0

	while len(unexplored) > 0:
		# Select the closest vertex
		closest = None
		distance = None
		for i, vertex in enumerate(unexplored):
			if (distance == None and vertex[1] != None) or \
			   (vertex[1] != None and vertex[1] < distance):
				closest = i
				distance = vertex[1]

		# Move the closest vertex to explored
		explored.append(unexplored.pop(closest))
		ID = explored[-1][0]

		# Explore this vertex
		for i, vertex in enumerate(unexplored):

			# Is linked
			if fares[ID][vertex[0]] != None:

				# If it hasnt been set before
				if vertex[1] == None:
					vertex[1] = fares[ID][vertex[0]] + explored[-1][1]
					vertex[2] = ID
				# Or is cheaper
				elif vertex[1] > fares[ID][vertex[0]] + explored[-1][1]:
					vertex[1] = fares[ID][vertex[0]] + explored[-1][1]
					vertex[2] = ID

	return explored

def dijkstraTraversePath(sourceVertex, targetVertex, explored):
	find = targetVertex
	path = [targetVertex]
	while find != sourceVertex:
		for i, vertex in enumerate(explored):
			if vertex[0] == find:
				find = vertex[2]
				path.append(vertex[2])
				break
	path.pop()
	path.reverse()
	return path

def main():
	locations   = '\n'.join(cities)
	current     = os.popen('echo "' + locations + '" | rofi -dmenu -i -p "Where are you now?"').read().rstrip()
	destination = os.popen('echo "' + locations + '" | rofi -dmenu -i -p "Where are you going?"').read().rstrip()

	if not current or not destination: return

	currentIndex     = cities.index(current)
	destinationIndex = cities.index(destination)

	# If a direct route is possible
	if fares[currentIndex][destinationIndex] != None:
		typeFare(destination)
		return

	# Calculate possible non-direct route
	data = dijkstraShortestPath(currentIndex)
	path = dijkstraTraversePath(currentIndex, destinationIndex, data)

	for index in path:
		typeFare(cities[index])

if __name__ == "__main__":
	main()
```

Source:<br>
[Dijkstra Algorithm - Example (YouTube)](https://www.youtube.com/watch?v=JcN_nq1EAr4){ target=_blank }
