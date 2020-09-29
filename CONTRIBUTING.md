# Contributing to LeQuiz.io

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## We Develop with Github

We use github to host code, to track issues and feature requests, as well as accept pull requests.

## We Use [Github Flow](https://guides.github.com/introduction/flow/index.html), So All Code Changes Happen Through Pull Requests

Pull requests are the best way to propose changes to the codebase (we use [Github Flow](https://guides.github.com/introduction/flow/index.html)). We actively welcome your pull requests:

1. Fork the repo and create your branch from `master`.
2. If you've added code that should be tested, add tests.
3. Ensure the test suite passes.
4. Make sure your code lints.
5. Issue that pull request!

## Any contributions you make will be under the MIT Software License
In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using Github's [issues](https://github.com/EmileCalixte/lequiz.io/issues)
We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/EmileCalixte/lequiz.io/issues/new); it's that easy!

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce. Be specific!
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## Use a Consistent Coding Style

In order to improve code readability and make code maintenance easier, the Javascript code must respect some guidelines based on [w3schools Javascript Style Guide and Coding Conventions](https://www.w3schools.com/js/js_conventions.asp):

- Use **camelCase** for variable and function names:
```javascript
firstName = "John";
lastName = "Doe";

price = 19.90;
tax = 0.20;

fullPrice = price + (price * tax);
```

- Put spaces around operators and after commas:
```javascript
var x = y + z;
var values = ["Foo", "Bar", "..."];
```

- Use 4 spaces for indentation of code blocks:
```javascript
function myFunction(someParam) {
    const something = someParam + 2;
    return something;
}
```
> Don't use tabs (tabulators) for indentation

## References
This document was adapted from the open-source contribution guidelines for [Facebook's Draft](https://github.com/facebook/draft-js/blob/a9316a723f9e918afde44dea68b5f9f39b7d9b00/CONTRIBUTING.md).