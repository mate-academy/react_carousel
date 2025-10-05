# Carousel

1) Create a 1300 pixel-wide container and put there 10 images from the [img/](img/) folder so that they are all in the same row. Each of the images is 130×130 pixels.

2) Change the width of the container to 260 pixels and use the `overflow` CSS property to hide all the images but the first two. You may alternatively want to use another wrapper container for that and set the new width and the `overflow` property to the wrapper instead of the inner container which will keep its width of 1300px.

3) Place a button under the container. When the user presses the button, scroll the container horizontally with JavaScript so that it shows the next two images. You can do it without any animations. Suggested method is to use transform translate on container.

4) Place another button just below the first one. The first button, "Next", should still display the next two items each time it is clicked, while the second one, "Previous", must do the opposite: return to the previous two images. When there are no images left to display, just do nothing.

5) Now change the width of the container to 390 pixels and do the same thing with three images being shown instead of two. You need to carefully handle the case when there are less than three images left to display. So, when you’re showing images 7-9 and click the button "Next", display 8-10. Similarly, when showing 2-4 and click "Previous", display 1-3.

6) Finally, add some horizontal spacing between the images and move the buttons to the left ("Previous") and right ("Next") sides of the container. Style them so that they look like arrows. Add a disabled class and style a button with this class accordingly if clicking the button would have no effect (i.e., there are no more images to display).
