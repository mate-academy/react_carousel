<h1>React Carousel (10 emotikons)</h1>

<h2>Demo link:</h2>
<p>https://frontend112.github.io/react_carousel/</p>

<h2>aplication contains following functionality</h2>
<ul>
  <li>scroll emotikons</li>
  <li>change width of image emotikon</li>
  <li>how many images visible</li>
  <li>how large is step (if step reaches outsite of images.length, then stop it on last element)</li>
  <li>animation time</li>
  <li>is scroll back to first if reaches last emotikon</li>
  <li>arrow is disabled if there is no more emotikons in range</li>
</ul>

<h2>App.tsx</h2>
<ul>
  <li>State CarouselEments contains all above data</li>
  <li>handleChange method exectues when user change one of above parameter</li>
</ul>

<h2>Carousel.tsx</h2>
<ul>
  <li>itemPosition - recent emotikon position, default is 0</li>
  <li>HandlePrevClick, HandleNextCLick - detecting recent position, if needs to be updated after click it sets new position to itemPosition </li>
  <li>
    in useEffect we check weather user changed parameter or click one of the arrow, in that case we need to handle cases when
    - itemPosition might be less than 0
    - itemPostion greater than images.length 
    - change width of image - wrapper.current
    - change postion of element with carouselList.current (when user clicks arrow)
    - change animationDuration on carouselList.current
  </li>
</ul>
