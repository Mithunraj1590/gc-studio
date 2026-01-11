"use client";
import { useRef, useState, MouseEvent } from "react";
import Style from "./Styleguide.module.scss";
import Link from "next/link";
import { useToggleLenis } from "@/logic/useToggleLenis";
import { useIntersectionObserver } from "@/logic/useIntersectionObserver";
import Icons from "@/styles/Icons";

const StyleGuidePage: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const buttons = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const bgRef1 = useRef<HTMLDivElement>(null);

  const { lenisStart, lenisStop } = useToggleLenis();
  const { isIntersecting } = useIntersectionObserver({
    targetRef: bgRef,
    threshold: 0.5,
  });
  const { isIntersecting: isIntersecting1 } = useIntersectionObserver({
    targetRef: bgRef1,
    threshold: 0.5,
    repeat: true,
  });

  const handleClick = (event: MouseEvent<HTMLDivElement>): void => {
    event.currentTarget.classList.toggle("active");
  };

  console.log(isIntersecting1);
  return (
    <section className="p-20">
      <div className="container">
        <div className="flex w-full pt-10">
          <div className="w-[20%] ">
            <ul className="fixed">
              <li className="">
                <a
                  href="#color"
                  className="hover:text-primary p-5 pl-10 pr-10 block text-[18px] text-[#000]"
                >
                  Color
                </a>
              </li>

              <li className="">
                <a
                  href="#buttons"
                  className="hover:text-primary p-5 pl-10 pr-10 block text-[18px] text-[#000]"
                >
                  Buttons
                </a>
              </li>

              <li>
                <a
                  href="#border-radious"
                  className="hover:text-primary p-5 pl-10 pr-10 block text-[18px] text-[#000]"
                >
                  Border Radious
                </a>
              </li>
              <li>
                <a
                  href="#typeography"
                  className="hover:text-primary p-5 pl-10 pr-10 block text-[18px] text-[#000]"
                >
                  Typography
                </a>
              </li>
              <li>
                <a
                  href="#box-shadow"
                  className="hover:text-primary p-5 pl-10 pr-10 block text-[18px] text-[#000]"
                >
                  Box Shadow
                </a>
              </li>

              <li>
                <a
                  href="#Lenis"
                  className="hover:text-primary p-5 pl-10 pr-10 block text-[18px] text-[#000]"
                >
                  Lenis
                </a>
              </li>

              <li>
                <a
                  href="#observer"
                  className="hover:text-primary p-5 pl-10 pr-10 block text-[18px] text-[#000]"
                >
                  Observer
                </a>
              </li>
            </ul>
          </div>
          <div className="w-[80%] ml-auto">
            <div id="color" className="pb-20">
              <h3 className="ttl text-[26px] mb-6">Colors</h3>
              <div className="item-wrp">
                <div className="flex">
                  <div className="color-item">
                    <div className="color-view bg-primary w-[100px] h-[50px] rounded-sm mr-8"></div>
                    <div className="color-classname text-sm text-black mt-4">
                      primary
                    </div>
                  </div>
                  <div className="color-item">
                    <div className="color-view bg-secondary w-[100px] h-[50px] rounded-sm mr-8"></div>
                    <div className="color-classname text-sm mt-4">
                      seccondary{" "}
                    </div>
                  </div>
                  <div className="color-item">
                    <div className="color-view bg-green w-[100px] h-[50px] rounded-sm mr-8"></div>
                    <div className="color-classname text-sm mt-4">green</div>
                  </div>
                  <div className="color-item">
                    <div className="color-view bg-yellow w-[100px] h-[50px] rounded-sm mr-8"></div>
                    <div className="color-classname text-sm mt-4">yellow</div>
                  </div>
                  <div className="color-item">
                    <div className="color-view bg-turquoise w-[100px] h-[50px] rounded-sm mr-8"></div>
                    <div className="color-classname text-sm mt-4">
                      turquoise
                    </div>
                  </div>

                  <div className="color-item">
                    <div className="color-view bg-black w-[100px] h-[50px] rounded-sm mr-8"></div>
                    <div className="color-classname text-sm mt-4">Black</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Buttons */}
            <section className="box ">
              <div id="buttons" className="pb-20">
                <h3 className="ttl text-[26px] mb-6">Buttons</h3>
                <div className="item-wrp">
                  <div className="flex flex-wrap gap-8">
                    <div className="button-box">
                      <button className="btn btn-primary">Button</button>
                      <div className="color-classname text-sm mt-4">
                        Btn Primary
                      </div>
                    </div>

                    <div className="button-box">
                      <button className="btn btn-primary btn-icon hover-translate">
                        Button
                        <span className="icon">
                          <Icons size={18} icon="aroow-top" />
                        </span>
                      </button>

                      <div className="color-classname text-sm mt-4">
                        btn-primary btn-icon
                      </div>
                    </div>

                    <div className="button-box">
                      <Link
                        href={`${""}`}
                        className=" btn-icon hover-translateX"
                      >
                        Button
                        <span className="icon">
                          <Icons size={18} icon="aroow-top" />
                        </span>
                      </Link>

                      <div className="color-classname text-sm mt-12">link</div>
                    </div>

                    <div className="button-box">
                      <button className="btn btn-secondary">Button</button>
                      <div className="color-classname text-sm mt-4">
                        Btn Primary
                      </div>
                    </div>

                    <div className="button-box">
                      <button className="btn btn-secondary btn-icon hover-translate">
                        Button
                        <span className="icon">
                          <Icons size={18} icon="aroow-top" />
                        </span>
                      </button>{" "}
                      <div className="color-classname text-sm mt-4">
                        btn-secondary btn-icon
                      </div>
                    </div>

                    <div className="button-box">
                      <button className="btn btn-outline-secondary btn-icon hover-translate">
                        Button
                        <span className="icon">
                          <Icons size={18} icon="aroow-top" />
                        </span>
                      </button>
                      <div className="color-classname text-sm mt-4">
                        btn-outline-secondary btn-icon{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div id="border-radious" className="pb-20">
              <h3 className="ttl text-[26px] mb-6">Border radius</h3>
              <div className="flex">
                <div className=" rounded-sm p-8 shadow-wrap w-[100px] h-[100px] bg-[#c2c2c2] flex items-center justify-center"></div>
                <div className=" rounded-md p-8 ml-8 shadow-wrap w-[100px] h-[100px] bg-[#c2c2c2] flex items-center justify-center"></div>
                <div className="rounded-lg p-8 ml-8 shadow-wrap w-[100px] h-[100px] bg-[#c2c2c2] flex items-center justify-center"></div>
                <div className="rounded-full p-8 ml-8 shadow-wrap w-[100px] h-[100px] bg-[#c2c2c2] flex items-center justify-center"></div>
              </div>
            </div>

            <div id="typeography" className={`pb-20 ${Style.typography}`}>
              <h3 className="ttl text-[26px] mb-6">Typography</h3>
              <div className={`${Style.fonts} active`} onClick={handleClick}>
                <button className="w-full text-left border-b-gray">
                  <span className="text-h1 pt-5 pb-5 block">Headline 1</span>{" "}
                </button>
                <div className={`overflow-hidden h-0 ${Style.hide}`}>
                  <table className="table-auto text-left mb-10 w-half text-[12px]">
                    <thead>
                      <tr>
                        <th className="w-[100px]">class</th>
                        <th className="w-[100px]">font-size</th>
                        <th className="w-[100px]">variable</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-primary-900">
                        <td>.text-h1</td>
                        <td>50px</td>
                        <td>--text-h1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className={`${Style.fonts} `} onClick={handleClick}>
                <button className="w-full text-left ">
                  <span className="text-h2 pt-5 pb-5 block">Headline 2</span>{" "}
                </button>
                <div className={`overflow-hidden h-0 ${Style.hide}`}>
                  <table className="table-auto text-left mb-10 w-half text-[12px]">
                    <thead>
                      <tr>
                        <th className="w-[100px]">class</th>
                        <th className="w-[100px]">font-size</th>
                        <th className="w-[100px]">variable</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-primary-900">
                        <td>.text-h2</td>
                        <td>45px</td>
                        <td>--text-h2</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className={`${Style.fonts}`} onClick={handleClick}>
                <button className="w-full text-left ">
                  <span className="text-h3 pt-5 pb-5 block">Headline 3</span>{" "}
                </button>
                <div className={`overflow-hidden h-0 ${Style.hide}`}>
                  <table className="table-auto text-left mb-10 w-half text-[12px]">
                    <thead>
                      <tr>
                        <th className="w-[100px]">class</th>
                        <th className="w-[100px]">font-size</th>
                        <th className="w-[100px]">variable</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-primary-900">
                        <td>.text-h3</td>
                        <td>36px</td>
                        <td>--text-h3</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className={`${Style.fonts}`} onClick={handleClick}>
                <button className="w-full text-left">
                  <span className="text-h4 pt-5 pb-5 block">Headline 4</span>{" "}
                </button>
                <div className={`overflow-hidden h-0 ${Style.hide}`}>
                  <table className="table-auto text-left mb-10 w-half text-[12px]">
                    <thead>
                      <tr>
                        <th className="w-[100px]">class</th>
                        <th className="w-[100px]">font-size</th>
                        <th className="w-[100px]">variable</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-primary-900">
                        <td>.text-h4</td>
                        <td>32px</td>
                        <td>--text-h4</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className={`${Style.fonts}`} onClick={handleClick}>
                <button className="w-full text-left ">
                  <span className="text-h5 pt-5 pb-5 block">Headline 5</span>{" "}
                </button>
                <div className={`overflow-hidden  h-0 ${Style.hide}`}>
                  <table className="table-auto text-left mb-10 w-half text-[12px]">
                    <thead>
                      <tr>
                        <th className="w-[100px]">class</th>
                        <th className="w-[100px]">font-size</th>
                        <th className="w-[100px]">variable</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-primary-900">
                        <td>.text-h5</td>
                        <td>24px</td>
                        <td>--text-h5</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className={`${Style.fonts}`} onClick={handleClick}>
                <button className="w-full text-left ">
                  <span className="text-h6 pt-5 pb-5 block">Headline 6</span>{" "}
                </button>
                <div
                  className={`overflow-hidden h-0 ${Style.hide} transition-all ease-in-out`}
                >
                  <table className="table-auto text-left mb-10 w-half text-[12px]">
                    <thead>
                      <tr>
                        <th className="w-[100px]">class</th>
                        <th className="w-[100px]">font-size</th>
                        <th className="w-[100px]">variable</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-primary-900">
                        <td>.text-h6</td>
                        <td>20px</td>
                        <td>--text-h6</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className={`${Style.text} pt-10`}>
                <span className="text-sm">
                  {" "}
                  Text sm
                  <span className="ml-5 text-[10px] text-[#000]">
                    (--text-sm) 14px
                  </span>
                </span>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
              <div className={`${Style.text} pt-10`}>
                <span className="text-md">
                  Text md
                  <span className="ml-5 text-[10px] text-[#000]">
                    (--text-md) 18px
                  </span>
                </span>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
              <div className={`${Style.text} pt-10`}>
                <span className="text-lg">
                  Text lg
                  <span className="ml-5 text-[10px] text-[#000]">
                    (--text-lg) 20px
                  </span>
                </span>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
              <div className={`${Style.text} pt-10`}>
                <span className="text-xl">
                  Text lg
                  <span className="ml-5 text-[10px] text-[#000]">
                    (--text-xl) 22px
                  </span>
                </span>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
            </div>
            <div id="box-shadow" className="pb-20">
              <h3 className="ttl text-[26px] mb-6">Shadow</h3>
              <div className="flex">
                <div className="p-8 shadow-wrap w-[520px] h-[200px] bg-[#EFF4F9] flex items-center justify-center">
                  <div className="shadow-box w-[100px] h-[100px] rounded-sm bg-white shadow-sm"></div>
                  <div className="value ml-6">
                    <p className="font-bold">shadow-sm</p>
                    <p>0px 2px 4px 0px rgba(11, 10, 55, 0.15)</p>
                  </div>
                </div>
                <div className="ml-8 p-8 shadow-wrap w-[520px] h-[200px] bg-[#EFF4F9] flex items-center justify-center">
                  <div className="shadow-box w-[100px] h-[100px] rounded-sm bg-white shadow-lg"></div>
                  <div className="value ml-6">
                    <p className="font-bold">shadow-lg</p>
                    <p>0px 8px 20px 0px rgba(18, 16, 99, 0.06)</p>
                  </div>
                </div>
              </div>
            </div>

            <div id="lenis" className="pb-20">
              <h3 className="ttl text-[26px] mb-6">Lenis</h3>

              <div>
                <p>
                  import useTogglelenis.
                  <br />
                  {`import { useToggleLenis } from "@/logic/useToggleLenis"`}
                  <br />
                  <br />
                  Destrcuture two funtions and use as per the need.
                  <br />
                  {`const {lenisStart, lenisStop} = useToggleLenis()`}
                  <br />
                  <br />
                  {`lenisStop() - stop lenis immediately`}
                  <br />
                  {`lenisStart() - satrt lenis immediately`}
                  <br />
                  <br />
                  <br />
                </p>
              </div>
              <div className="flex">
                <button
                  className="btn btn-primary mr-3"
                  onClick={() => lenisStop()}
                >
                  Stop lenis
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => lenisStart()}
                >
                  start lenis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StyleGuidePage;

