import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

function App() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=74de04c305063ec0d2d1199860b5d546&autoload=false";
    document.head.appendChild(script);
    script.onload = () => {
      if (mapRef.current) {
        window.kakao.maps.load(() => {
          const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
          };
          const map = new window.kakao.maps.Map(mapRef.current, options);
        });
      }
    };

    return () => script.remove();
  }, []);

  return (
    <div>
      <div id="map" ref={mapRef} style={{ width: 300, height: 300 }}></div>
    </div>
  );
}

export default App;
