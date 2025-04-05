---
title: "Sieve of Eratosthenes"
description: "Sieve of Eratosthenes."
navigation: false
date: "2021-03-02 02:31:16"
img: "/img/algorithms/sieve-of-eratosthenes.gif"
tags:
  - Algorithm
---

Implementation of the ancient sieve of Eratosthenes math algorithm, used for
finding prime numbers up to a given limit.

![sieve of eratosthenes](/img/algorithms/sieve-of-eratosthenes.gif "sieve of eratosthenes")

```c
#include <stdbool.h> // bool
#include <stdio.h>   // printf
#include <string.h>  // memset

int main(int argc, char* argv[]) {
	int limit = 10000;
	int calculate = limit * 20;

	// Create an array and set all to true
	bool numbers[calculate];
	memset(&numbers, true, sizeof(bool) * calculate);

	// Loop through all the numbers
	for (int i = 2; i < calculate; i++) {

		// Already crossed out numbers don't have to be checked
		if (numbers[i]) {
			// Cross out all the numbers that can't be a prime, which are multiples of itself
			for (int j = i * i; j < calculate; j += i) {
				numbers[j] = false;
			}

			// Once you exceed the calculate range, you can exit the loop
			if (i * i > calculate) {
				break;
			}
		}
	}

	int sum = 0;
	int counter = 1;
	// Get the sum of the first 10000 primes
	for (int i = 2; i < calculate; i++) {
		if (numbers[i]) {
			sum += i;

			if (counter >= limit) {
				break;
			}
			counter++;
		}
	}

	printf("sum of first %d primes is: %d\n", counter, sum);

	return 0;
}
```

Source:<br>
[https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes](https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes){ target=_blank }
