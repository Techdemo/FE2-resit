# FE2-resit

##Table of contents
1. [The assignment](#The-assignment)
2. [My product](#My_product)
3. [What is progressive enhancement](#Wath-is-progressive-enhancement)
    - [Functional and reliable](#Functional-and_reliable)
        - [Server side rendering](#Server-side-rendering)
        - [Loading state](#Loading-state)
        - [Pagination](#Pagination)
        - [Dataset api](#Dataset-api)
    - [Useable](#usable)
        - [Fonts](#Fonts)
        - [@supports](#@supports)
        - [colors](#colors)
    - [Pleasurable](#Pleasurable)
        - [hydration](#hydration)
        - [loader](#loader)
        - [noscript](#noscript)
        - [Lazy loading](#Lazy-loading)
4. [deployment](#deployment)
5. [Todo](#Todo)
6. [my thoughts](#my-thoughts)
7. [Sources](#sources)

### The assignment
This assignment was made in response to the Frontend 2 course on CMD. The contents of the course revolved around progressive enhancement and the core foundations of the Javacript language.
I choose to build a webapp in which I show that I understand the principle of Progressive enhancement.

## My product
I choose to make a webapp in which a user can search for a meal recipe. The user can search on ingredients or dish name. After submitting the request, the users gets acces to a list of recipes. The challenge in this assignment was to make the web app useable for every kind of user and browser. Even without css and Javascript, the core functionalities of this webapp still work.

## What is progressive enhancement
Progressive enhancement concists two things. One, is that the user gets to use the core functionalities of your product (in my case, a webapp) regardless of the kind of browser, bandwidth and/or device. The second, is that progressive enhancement revolves about gradually improving the user experience while confirming that the client device/browser/bandwidth is capable of it.
My plan was to progressively enhance the webapplication from the ground up. So I devided the development of the product in three stages. This way of developing a webapp stands in contrast to Graceful degregation, in that it doesn't cater to the most advanced browsers first.

### Functional and reliable
The functional and reliable stage stands for the most minimal and basic setup of the webapp. In this stage, the webapp always works, regardless of the client's device/browser/bandwidth.

#### Server side rendering
To accomplish the functional and reliable, I wrote a server with Express. The server delivered all of the data to the client using the Handlebars templating. In this way, the user only needs to have a html form that can submit some data the server. The server in return, fetches the api, formats the data and gives it back to the client. Working with a server gives you a huge amount of progressive enhancement points! No client js or css is required. Also, as a developer you are challenged to work more with native html api's instead of fancy bloated js libraries.

#### Loading state
#### Pagination
#### Dataset api

### Usable
[ ] - css fallbacks for fonts
[ ] - different font datatypes for different browsers
[ ] - css fallbacks for colors

### Pleasurable

