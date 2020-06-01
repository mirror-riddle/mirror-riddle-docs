# Learn C

## Pointer

### Usage

- Strings
- Dynamic memory allocation
- Sending function arguments by reference
- Building complicated data structures
- Pointing to functions
- Building special data structures (i.e. Tree, Tries, etc...)

### Definition

A pointer is essentially a simple integer variable which holds a memory address that points to a value,
instead of holding the actual value itself.

The computer's memory is a sequential store of data, and a pointer points to a specific part of the memory.

Our program can use pointers in such a way that the pointers point to a large amount of memory - depending
on how much we decide to read from that point on.

### Example

```c
char *name = "He";
```

does three things:

1. It allocates a local (stack) variable called name, which is a pointer to a single character.
2. It causes the string "John" to appear somewhere in the program memory (after it is compiled and executed, of course).
3. It initializes the name argument to point to where the J character resides at (which is followed by the rest of the string in the memory).

### Dereferencing

Dereferencing is the act of referring to where the pointer points, instead of the memory address. We are already using dereferencing in arrays - but we just didn't know it yet.

The brackets operator - [0] for example, accesses the first item of the array. And since arrays are actually pointers, accessing the first item in the array is the same as dereferencing a pointer.

Dereferencing a pointer is done using the asterisk operator \*.

```c
char a = 'a';
char *name = &a;
```
