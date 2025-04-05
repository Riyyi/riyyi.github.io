---
title: "Invert Binary Tree"
description: "Invert binary tree."
navigation: false
date: "2021-03-02 02:31:09"
img: "/img/algorithms/invert-binary-tree.png"
tags:
  - Algorithm
---

Implementation of inverting a binary tree.

binarytree.h
```cpp
#ifndef BINARYTREE_H
#define BINARYTREE_H

#include <cstdint>

class BinaryTree {
public:
	// Contructors, Destructors

	BinaryTree(uint32_t value, BinaryTree* left = nullptr,
	           BinaryTree* right = nullptr);

	// Functions

	void print();
	void invert();

	// Getters, Setters

	inline uint32_t value() { return m_value; }

private:
	uint32_t m_value;
	BinaryTree* m_left;
	BinaryTree* m_right;
};

#endif // BINARYTREE_H
```

binarytree.cpp
```c
#include <iomanip>
#include <iostream>
#include <string>

#include "binarytree.h"

BinaryTree::BinaryTree(uint32_t value, BinaryTree *left, BinaryTree *right)
    : m_value(value), m_left(left), m_right(right) {}

void BinaryTree::print()
{
	// Skip nodes without children
	if (!m_left && !m_right) {
		return;
	}

	// Value
	std::cout << std::setw(2) << m_value << " -> ";
	// Left
	std::cout << std::setw(2) << (m_left ? std::to_string(m_left->value()) : "") <<  " | ";
	// Right
	std::cout << (m_right ? std::to_string(m_right->value()) : "") << std::endl;

	// Recursion
	if (m_left) {
		m_left->print();
	}
	if (m_right) {
		m_right->print();
	}
}

void BinaryTree::invert()
{
	// Swap
	BinaryTree* tmp = m_left;
	m_left = m_right;
	m_right = tmp;

	// Recursion
	if (m_left) {
		m_left->invert();
	}
	if (m_right) {
		m_right->invert();
	}
}
```
main.cpp
```cpp
#include <iostream>

#include "binarytree.h"

int main(int argc, char* argv[])
{
	(void) argc;
	(void) argv;

	BinaryTree n3(3);
	BinaryTree n9(9);
	BinaryTree n13(13);

	BinaryTree n4(4, &n3);
	BinaryTree n6(6);
	BinaryTree n8(8, nullptr, &n9);
	BinaryTree n12(12, nullptr, &n13);

	BinaryTree n5(5, &n4, &n6);
	BinaryTree n10(10, &n8, &n12);

	BinaryTree n7(7, &n5, &n10);

	std::cout << std::endl << "Binary Tree:" << std::endl;
	n7.print();

	n7.invert();

	std::cout << std::endl << "Binary Tree Inverted:" << std::endl;
	n7.print();

	return 0;
}
```

Output:
```
Binary Tree:
 7 ->  5 | 10
 5 ->  4 | 6
 4 ->  3 |
10 ->  8 | 12
 8 ->    | 9
12 ->    | 13

Binary Tree Inverted:
 7 -> 10 | 5
10 -> 12 | 8
12 -> 13 |
 8 ->  9 |
 5 ->  6 | 4
 4 ->    | 3
```

Source:<br>
[Binary Search Trees in Java (YouTube)](https://www.youtube.com/watch?v=Qa5r8Wsda70){ target=_blank }
