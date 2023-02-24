import Image from "next/image";
import classes from "./banner.module.css";

function Hero() {
  return (
    <div className="banner h-96 block text-center md:flex md:justify-center md:items-center">
      <div className="image-container text-center md:text-left">
        <div className="rounded-full overflow-hidden w-20 h-20 md:w-96 md:h-96">
          <Image
            src={`/assets/images/blog-hero-illustration2.svg`}
            alt="Rahul"
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className="text-left w-6/12 ml-24">
        <p className="text-5xl text-white font-bold mb-4">
          Explore, Learn, Grow: A Blog for Curious Minds
        </p>
        <p className="text-white">
          Connect with our community of storytellers and share your own story.
          Our blog is a safe and supportive space for personal essays, memoirs,
          and creative writing. Whether you want to share a personal experience,
          raise awareness about a social issue, or simply express yourself
          through words, our platform is open to all. With a diverse range of
          voices and perspectives, we hope to inspire empathy, understanding,
          and connection among our readers.
        </p>
      </div>
    </div>
  );
}

export default Hero;
