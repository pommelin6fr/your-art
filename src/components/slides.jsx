import React from "react";
import "./css/slide.scss";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const SlideComponent = ({ artWorkItems }) => {
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
      

  return (
    <Carousel responsive={responsive}>
        {artWorkItems.map((artWorkItem, index) => (
                <div key={index}>
                    <img alt="artwork" src={artWorkItem.src} height="150px"  width="150px"></img>
                </div>
            )
        )}
    </Carousel>
  );
}

export default SlideComponent