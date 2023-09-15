# React Carousel

> [React + Typescript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript)

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

## REQUIREMENTS:

1. The title of the page should contain "Carousel"
2. The page should continue the input fieds for:
   - `ItemWidth`
   - `FrameSize`
   - `Step`
   - `AnimationDuration`
3. Add data-cy attributes:
   - `title` inside h1 tag
   - `next` to the `"Next" button`


## Instructions

- Implement a solution following the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline).
- Use the [React TypeScript cheat sheet](https://spec0s.github.io/fe-program/js/extra/react-typescript).
- Open one more terminal and run tests with `npm test` to ensure your solution is correct.
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://<your_account>.github.io/react_carousel/) and add it to the PR description.



+++ Create a 1300 pixel-wide container and put there 10 images from the img/ folder so that they are all in the same row. Each of the images is 130×130 pixels.

+++ Change the width of the container to 260 pixels and use the overflow CSS property to hide all the images but the first two. You may alternatively want to use another wrapper container for that and set the new width and the overflow property to the wrapper instead of the inner container which will keep its width of 1300px.

+++ Place a button under the container. When the user presses the button, scroll the container horizontally with JavaScript so that it shows the next two images. You can do it without any animations. Suggested method is to use transform translate on container.

+++ Place another button just below the first one. The first button, "Next", should still display the next two items each time it is clicked, while the second one, "Previous", must do the opposite: return to the previous two images. When there are no images left to display, just do nothing.

+++ Now change the width of the container to 390 pixels and do the same thing with three images being shown instead of two. You need to carefully handle the case when there are less than three images left to display. So, when you’re showing images 7-9 and click the button "Next", display 8-10. Similarly, when showing 2-4 and click "Previous", display 1-3.

+++ Finally, add some horizontal spacing between the images and move the buttons to the left ("Previous") and right ("Next") sides of the container. Style them so that they look like arrows. Add a disabled class and style a button with this class accordingly if clicking the button would have no effect (i.e., there are no more images to display).
