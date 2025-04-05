---
title: "FizzBuzz"
description: "FizzBuzz."
navigation: false
date: "2021-03-02 02:31:02"
tags:
  - Algorithm
---

Implementation of the classic FizzBuzz interview question, done in two ways.

```cpp
#include <iostream>

void calculate()
{
	for (int i = 1; i < 101; i++) {
		if (i % 15 == 0) {
			std::cout << "FizzBuzz" << std::endl;
		}
		else if (i % 5 == 0) {
			std::cout << "Buzz" << std::endl;
		}
		else if (i % 3 == 0) {
			std::cout << "Fizz" << std::endl;
		}
		else {
			std::cout << i << std::endl;
		}
	}
}

void pattern()
{
	const char* pattern[] = {
		"%d\n",
		"%d\n",
		"Fizz\n",
		"%d\n",
		"Buzz\n",
		"Fizz\n",
		"%d\n",
		"%d\n",
		"Fizz\n",
		"Buzz\n",
		"%d\n",
		"Fizz\n",
		"%d\n",
		"%d\n",
		"FizzBuzz\n",
	};

	for (int i = 0; i < 100; i++) {
		printf(pattern[i % 15], i + 1);
	}
}

int main(int argc, char* argv[])
{
	calculate();

	pattern();

	return 0;
}
```

Output (x2):
```
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
16
17
Fizz
19
Buzz
Fizz
22
23
Fizz
Buzz
26
Fizz
28
29
FizzBuzz
31
32
Fizz
34
Buzz
Fizz
37
38
Fizz
Buzz
41
Fizz
43
44
FizzBuzz
46
47
Fizz
49
Buzz
Fizz
52
53
Fizz
Buzz
56
Fizz
58
59
FizzBuzz
61
62
Fizz
64
Buzz
Fizz
67
68
Fizz
Buzz
71
Fizz
73
74
FizzBuzz
76
77
Fizz
79
Buzz
Fizz
82
83
Fizz
Buzz
86
Fizz
88
89
FizzBuzz
91
92
Fizz
94
Buzz
Fizz
97
98
Fizz
Buzz
```
