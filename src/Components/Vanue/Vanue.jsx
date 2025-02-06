import { CiLocationOn } from "react-icons/ci";
import Ability from "../FeaturedEvent/Ability";
import EventGallery from "../FeaturedEvent/EventGallery";
import NewYorkCard from "../FeaturedEvent/NewYork";
import NewYorkSide from "../FeaturedEvent/NewYorkSideComponent";
import Overview from "../FeaturedEvent/OverView";
import PricingCard from "../FeaturedEvent/Pricing";

const Vanue = () => {
  return (
    <div className="lg:pt-[180px]">
      <div>
        <div
          className="w-full h-[210px] md:h-[600px] text-white flex flex-col gap-4 justify-center "
          style={{
            backgroundImage: "url(createEvent.png)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            textShadow: "2px 2px 2px black",
          }}
        >
          <div className="flex flex-col md:gap-3  lg:gap-3 gap-1 justify-center  p-2 md:p-4 lg:p-4">
            <div>
              <h1 className="lg:text-5xl md:text-2xl text-lg font-semibold">
                Best Events in
              </h1>
              <p className="lg:text-9xl md:text-7xl text-xl font-semibold font-sans">
                New York
              </p>
            </div>
            <p className="lg:text-base md:text-base text-xs">
              They Cakk New York city that means newve sleeps for reason they
              have so much to <br /> expore.Divide into posibiltites with unique
              eevnts throught out the city.From <br /> live music unique and
              historic venuew to all kind of cultural cuisine art <br /> around
              evry corner ,New York has it all
            </p>
            <div className="bg-blue-500 flex w-[max-content] lg:text-base text-xs rounded-md p-1">
              <CiLocationOn className="text-white text-lg" />
              <select name="vanue" id="" className="bg-blue-500">
                <option value="New York">New York</option>
                <option value="Los angilis">Los Angilis</option>
                <option value="New Jersy">new Jersy</option>
              </select>
            </div>
          </div>
        </div>
        {/* <Overview/> */}
        <div className="w-[100%]  ">
          {/* <div className="border p-4 border-black  w-[80%]"> */}
          <div
            className="border pt-2 md:p-4 
md:flex justify-start grid grid-cols-1 w-[100%]"
          >
            <div className="w-[100%] md:w-[72%]">
              <NewYorkCard />
            </div>
            <div className="w-[100%] p-4 md:w-[25%] mt-2 sm:ml-3 ">
              <NewYorkSide />
            </div>
            <div></div>
          </div>
          <div className="w-[100%] border flex justify-start pt2- sm:p-4  ">
            <div className="w-[100%] md:w-[72%]">
              <PricingCard />
            </div>
          </div>
          <div className="w-[100%] border flex justify-start p-4  ">
            <div className="w-[100%] md:w-[72%]">
              <Ability />
            </div>
          </div>

          <div className="m-3">
            <EventGallery />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Vanue;
