import {
  faAddressBook,
  faChevronDown,
  faHome,
  faHouse,
  faNewspaper,
  faTShirt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ChevronRight,
  ContactRound,
  Home,
  Newspaper,
  Shirt,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosClient } from "../../../axios/axiosClient";

const navLink = [
  {
    id: 1,
    name: "Trang Chủ",
    url: "/",
    icon: <Home />,
    navSub: null,
  },
  {
    id: 2,
    name: "Sản Phẩm",
    url: "/shopping/all",
    icon: <Shirt />,
    icon2: <FontAwesomeIcon size="xs" icon={faChevronDown} />,
    navSub: "yes",
  },
  {
    id: 3,
    name: "Tin Tức",
    url: "/news",
    icon: <Newspaper />,
    navSub: null,
  },
  {
    id: 4,
    name: "Liên Hệ",
    url: "/contact",
    icon: <ContactRound />,
    navSub: null,
  },
];

const NavMenu = () => {
  const [Categories, setCategories] = useState();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const results = await axiosClient.get("/categories");
        setCategories(results.data.results);
      };
      fetchData();
    } catch (error) {
      console.log("🚀 ~ useEffect ~ error:", error);
    }
  }, []);

  return (
    <div className="flex items-center gap-x-8 z-10">
      {navLink.map((item) => (
        <div key={item.id} className="relative group">
          <Link to={item.url} className="flex items-center   ">
            <div className="flex items-end gap-x-2 group">
              <span className="block group-hover:text-primary group-hover:transition-all ">
                {item.icon}
              </span>
              <h1 className="text-textBold font-medium group-hover:text-primary group-hover:transition-all">
                {item.name}
              </h1>
              {item.icon2 && (
                <span className="block group-hover:text-primary group-hover:transition-all">
                  {item.icon2}
                </span>
              )}
            </div>
          </Link>
          <div className="absolute after:bg-transparent  left-0-0 after:absolute after:contents-'' after:w-[130px] after:min-h-[40px] z-10"></div>

          <div className=" top-[60px] absolute invisible transition-all opacity-0 translate-y-[160px] group-hover:visible group-hover:translate-y-0 group-hover:opacity-100  ">
            <div className="flex flex-col  shadow-xl">
              {item.navSub &&
                Categories?.length > 0 &&
                Categories.map((item, index) => (
                  <div className="relative containerNavBox1 " key={item.id}>
                    <Link to={`shopping/${item?.id}`}>
                      <div
                        className={`flex justify-between items-center min-w-[220px] hover:bg-secondary  bg-primary text-white border-b-2 border-dotted shadow-lg py-3  ${
                          index === 0 && "rounded-tl-md rounded-tr-md"
                        }  ${
                          index === Categories?.length - 1 &&
                          "rounded-bl-md rounded-br-md"
                        }  `}
                      >
                        <h1 className="px-3">{item.name}</h1>

                        {item?.children.length > 0 && (
                          <span>
                            <ChevronRight size={"20px"} />
                          </span>
                        )}
                      </div>
                    </Link>

                    <div className="absolute after:bg-transparent top-0 right-0 after:absolute after:contents-'' after:w-[10px] after:min-h-[60px] z-10"></div>

                    <div className="containerNavBox2 absolute top-0  left-[calc(100%+5px)] opacity-0 invisible translate-y-[160px]   transition-all   ">
                      {item?.children.length > 0 &&
                        item?.children?.map((child, index) => (
                          <Link key={child.id} to={`shopping/${child?.id}`}>
                            <div
                              className={`min-w-[220px] bg-primary text-white border-b-2 border-dotted shadow-lg py-3 hover:bg-secondary ${
                                index === 0 && "rounded-tl-md rounded-tr-md"
                              }  ${
                                index === item?.children?.length - 1 &&
                                "rounded-bl-md rounded-br-md"
                              } `}
                            >
                              <h1 className="px-3">{child.name}</h1>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NavMenu;
