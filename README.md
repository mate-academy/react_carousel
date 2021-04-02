# React Carousel
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://Smikhotur.github.io/react_carousel/)
- Follow the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline)

## Task
1. implement a carousel described [here](https://github.com/mate-academy/dom_carousel) as a React component
    ```jsx harmony
    <Carousel images={['url1', 'url2']} />
    ```
2. add an ability to customize `itemWidth` with default value of `130px`
3. add `frameSize` - number of images displayed at the same time with the default of `3`
4. add `step` (default 3) - number of images scrolled per click
5. add `animationDuration` (default `1000`) - time in ms to show the new portion of images
6. (*) add an `infinite` prop (`false` by default) - to do the carousel cyclic
    ```jsx harmony
    <Carousel
      images={['url1', 'url2']}
      step={3}
      frameSize={3}
      itemWidth={130}
      animationDuration={1000}
      infinite={false}
    />
    ```
