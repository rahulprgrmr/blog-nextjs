import Image from "next/image";
import classes from "./banner.module.css";

function Hero() {
  return (
    <div className="banner h-64 md:h-96 text-center flex md:justify-center items-center">
      <div className="image-container md:text-left">
        <div className="rounded-full overflow-hidden w-48 h-48 md:w-96 md:h-96">
          <Image
            src={`/assets/images/blog-hero-illustration2.svg`}
            alt="Rahul"
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className="text-left w-6/12 ml-1 md:ml-24">
        <p className="text-2xl md:text-5xl text-white font-bold mb-4">
          Explore, Learn, Grow: A{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-500">
            Blog
          </span>{" "}
          for Curious Minds
        </p>
        <p className="text-white hidden md:block">
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
