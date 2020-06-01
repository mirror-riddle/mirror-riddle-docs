# Linked Lists

Essentially, linked lists function as an array that can grow and shrink as needed, from any point in the array.

Linked lists have a few advantages over arrays:

1. items can be added or removed from the moddile of the list.
2. There is no need to define an initial size.

a few disadvantages:

1. There is no "random" access - it is impossible to reach the nth item in the array without first iterating over all items up until that item. This means we have to start from the beginning of the list and count how many times we advance in the list until we get to the desired item.

2. Dynamic memory allocation and pointers are required, which complicates the code and increases the risk of memory leaks and segment faults.

3. Linked lists have a much larger overhead over arrays, since linked list items are dynamically allocated (which is less efficient in memory usage) and each item in the list also must store an additional pointer.

## What is a linked list

A linked list is a set of dynamically allocated nodes, arranged in such a way that each node contains one value and one pointer. The pointer always points to the next member of the list. If the pointer is NULL, then it is the last node in the list.

A linked list is held using a local pointer variable which points to the first item of the list. If that pointer is also NULL, then the list is considered to be empty.
