# React Carousel

- [DEMO LINK](https://volodymyr-roiuk.github.io/react_carousel/)


## Task 
1. implement a carousel described [here](https://github.com/mate-academy/dom_carousel) as a React component  
    ```jsx
    <Carousel images={['url1', 'url2']} />
    ```
2. add an ability to customize `itemWidth` with default value of `130px`
3. add `frameSize` - number of images displayed at the same time with the default of `3`
4. add `step` (default 3) - number of images scrolled per click
5. add `animationDuration` (default `1000`) - time in ms to show the new portion of images
6. (*) add an `infinite` prop (`false` by default) - to do the carousel cyclic   
    ```jsx
    <Carousel
      images={['url1', 'url2']}
      step={3}
      frameSize={3}
      itemWidth={130}
      animationDuration={1000}
      infinite={false}
    />
    ```
    
## Workflow

- Fork the repository with task
- Clone forked repository 
    ```bash
    git clone git@github.com:<user_name>/<task_repository>.git
    ```
- Run `npm install` to install dependencies.
- Then develop

## Development mode 

- Run `npm start` to start development server on `http://localhost:3000`
    When you run server the command line window will no longer be available for 
    writing commands until you stop server (`ctrl + c`). All other commands you 
    need to run in new command line window.
- Follow [HTML, CSS styleguide](https://mate-academy.github.io/style-guides/htmlcss.html)
- Follow [the simplified JS styleguide](https://mate-academy.github.io/style-guides/javascript-standard-modified)
- run `npm run lint` to check code style
- When you finished add correct `homepage` to `package.json` and run `npm run deploy` 
- Add links to your demo in readme.md.
  - `[DEMO LINK](https://<your_account>.github.io/<repo_name>/)` - this will be a 
  link to your index.html
- Commit and push all recent changes.
- Create `Pull Request` from forked repo `(<branch_name>)` to original repo 
(`master`).
- Add a link at `PR` to Google Spreadsheets.

## Project structure

You should be writing your code in `src/` directory.
