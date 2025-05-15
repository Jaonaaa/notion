import { Copy } from "./text/Copy";

export function Hero() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="w-1/2 flex flex-col leading-[1.1] text-2xl">
        <Copy>
          <p>
            The young man wanted a role model. He looked long and hard in his youth, but that role
            model never materialized. His only choice was to embrace all the people in his life he
            didn't want to be like.
          </p>
          <div className="mt-6"></div>
          <p>
            The coin hovered in the air, spinning over and over again. It reached its peak and began
            to descend. Both boys were pleading with it to land a certain way but the coin had
            already made up its mind on what it was going to do.
          </p>
        </Copy>
      </div>
    </div>
  );
}
