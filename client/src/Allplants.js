
import {Link} from "react-router-dom";
export default function Allplants({_id,user,name,createdAt}) {
  return (
<section class="overflow-hidden text-neutral-700">
  <div class="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
    <div class="-m-1 flex flex-wrap md:-m-2">

      <div class="flex w-1/3 flex-wrap">
        <div class="w-full p-1 md:p-2">
        <div class="relative">
        <Link to= {`/api/plants/${_id}`}>
          <img
            alt="gallery"
            class="block h-full w-full rounded-lg object-cover object-center"
            src={"https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"}/>
        </Link>
          <div className="texts">
          <Link to={`/api/plants/${_id}`}>
            <p class="relative bottom-10 rounded-lg left-0 p-2 text-white bg-black opacity-25 w-full">name</p>
          </Link>
          </div>
        </div>
        </div>
      </div>

      <div class="flex w-1/3 flex-wrap">
        <div class="w-full p-1 md:p-2">
        <div class="relative">
        <Link to= {`/api/plants/${_id}`}>
          <img
            alt="gallery"
            class="block h-full w-full rounded-lg object-cover object-center"
            src={"https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"}/>
        </Link>
          <div className="texts">
          <Link to={`/api/plants/${_id}`}>
            <p class="relative bottom-10 rounded-lg left-0 p-2 text-white bg-black opacity-25 w-full">name</p>
          </Link>
          </div>
        </div>
        </div>
      </div>
      <div class="flex w-1/3 flex-wrap">
        <div class="w-full p-1 md:p-2">
        <div class="relative">
        <Link to= {`/api/plants/${_id}`}>
          <img
            alt="gallery"
            class="block h-full w-full rounded-lg object-cover object-center"
            src={"https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"}/>
        </Link>
          <div className="texts">
          <Link to={`/api/plants/${_id}`}>
            <p class="relative bottom-10 rounded-lg left-0 p-2 text-white bg-black opacity-25 w-full">name</p>
          </Link>
          </div>
        </div>
        </div>
      </div>
      <div class="flex w-1/3 flex-wrap">
        <div class="w-full p-1 md:p-2">
        <div class="relative">
        <Link to= {`/api/plants/${_id}`}>
          <img
            alt="gallery"
            class="block h-full w-full rounded-lg object-cover object-center"
            src={"https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"}/>
        </Link>
          <div className="texts">
          <Link to={`/api/plants/${_id}`}>
            <p class="relative bottom-10 rounded-lg left-0 p-2 text-white bg-black opacity-25 w-full">name</p>
          </Link>
          </div>
        </div>
        </div>
      </div>




      
      

    </div>
  </div>
</section>)}