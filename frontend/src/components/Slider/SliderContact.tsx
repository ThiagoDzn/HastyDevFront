import { Component } from "react";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import HeroImg1 from "../../assets/images/Hero/HeroImg1.webp";
import HeroImg2 from "../../assets/images/Hero/HeroImg2.webp";
import HeroImg3 from "../../assets/images/Hero/HeroImg3.webp";
import HeroImg4 from "../../assets/images/Hero/HeroImg4.webp";

interface CustomSliderContactProps {
  className?: string;
}

class SliderContact extends Component<CustomSliderContactProps> {
  render() {
    const { className } = this.props;

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    return (
      <Container className={className}>
        <Slider {...settings} className="mt-3">
          <div className="slide-item">
            <img src={HeroImg1} alt="" width="90%" height="400px" />
          </div>
          <div className="slide-item">
            <img src={HeroImg2} alt="" width="90%" height="400px" />
          </div>
          <div className="slide-item">
            <img src={HeroImg3} alt="" width="90%" height="400px" />
          </div>
          <div className="slide-item">
            <img src={HeroImg4} alt="" width="90%" height="400px" />
          </div>
        </Slider>
      </Container>
    );
  }
}

export default SliderContact;
