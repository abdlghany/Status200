# TypesScript

-   [Introduction](#introduction)
-   [Why](#why-do-we-use-it)
-   [Syntax](#syntax)
-   [Typing](#typing)
    -   [Common](#common)
    -   [`any`](#any)
    -   [`null` and `undefined`](#null-and-undefined)
    -   [`:void`](#void)
-   [Interface](#interface)
-   [React examples](#react-examples)
-   [More](#more)

---

## Introduction

> _Typescript is not a mandatory requirement for learning React or Javascript programming in general. You can build a web app using React without it. TypeScript does add an extra layer of complexity to your project, especially when you're relatively new to Javascript programming_

Javascript is a language that was designed for quick uses, and then grew to a full-fledged tool to write applications with millions of lines. Every language has its own quirks — oddities and surprises, and JavaScript’s humble beginning makes it have many of these. Some examples:

-   JavaScript’s equality operator (==) coerces its operands, leading to unexpected behavior:

    ```js
    if ("" == 0) {
        // It is! But why??
    }
    if (1 < x < 3) {
        // True for *any* value of x!
    }
    ```

-   JavaScript also allows accessing properties which aren’t present:

    ```ts
    const obj = { width: 10, height: 15 };
    // Why is this NaN? Spelling is hard!
    const area = obj.width * obj.heigth;
    ```

Most programming languages would throw an error when these sorts of errors occur, some would do so during compilation - before any code is running. When writing small programs, such quirks are annoying but manageable; when writing applications with hundreds or thousands of lines of code, these constant surprises are a serious problem.

TypeScript checks a program for errors before execution, and does so based on the _kinds of values_, making it a _static type checker_. For example, the last example above has an error because of the type of obj. Here’s the error TypeScript found:

```ts
const obj = { width: 10, height: 15 };
const area = obj.width * obj.heigth;

Property 'heigth' does not exist on type '{ width: number; height: number; }'. Did you mean 'height'?
```

## Why do we use it?

As mentioned earlier, Typescript is not a mandatory requirement for learning React or Javascript promming in general. For beginners, it add extra complexity. So why are we using TypeScript in stage 3?

1. **Clearer Code and Early Introduction to Types**

    - TypeScript enforces types, helping you to understand what kind of data you working with. By specifying types, it’s clearer whether a variable should hold a string, number, or specific object shape, reducing ambiguity and potential bugs.
    - Types also introduce you to a fundamental programming concept, helping you avoid common JavaScript pitfalls where type-related bugs can be confusing (e.g., `undefined` or `null` errors).

2. **Better Error Detection and Debugging**

    - TypeScript’s compiler catches errors early, often at the time of writing the code. This feedback loop is invaluable for beginners, as they can understand errors before the code runs, saving time on debugging.
    - For new programmers, this can provide a more forgiving learning environment where they’re guided through mistakes with helpful messages, making it easier to learn and troubleshoot.

3. **Improved Code Readability and Documentation**
    - Type annotations act as a form of inline documentation. When you see types in the code, it’s often easier to understand what each function or variable is supposed to do.
    - TypeScript encourages the use of interfaces and types, which helps you structure your code more predictably and write self-documenting code that others can read easily.

## Syntax

**Inline syntax**

```tsx
let name: string = "John";
const cars: string[] = [];
```

**\<Type> Syntax**

```tsx
const cars: Array<string> = [];
```

## Typing

### Common

Some common ways to define types in TypeScript:

```tsx
// Basic Types
let name: string = "John";
let year: number = 2024;
let flag: boolean = false;

// Array Types
const cars: string[] = ["Honda", "Kia", "Nissan"];
const ages: number[] = [18, 25, 36];
const ayes: boolean[] = [true, false, false, true];

// Object Type
const user: { id: number; name: string } = { id: 1, name: "John" };

// Array with Objects
const users: { id: number; name: string }[] = [
    { id: 1, name: "John" },
    { id: 1, name: "Jane" },
];

// The <Type> syntax
const cars: Array<string> = ["Honda", "Kia", "Nissan"];
const ages: Array<number> = [18, 25, 36];
const ayes: Array<boolean> = [true, false, false, true];
const users: Array<{ id: number; name: string }> = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
];
```

### `Any`

The `any` type holds a special place in the TypeScript type system. It gives you an escape hatch from the type system to tell the compiler to bugger off. `any` is compatible with any and all types in the type system. This means that anything can be assigned to it and it can be assigned to anything. This is demonstrated in the example below:

```tsx
let power: any;

// Takes any and all types
power = "123";
power = 123;

// Is compatible with all types
var num: number;
power = num;
num = power;
```

### `null` and `undefined`

The `null` and `undefined` JavaScript literals are effectively treated by the type system the same as something of type `any`. These literals can be assigned to any other type. This is demonstrated in the below example:

```tsx
var num: number;
var str: string;

// These literals can be assigned to anything
num = null;
str = undefined;
```

### `:void`

Use :void to signify that a function does not have a return type:

```tsx
function log(message): void {
    console.log(message);
}
```

There are a lot more types than the ones used in the examples above. For more infornation see the section "More" at the end of this chapter.

## Interface

The interface keyword is specific to TypeScript and does not exist in JavaScript. In TypeScript, interface is used for type-checking and defining the structure of objects, but it does not have a runtime equivalent—meaning it doesn’t produce any JavaScript code when TypeScript is compiled. It’s purely for type safety and development-time assistance.

```tsx
interface User {
    id: number;
    name: string;
    email: string;
}

const user: User = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
};

const users: User[] = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
];
```

## React examples

-   [Employee board assigment](https://github.com/karelvanzijl/status200-bootcamp/tree/main/Stage-3/Classes/2024-11-02/assigment/src)

## More

Here are a few useful resources that provide clear, structured learning paths for TypeScript, including its typing system:

1. **[TypeScript Deep Dive by Basarat](https://basarat.gitbook.io/typescript/)**: A free online book that dives deep into TypeScript, with a heavy emphasis on typing. It’s highly recommended for a detailed understanding of TypeScript’s type system.

2. **[Learn TypeScript by Codecademy](https://www.codecademy.com/learn/learn-typescript)**: This is an interactive course that covers the basics of TypeScript with hands-on exercises, including practical applications of types.

3. **[TypeScript Tutorial on FreeCodeCamp](https://www.freecodecamp.org/news/learn-typescript-beginners-guide/)**: This FreeCodeCamp tutorial is a great introductory article that covers TypeScript basics, including typing.

4. **[Egghead.io's TypeScript Courses](https://egghead.io/browse/languages/typescript)**: Egghead offers many short video tutorials and courses on TypeScript, including specific topics on advanced typing.
