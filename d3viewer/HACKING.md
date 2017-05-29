# A sample DFG viewer using D3.js

This sample provides a small, simple and modern application that consumes
Deep Algo's data. You can reuse as much as you want from this repository to
help you start your own project.

## How to setup a development environment

### First step: clone this repository

Open a terminal, go to a suitable directory and execute this command:

    git clone https://github.com/DeepAlgo/HackathonJune2017.git

[For more information, checkout this help from GitHub.][github-clone]

[github-clone]: https://help.github.com/articles/cloning-a-repository/

### Prerequisite: configure your text editor

This project is written in [Typescript][ts], a superset of Javascript with
types. In addition to vanilla Javascript, it provides static type checking
(catch errors in your editor!) and auto-completion when your editor is
configured correctly.

**[See the compatible editors on Typescript's website.][ts-editors]** If you
don't have a preferred text editor, [Visual Studio Code][vscode] is a good
choice for Typescript. If your favourite editor cannot be set up, it's not a
problem: you can still edit the `.ts` files normally, and the compiler in
the command-line will give you the error messages, if any.

[ts]: https://www.typescriptlang.org/
[ts-editors]: https://www.typescriptlang.org/index.html#download-links

### Prerequisite: install Node.js and npm

This project use [`npm`][npm] to manage dependencies and [`webpack`][webpack]
to compile and bundle the Typescript code. Both tools are written in
Javascript and require [`node`][node] to run.

**[Download `node` here for your operating system.][node-download]**

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org/en/
[webpack]: https://webpack.js.org/
[node-download]: https://nodejs.org/en/download/

### Compile the project

From your local copy of this repository, open `d3viewer/index.html` in a
recent browser (Firefox, Chrome/Chromium, Edge). You should see an empty
page with a search bar at the top. Select a graph from the top bar; it
should be loaded in the center of the page.

When that's OK, open a terminal in the folder `d3viewer` and follow the steps:

 1. Fetch this project's dependencies (includes `webpack`, `d3`...):

        npm install

 2. Build the project once:

        npm run build

Both steps should finish without error.

## Tips

After the basic setup, if you want to use this project as a basis for your own
developments, you can use another command:

    npm run dev

This command will leave `webpack` open and watch the project for changes.
It will continously recompile and detect errors every time that you save a
file. To preview your changes, just refresh the `index.html` page in your
browser.

If you want to focus on a specific DFG during your development, you can
add its "graphId" (e.g. `loop_5`) at the end of the URL, like this:
`index.html?loop_5`. This particular DFG will be loaded immediately after
each page reload.

