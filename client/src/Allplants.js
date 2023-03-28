
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
        <p class="absolute bottom-0 left-0 p-2 text-white bg-black opacity-75 w-full">name</p>
        <p className="info">
          <a className="author">{user}</a>
          <time>{Date(createdAt)}</time>
        </p>
        </Link>

        </div>
           
        
        
        </div>
        </div>
      </div>
    
      <div class="flex w-1/3 flex-wrap">
        <div class="w-full p-1 md:p-2">
        <div class="relative">
        <a href="test_page_3.html">
          <img
            alt="gallery"
            class="block h-full w-full rounded-lg object-cover object-center"
            src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp" />
           </a>
           <p class="absolute bottom-0 left-0 p-2 text-white bg-black opacity-75 w-full">Image 1</p>
        </div>
        </div>
      </div>

      <div class="flex w-1/3 flex-wrap">
        <div class="w-full p-1 md:p-2">
        <div class="relative">
        <a href="test_page_3.html">
          <img
            alt="gallery"
            class="block h-full w-full rounded-lg object-cover object-center"
            src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp" />
           </a>
           <p class="absolute bottom-0 left-0 p-2 text-white bg-black opacity-75 w-full">Image 1</p>
        </div>
        </div>
      </div>

      <div class="flex w-1/3 flex-wrap">
        <div class="w-full p-1 md:p-2">
        <div class="relative">
        <a href="test_page_3.html">
          <img
            alt="gallery"
            class="block h-full w-full rounded-lg object-cover object-center"
            src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp" />
           </a>
           <p class="absolute bottom-0 left-0 p-2 text-white bg-black opacity-75 w-full">Image 1</p>
        </div>
        </div>
      </div>

      <div class="flex w-1/3 flex-wrap">
        <div class="w-full p-1 md:p-2">
        <div class="relative">
        <a href="test_page_3.html">
          <img
            alt="gallery"
            class="block h-full w-full rounded-lg object-cover object-center"
            src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp" />
           </a>
           <p class="absolute bottom-0 left-0 p-2 text-white bg-black opacity-75 w-full">Image 1</p>
        </div>
        </div>
      </div>

      <div class="flex w-1/3 flex-wrap">
        <div class="w-full p-1 md:p-2">
        <div class="relative">
        <a href="test_page_3.html">
          <img
            alt="gallery"
            class="block h-full w-full rounded-lg object-cover object-center"
            src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp" />
           </a>
           <p class="absolute bottom-0 left-0 p-2 text-white bg-black opacity-75 w-full">Image 1</p>
        </div>
        </div>
      </div>

      <div class="flex w-1/3 flex-wrap">
        <div class="w-full p-1 md:p-2">
        <div class="relative">
        <a href="test_page_3.html">
          <img
            alt="gallery"
            class="block h-full w-full rounded-lg object-cover object-center"
            src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp" />
           </a>
           <p class="absolute bottom-0 left-0 p-2 text-white bg-black opacity-75 w-full">Image 1</p>
        </div>
        </div>
      </div>
      
      

    </div>
  </div>
</section>)}

        {/* <div className="plant-image">
        <img src="https://www.southernliving.com/thmb/teaKzZUma8RyPpmnj8pK6CxwT2k=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/valentine-bouquet-gettyimages-55949391-2000-d675e30abd0243f1bf1d13ecb212d45b.jpg" alt=""/>
        </div>
        <div className="texts">
        <h2>Plant Name</h2>
        <p className="info">
          <h3 className="author">user xinnan</h3>
          <time>2023-03-25 02:23</time>
        </p>
        <p className="description">test</p>
        </div> */}
   
