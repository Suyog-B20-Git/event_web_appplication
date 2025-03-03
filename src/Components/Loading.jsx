import React from "react";

const Loading = () => {
  return (
    // <div className="flex justify-center items-center h-screen">
    //   <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    // </div>
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="loader"></div>
      <style>
        {`
          .loader {
            --s: 25px;
            --g: 5px;
            width: calc(3*(1.353*var(--s) + var(--g)));
            display: grid;
            justify-items: end;
            aspect-ratio: 3;
            overflow: hidden;
            --_m: linear-gradient(90deg,#0000,#000 15px calc(100% - 15px),#0000);
            -webkit-mask: var(--_m);
                    mask: var(--_m);
          }
          .loader:before {
            content: "";
            width: 200%;
            background:
              linear-gradient(90deg,#ff2459 50%,#0000 0),
              conic-gradient(from -90deg at var(--s) calc(0.353*var(--s)),
                #fff 135deg,#666 0 270deg,#aaa 0);
            background-blend-mode: multiply;
            --_m:
              linear-gradient(to bottom right,
                #0000 calc(0.25*var(--s)),#000 0 calc(100% - calc(0.25*var(--s)) - 1.414*var(--g)),#0000 0),
              conic-gradient(from -90deg at right var(--g) bottom var(--g),#000 90deg,#0000 0);
            -webkit-mask: var(--_m);
                    mask: var(--_m);
            background-size: calc(100%/3) 100%, calc(100%/6) 100%;
            -webkit-mask-size: calc(100%/6) 100%;
                    mask-size: calc(100%/6) 100%;
            -webkit-mask-composite: source-in;
                    mask-composite: intersect;
            animation: l10 1s infinite linear;
          }
          @keyframes l10 {
            to { transform: translate(calc(100%/3)); }
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
