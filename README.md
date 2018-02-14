# 4dobe Home Automation Panel

[Live link]("https://dna113p.github.io/4dobe-home/")

[Source]("https://github.com/dna113p/4dobe-home/")

```
git clone https://github.com/dna113p/4dobe-home.git
npm install
npm run build
```

Application source in /src
Application distribution is in /docs 

### Core concepts 

#### Components

This single page application renders components to the dom, or to other components by using jQuery. All new components should extend the base component at `/src/components/Component.js` and should implement a `render()` function.
Newly created components recieve a root node upon creation, and the render functions job is to render contents directly to that root node as well as return that root node so that other components can use it.

#### Centralized Storage
The data for the application all flows through a central store in `/src/store.js`. This allows better control of rendering components to the DOM without un intended side effects. The store is updated via actions that are defined as uppercased methods of the store object.
Actions should be the only item that modify values of the store, and are also responsible for re rendering components that are associated with them. To help with re rendering components, any components can use the store to register as a dependency of any value so that an action method can easily look up the components that it needs to re render.
