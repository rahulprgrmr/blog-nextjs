import TextInput from "@/components/ui/text-input";
import { CalendarIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

function PostSearchPage() {
  return (
    <div className="search-page">
      <div className="filter-component container mx-auto p-10 mt-10 text-white text-center">
        <h1 className="font-bold text-4xl mb-10">
          Quick and easy search: Find articles on our blog
        </h1>
        <TextInput
          type="search"
          className="h-16 text-2xl rounded-lg pl-2"
          placeholder="Search Posts..."
        />
      </div>
      <div className="search-results bg-white">
        <div className="container mx-auto pb-5">
          <p className="text-3xl font-bold mx-10 m-2 p-3 pt-10">Recent Posts</p>
          <div className="posts-list m-2 mx-10">
            <div className="post-item flex p-3 my-5">
              <div className="image-container overflow-hidden rounded relative h-40 w-96">
                <Image
                  src={`/assets/images/banner.jpg`}
                  alt="Post Title"
                  fill={true}
                />
              </div>
              <div className="post-detail ml-10">
                <h3 className="text-2xl font-bold mb-2">
                  How to Improve Your Productivity and Achieve Your Goals
                </h3>
                <p className="my-2">
                  Are you tired of feeling unproductive and not achieving your
                  goals? If so, don't worry, you're not alone. Many people
                  struggle with productivity and reaching their objectives. In
                  this blog post, we'll share tips and strategies to help you
                  improve your productivity and achieve your goals.
                </p>
                <div className="post-footer flex mt-3">
                  <span className="flex text-gray-500 items-center mr-5">
                    <UserCircleIcon className="h-5 w-5 mr-1" />
                    <span>Rahul Raveendran</span>
                  </span>
                  <span className="flex text-gray-500 items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <span>21/05/2023</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="post-item flex p-3 my-5">
              <div className="image-container overflow-hidden rounded relative h-40 w-96">
                <Image
                  src={`/assets/images/banner.jpg`}
                  alt="Post Title"
                  fill={true}
                />
              </div>
              <div className="post-detail ml-10">
                <h3 className="text-2xl font-bold mb-2">
                  How to Improve Your Productivity and Achieve Your Goals
                </h3>
                <p className="my-2">
                  Are you tired of feeling unproductive and not achieving your
                  goals? If so, don't worry, you're not alone. Many people
                  struggle with productivity and reaching their objectives. In
                  this blog post, we'll share tips and strategies to help you
                  improve your productivity and achieve your goals.
                </p>
                <div className="post-footer flex mt-3">
                  <span className="flex text-gray-500 items-center mr-5">
                    <UserCircleIcon className="h-5 w-5 mr-1" />
                    <span>Rahul Raveendran</span>
                  </span>
                  <span className="flex text-gray-500 items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <span>21/05/2023</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostSearchPage;
